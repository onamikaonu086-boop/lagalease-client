import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "LegalEase - Online Lawyer Hiring Platform",
  description: "Connect with premium legal aid and expert lawyers online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f19] text-white antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
        
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}