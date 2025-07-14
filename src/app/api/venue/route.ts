import { NextResponse } from "next/server";

/**
 * GET /api/venue
 *
 * Retorna os dados do restaurante
 *
 * ▸ **Responsabilidade**
 * - Obter os dados do restaurante
 * - Retornar os dados do restaurante
 *
 * @returns {object} - Objeto com os dados do restaurante
 */
export async function GET() {
  const res = await fetch("https://cdn-dev.preoday.com/challenge/venue/9");
  const data = await res.json();
  return NextResponse.json(data);
}
