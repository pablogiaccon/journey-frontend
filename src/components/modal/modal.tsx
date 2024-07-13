import { ReactNode, createContext, useContext, useEffect } from "react";
import { isEmpty } from "lodash";
import { useBoolean, useScrollLock } from "usehooks-ts";

import { ModalOverlay } from "./modal.overlay";
import { ModalContent } from "./modal.content";
import { ModalTrigger } from "./modal.trigger";
import { ModalPortal } from "./modal.portal";
import { ModalHeader } from "./modal.header";

interface IModalContextData {
  open: boolean;
  toggle(): void;
  onClose(): void;
  onOpen(): void;
}

const ModalContext = createContext<IModalContextData>({} as IModalContextData);

interface IProps {
  children: ReactNode;
}

function Modal(props: IProps) {
  const { value: open, toggle, setTrue, setFalse } = useBoolean();
  const { lock, unlock } = useScrollLock({ autoLock: false });

  useEffect(() => {
    if (open) {
      lock();
    } else {
      unlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <ModalContext.Provider
      value={{ onClose: setFalse, onOpen: setTrue, open, toggle }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  const context = useContext(ModalContext);

  if (isEmpty(context)) {
    throw new Error("useModalContext must be used within a Modal.Root");
  }

  return context;
}

Modal.Root = Modal;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Trigger = ModalTrigger;
Modal.Portal = ModalPortal;
Modal.Header = ModalHeader;

export {
  Modal as Root,
  ModalOverlay as Overlay,
  ModalContent as Content,
  ModalTrigger as Trigger,
  ModalPortal as Portal,
  ModalHeader as Header,
  useModalContext,
};
