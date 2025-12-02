"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
            products: [
                "10686663-edef-4b18-94de-d4f09f88dbc3",
                "1aa8b68a-da51-4b2a-928a-6e975f9e86f2",
                "9cde0ea5-fd79-4971-b81f-3e33e20e4cb0",
            ],
        });
    };
    return (
        <Button variant="outline" size="sm" className="ml-2 cursor-pointer text-orange-400" onClick={upgrade}>Upgrade</Button>
    );
}