import { readFile } from "node:fs/promises";
import path from "node:path";
import Portfolio from "@/components/portfolio";

export default async function Home() {
  const html = await readFile(path.join(process.cwd(), "index.html"), "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];

  if (!body) {
    throw new Error("Não foi possível encontrar o conteúdo do portfólio em index.html.");
  }

  const markup = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    .replace(/\s(?:on\w+)=(?:"[^"]*"|'[^']*')/gi, "");

  return <Portfolio markup={markup} />;
}