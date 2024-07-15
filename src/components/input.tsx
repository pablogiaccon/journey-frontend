import classNames from "classnames";
import React from "react";

type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactElement;
  error?: string;
  customizedStyleContainer?: string; // Expecting Tailwind CSS classes as a string
};

export const Input: React.FC<TInput> = (props) => {
  const { icon, error, customizedStyleContainer, ...rest } = props;

  const stylesContainer = classNames(
    "px-4 flex items-center flex-1 gap-2 h-14 shadow-shape rounded-lg bg-zinc-950 border border-1 border-zinc-800 outline outline-1 outline-offset-2 outline-transparent focus-within:outline-lime-300 transition",
    customizedStyleContainer
  );

  return (
    <div className="space-y-2">
      <div className={stylesContainer}>
        {React.cloneElement(icon, { className: "size-5 text-zinc-400" })}

        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 h-full"
          {...rest}
        />
      </div>

      {!!error && <span className="text-red-500 text-xs px-2">{error}</span>}
    </div>
  );
};
