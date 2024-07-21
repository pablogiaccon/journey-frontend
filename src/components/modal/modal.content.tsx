import { ComponentProps, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useModalContext } from "./modal";
import { tv, VariantProps } from "tailwind-variants";

const modalContentVariants = tv({
  base: "rounded-xl fixed py-5 px-6 shadow-shape bg-zinc-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col gap-5",
  variants: {
    size: {
      form: "w-[640px]",
    },
  },
});

type TContent = ComponentProps<"div"> &
  VariantProps<typeof modalContentVariants>;

export const ModalContent: React.FC<TContent> = (props: TContent) => {
  const ref = useRef<HTMLDivElement>(null);
  const { children, size, ...rest } = props;

  const { onClose, open } = useModalContext();

  useOnClickOutside(ref, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      className={modalContentVariants({ size })}
      {...rest}
    >
      {children}
    </div>
  );
};
