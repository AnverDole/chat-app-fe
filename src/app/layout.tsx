import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "context/auth-context";


// Load Roboto Condensed as a CSS variable
const robotoCondensed = Roboto_Condensed({
    variable: "--font-roboto-condensed",
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

export const metadata = {
    title: "ChatApp",
    description: "Connect instantly with friends and colleagues on ChatApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={robotoCondensed.variable}>
                <AuthProvider>
                    {children}
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
