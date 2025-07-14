import { MenuItem } from "./menu";

/**
 * Props para o componente Modal
 */
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  item?: MenuItem | null;
};
