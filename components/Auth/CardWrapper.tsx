"use client";

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader 
} from "@components/ui/card";
import { AuthHeader } from "./AuthHeader";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <AuthHeader label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )
        }
        <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
        </CardFooter>
        </Card>
    )
}