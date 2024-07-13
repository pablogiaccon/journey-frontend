import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useModalContext } from "./modal";

type TContent = React.HTMLAttributes<HTMLDivElement>;

export const ModalContent: React.FC<TContent> = (props: TContent) => {
  const ref = useRef<HTMLDivElement>(null);
  const { children, ...rest } = props;

  const { onClose, open } = useModalContext();

  useOnClickOutside(ref, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      className="w-[640px] rounded-xl fixed py-5 px-6 shadow-shape bg-zinc-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col gap-5"
      {...rest}
    >
      {children}
    </div>
  );
};
