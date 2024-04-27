import { CardWrapper } from "./CardWrapper";
import { HiExclamationTriangle } from "react-icons/hi2";

export const ErrorCard = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <CardWrapper
                headerLabel="⚡ Something went wrong, maybe you used a github/google account that are linked to same email."
                backButtonHref="/auth/login"
                backButtonLabel="Get me to login page"
            >
                <div className="w-full flex justify-center items-center">
                    <HiExclamationTriangle className="h-10 w-10" />
                </div>
            </CardWrapper>
        </div>
    );
}