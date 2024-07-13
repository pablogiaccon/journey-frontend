import { useModalContext } from "./modal";

type TOverlay = React.HTMLAttributes<HTMLDivElement>;

export const ModalOverlay: React.FC<TOverlay> = (props: TOverlay) => {
  const { open } = useModalContext();

  if (!open) return null;

  return <div {...props} className="fixed inset-0 bg-black/60" />;
};
