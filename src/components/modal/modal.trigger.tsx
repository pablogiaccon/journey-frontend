import {
  MouseEvent,
  ButtonHTMLAttributes,
  ReactElement,
  cloneElement,
  ReactNode,
} from "react";

import { useModalContext } from "./modal";

type TTriggerAsChild = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild: true;
  children: ReactElement;
};

type TTrigger = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: never;
  children: ReactNode;
};

type TTriggerBasis = TTriggerAsChild | TTrigger;

export const ModalTrigger: React.FC<TTriggerBasis> = (props) => {
  const { children, onClick, asChild = false, ...rest } = props;

  const { onOpen } = useModalContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onOpen();

    if (onClick) {
      onClick(e);
    }
  }

  if (asChild) {
    return cloneElement(children as ReactElement, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};
