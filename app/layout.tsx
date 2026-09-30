import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vitor-souza-portfolio.vls2187.chatgpt.site"),
  title: "Vitor Lisboa Souza | Desenvolvedor de Software, UX/UI & Dados",
  description:
    "Portfólio de Vitor Lisboa Souza, desenvolvedor de software com atuação em produtos digitais, desenvolvimento web, UX/UI, dados, Business Intelligence e automação.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Vitor Lisboa Souza | Desenvolvimento, UX/UI & Dados",
    description:
      "Transformo problemas e ideias em experiências e produtos digitais funcionais.",
    images: [{ url: "/og.png", alt: "Vitor Lisboa Souza — Desenvolvimento, UX/UI e Dados" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitor Lisboa Souza | Desenvolvimento, UX/UI & Dados",
    description:
      "Transformo problemas e ideias em experiências e produtos digitais funcionais.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}