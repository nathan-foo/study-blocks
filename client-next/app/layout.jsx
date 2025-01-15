import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Study Blocks Prototype",
  description: "An AI-powered LMS app for reviewing study material.",
};

const poppins = Poppins({ subsets: ['latin'], weight: [ "400", "700", "800" ] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
