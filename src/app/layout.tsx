import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: `${profile.name} | Mechanical Engineer & Intelligent Systems Researcher`,
  description:
    "Mechanical Engineering student and researcher passionate about mechanical design, intelligent systems, FEA, CFD, and applied machine learning.",
  keywords: [
    "Muhammad Saad",
    "Mechanical Engineer",
    "GIKI",
    "SolidWorks CSWP",
    "FEA",
    "CFD",
    "Robotics",
    "AI",
  ],
  openGraph: {
    title: `${profile.name} | Mechanical Engineer & Intelligent Systems Researcher`,
    description:
      "Mechanical Engineering student and researcher passionate about mechanical design, intelligent systems, FEA, CFD, and applied machine learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Mechanical Engineer & Intelligent Systems Researcher`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
