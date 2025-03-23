import { HomeWrapper } from "components/home/home";

export const generateMetadata = async () => ({
    title: "ChatApp | Connect Instantly",
    description: "Welcome to ChatApp – your space for real-time conversations, seamless messaging, and staying connected with the people who matter most.",
});

export default function HomePage() {
    return (
        <HomeWrapper />
    );
}
