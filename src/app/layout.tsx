import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Restaurant Menu Challenge",
  description: "Desafio técnico para criação de menu de restaurante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        <main className="w-full lg:w-small mx-auto flex flex-col gap-4 p-4 lg:px-0 lg:py-4">
          {children}
        </main>
      </body>
    </html>
  );
}
