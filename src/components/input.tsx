import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "px-4 flex items-center flex-1 gap-2 h-14 rounded-lg",

  variants: {
    variant: {
      embed: "bg-transparent outline-none",
      form: "bg-zinc-950 border border-1 border-zinc-800 shadow-shape outline outline-1 outline-offset-2 outline-transparent focus-within:outline-lime-300 transition",
    },
  },
  defaultVariants: {
    variant: "form",
  },
});

type TInput = React.ComponentProps<"input"> & {
  icon: React.ReactElement;
  error?: string;
  containerStyles?: VariantProps<typeof inputVariants>;
};

export const Input: React.FC<TInput> = (props) => {
  const { icon, error, containerStyles, ...rest } = props;

  return (
    <div className="flex-1">
      <div className={inputVariants({ variant: containerStyles?.variant })}>
        {React.cloneElement(icon, { className: "size-5 text-zinc-400" })}

        <input
          type="text"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 h-full"
          {...rest}
        />
      </div>

      {!!error && <span className="text-red-500 text-xs px-2">{error}</span>}
    </div>
  );
};
