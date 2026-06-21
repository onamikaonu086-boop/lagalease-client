'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="...">
        <GoogleOAuthProvider clientId="204458447857-hocqbhhnmgb9tmarc0edh5fq7179tc09.apps.googleusercontent.com">
          <AuthProvider>
            <Navbar />
            {children}
            <Footer/>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}