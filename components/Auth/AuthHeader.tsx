import { Poppins } from "next/font/google";
import Image from 'next/image';


import { cn } from "@lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({label}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="rounded-full overflow-hidden">
                <Image
                    src="/assets/icons/logo.png"
                    alt="logo"
                    height={40}
                    width={40}
                    priority
                />
            </div>
            <h1 className={cn("text-3xl font-semibold", font.className)}>
                Authentication
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}