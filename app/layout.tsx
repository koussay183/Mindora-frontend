import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingProvider from "@/components/LoadingProvider";

export const metadata: Metadata = {
  title: "Mindora - Discover Your True Personality",
  description: "Take our interactive personality quiz and discover which of our 4 personality types matches you best. Get instant results with detailed insights.",
  keywords: ["personality quiz", "personality test", "self discovery", "psychology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className="antialiased text-[#1A202C]" style={{ backgroundImage: 'url(/background-image.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
        <AuthProvider>
          <LoadingProvider>
            <div className="flex flex-col min-h-screen">
              <div className="pt-5">
                <Header />
              </div>
              <main className="flex-1">
                {children}
              </main>
            </div>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
