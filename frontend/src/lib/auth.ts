import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "~/env";
import { db } from "~/server/db";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
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
              case "5248dff6-b475-4483-a9aa-6b8a1cac0b16":
                creditsToAdd = 10;
                break;
              case "4f83f333-e783-4604-9556-dd6acc3d655c":
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
