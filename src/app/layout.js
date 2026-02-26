// /app/layout.js
import ReactQueryProvider from "../app/hooks/ReactQueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",   // optional CSS variable
  display: "swap",
});
export const metadata = {
  title: "Dashboard",
  description: "Project Dashboard",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100">
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}