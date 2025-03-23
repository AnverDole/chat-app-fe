import SignIn from "components/auth/sign-in";

export const generateMetadata = async () => ({
    title: "Login | ChatApp",
    description: "Access your ChatApp account to continue conversations, manage contacts, and stay connected in real time.",
});

export default function SignInPage() {
    return (
        <SignIn />
    );
}
