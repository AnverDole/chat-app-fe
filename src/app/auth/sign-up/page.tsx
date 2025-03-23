import SignUp from "components/auth/sign-up";

export const generateMetadata = async () => ({
    title: "Sign Up | ChatApp",
    description: "Create your ChatApp account to start conversations, connect with friends, and experience real-time messaging.",
  });
  

export default function SignUpPage() {
    return (
        <SignUp />
    );
}
