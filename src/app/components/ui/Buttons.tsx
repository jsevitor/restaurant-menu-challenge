import { Venue } from "@/types/venue";

/**
 * Props para o componente GeneralButton
 */
type ButtonProps = {
  /** Função para executar ao clicar no botão */
  action?: () => void;
  /** Dados do restaurante, usado para definir a cor do botão */
  venue: Venue;
  /** Conteúdo que será exibido dentro do botão */
  children: React.ReactNode;
};

/**
 * GeneralButton Component
 *
 * Botão reutilizável com estilo dinâmico baseado no restaurante.
 *
 * @param props - Parâmetros do botão.
 * @param props.action - Função executada ao clicar.
 * @param props.venue - Cores e estilo do restaurante.
 * @param props.children - Elemento filho (ex: texto do botão).
 *
 * @example
 * ```tsx
 * <GeneralButton action={handleClick} venue={venue}>
 *   Finalizar pedido
 * </GeneralButton>
 * ```
 */
export function GeneralButton(props: ButtonProps) {
  const { action, venue, children } = props;

  return (
    <button
      className="p-3 w-full rounded-full text-bg-primary cursor-pointer font-semibold shadow-md hover:opacity-90"
      style={{ backgroundColor: venue?.webSettings.primaryColour }}
      onClick={() => action?.()}
    >
      {children}
    </button>
  );
}
