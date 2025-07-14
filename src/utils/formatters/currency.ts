/**
 * Formata um valor numérico como moeda brasileira (BRL).
 *
 * @param value - Valor numérico
 * @returns Valor formatado como moeda
 */
export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
