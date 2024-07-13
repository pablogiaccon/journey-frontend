import { ButtonHTMLAttributes } from "react";

import classNames from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<IProps> = (props) => {
  const { variant = "primary", disabled, icon, children, ...rest } = props;

  const buttonClass = classNames(
    "rounded-lg px-5 py-2 font-medium flex items-center gap-2 transition",
    {
      "bg-lime-300 text-lime-950  hover:bg-lime-400": variant === "primary",
      "bg-zinc-800 text-zinc-200 hover:bg-zinc-700": variant === "secondary",
      "opacity-60": !!disabled,
    }
  );

  return (
    <button className={buttonClass} disabled={disabled} type="button" {...rest}>
      {children}
      {icon && icon}
    </button>
  );
};