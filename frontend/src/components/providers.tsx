"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "~/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <div>
            <AuthUIProvider
                authClient={authClient}
                navigate={(url) => router.push(url)}
                replace={(url) => router.replace(url)}
                onSessionChange={() => router.refresh()}
                social={{
                    providers: ["google"]
                }}
                // multiSession
                // magicLink
                // passkey
                // avatar={{
                //     upload: async (file) => {
                //         const formData = new FormData()
                //         formData.append("avatar", file)

                //         const res = await fetch("/api/uploadAvatar", { method: "POST", body: formData })
                //         const { data } = await res.json()

                //         return data.url
                //     },
                //     delete: async (url) => {
                //         await fetch("/api/deleteAvatar", {
                //             method: "POST",
                //             headers: { "Content-Type": "application/json" },
                //             body: JSON.stringify({ url })
                //         })
                //     },
                //     // Custom Image component for rendering avatar images
                //     // Useful for CDN optimization (Cloudinary, Imgix, ImgProxy, etc.)
                //     Image: Image // Use Next.js Image component for avatars
                // }}
                account={{
                    basePath: "/",
                    fields: ["image", "name"]
                }}
                twoFactor={["otp", "totp"]}
                Link={Link}
            >
                {children}
            </AuthUIProvider>
        </div>
    )
}