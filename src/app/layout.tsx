import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../../providers/QueryProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextjs Social Media App" /*Title of App, Shows in Browser Tab*/,
  description:
    "Nextjs Fullstack App with Tailwind CSS and Prisma" /*Description of App, Shows in Search Engine Results*/,
};

/* TO USER REACT QUERY:
   have to wrap the whole application with the react query provider, but thar requires making this a client 
   component, which makes our entire application client component. so we'll create a seperate provider for it */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-dark-1 antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        <ToastContainer
          position="top-center"
          theme="light"
          hideProgressBar={true}
          autoClose={5000}
        />
      </body>
    </html>
  );
}
