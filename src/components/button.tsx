import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

import { SpinLoader } from "./spin-loader";

const buttonVariants = tv({
  base: "rounded-lg px-5 font-medium flex text-nowrap items-center justify-center gap-2 transition disabled:opacity-60",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950  hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface IProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  iconPosition?: "right" | "left";
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<IProps> = (props) => {
  const {
    variant = "primary",
    disabled,
    icon,
    children,
    iconPosition = "right",
    size,
    isLoading = false,
    ...rest
  } = props;

  return (
    <button
      className={buttonVariants({ variant, size })}
      disabled={disabled || isLoading}
      type="button"
      {...rest}
    >
      {isLoading ? (
        <SpinLoader variant={variant} />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};
