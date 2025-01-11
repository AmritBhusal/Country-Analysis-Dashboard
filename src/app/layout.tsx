
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import Providers from "./Provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Country Analysis Dashboard', // Your new title here
  description: 'Analysis of countries by continent with interactive charts',
    icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
