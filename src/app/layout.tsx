import "./globals.css";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
export const metadata = {
  title: "ASKHAN Portfolio",
  description: "A portfolio for ASKHAN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: #f0f2f5;
              --foreground: #1a1a1a;
              --primary: #007bff;
              --card-background: #ffffff;
              --border-color: #e5e7eb;
            }
            .dark {
              --background: #121212;
              --foreground: #e5e5e5;
              --primary: #1e90ff;
              --card-background: #1e1e1e;
              --border-color: #2c2c2c;
            }
          `
        }} />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
