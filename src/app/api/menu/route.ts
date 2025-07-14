import { NextResponse } from "next/server";

/**
 * GET /api/menu
 *
 * Retorna os dados do menu
 *
 * ▸ **Responsabilidade**
 * - Obter os dados do menu
 * - Retornar os dados do menu
 *
 * @returns {object} - Objeto com os dados do menu *
 */
export async function GET() {
  const res = await fetch("https://cdn-dev.preoday.com/challenge/menu");
  const data = await res.json();
  return NextResponse.json(data);
}
