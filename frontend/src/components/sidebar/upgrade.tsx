"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
            products: [
                "5248dff6-b475-4483-a9aa-6b8a1cac0b16",
                "4f83f333-e783-4604-9556-dd6acc3d655c",
                "d94b7c48-f082-4e1d-a064-399888fd388b",
            ],
        });
    };
    return (
        <Button variant="outline" size="sm" className="ml-2 cursor-pointer text-orange-400" onClick={upgrade}>Upgrade</Button>
    );
}