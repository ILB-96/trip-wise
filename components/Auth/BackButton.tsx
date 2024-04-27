"use client"

import { Button } from "@components/ui/button"
import Link from "next/link";

interface BackButtonProps {
    href: string;
    label: string;
};

export const BackButton = ({
    href,
    label,
}: BackButtonProps) => {
    return (
        <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild // to render the Link component properly
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}