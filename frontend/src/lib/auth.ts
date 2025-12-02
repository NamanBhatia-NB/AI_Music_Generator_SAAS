import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "~/env";
import { db } from "~/server/db";
import { sendEmail } from "./email";
import { getResetPasswordEmailTemplate } from "~/server/email/templates/resetPassword";
import { getVerificationEmailTemplate } from "~/server/email/templates/verification";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  // server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      await sendEmail({
  to: user.email,
  subject: "Verify Your Email - AI Music Generator",
  html: getVerificationEmailTemplate(user.email, url),
});

    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    async afterEmailVerification(user, request) {
      // Create a Polar customer for this verified user
      await polarClient.customers.create({
        externalId: user.id,         
        email: user.email,
        name: user.name ?? undefined,
      });
    },

  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({user, url, token}, request) => {
      await sendEmail({
      to: user.email,
      subject: "Reset Your Password - AI Music Generator",
      html: getResetPasswordEmailTemplate(user.email, url),
    });
    },
  },
  socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }
    },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: false,
      use: [
        checkout({
          products: [
            {
              productId: "10686663-edef-4b18-94de-d4f09f88dbc3",
              slug: "small",
            },
            {
            productId: "1aa8b68a-da51-4b2a-928a-6e975f9e86f2",
              slug: "medium",
            },
            {
            productId: "9cde0ea5-fd79-4971-b81f-3e33e20e4cb0",
              slug: "large",
            },
          ],
          successUrl: "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer id found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "10686663-edef-4b18-94de-d4f09f88dbc3":
                creditsToAdd = 10;
                break;
              case "1aa8b68a-da51-4b2a-928a-6e975f9e86f2":
                creditsToAdd = 25;
                break;
              case "d94b7c48-f082-4e1d-a064-399888fd388b":
                creditsToAdd = 50;
                break;
            }

            await db.user.update({
              where: {
                id: externalCustomerId,
              },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
