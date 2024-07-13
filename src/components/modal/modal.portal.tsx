import { createPortal } from "react-dom";

type TPortal = React.HTMLAttributes<HTMLDivElement> & {
  container?: Element;
};

export const ModalPortal: React.FC<TPortal> = (props: TPortal) => {
  const { container = globalThis.document.body, ...rest } = props;

  if (!container) return null;

  return createPortal(<div {...rest} />, container);
};
