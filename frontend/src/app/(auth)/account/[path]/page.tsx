"use client";

import { use } from "react";
import { AccountView } from "@daveyplate/better-auth-ui";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const dynamicParams = false;

export default function AccountPage({
    params,
}: {
    params: Promise<{ path: string }>;
}) {
    const { path } = use(params);
    const router = useRouter();

    return (
        <main className="container flex-grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
            {["settings", "security"].includes(path) && (
                <Button
                    className="self-start"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <ArrowLeftIcon />
                    Back
                </Button>
            )}
            <AccountView path={path} />
        </main>
    );
}
