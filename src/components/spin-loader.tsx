import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const spinLoaderVariants = tv({
  base: "animate-spin h-5 w-5",
  variants: {
    variant: {
      primary: "text-zinc-800",
      secondary: "text-lime-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface IProps
  extends ComponentProps<"svg">,
    VariantProps<typeof spinLoaderVariants> {}

export const SpinLoader: React.FC<IProps> = (props) => {
  const { variant } = props;

  return (
    <svg
      className={spinLoaderVariants({ variant })}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
