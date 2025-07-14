import type { Metadata } from "next";
import { Header } from "./components/layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

/**
 * Metadados da aplicação
 */
export const metadata: Metadata = {
  title: "Restaurant Menu Challenge",
  description: "Desafio técnico para criação de menu de restaurante",
};

/**
 * RootLayout Component
 *
 * Layout principal da aplicação, onde se encontra o cabeçalho e o corpo da aplicação.
 *
 * ▸ **Responsabilidade**
 * - Renderizar o cabeçalho e o corpo da aplicação
 *
 * @component
 * @param {React.ReactNode} children - Conteúdo filho do layout.
 *
 * @example
 * ```tsx
 * <RootLayout>
 *    Conteúdo do layout
 * </RootLayout>
 * ```
 */
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
      <body className={`antialiased ${roboto.className}`}>
        <Header />
        <main className="w-full lg:w-small mx-auto flex flex-col gap-4 p-4 lg:px-0 lg:py-4">
          {children}
        </main>
      </body>
    </html>
  );
}
