import { X } from "lucide-react";
import { useModalContext } from "./modal";

type THeader = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  subHeader?: React.ReactNode;
};

export const ModalHeader: React.FC<THeader> = (props) => {
  const { onClose } = useModalContext();

  const { children, subHeader } = props;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{children}</h2>

        <button onClick={onClose} type="button">
          <X className="size-5 text-zinc-400 hover:text-zinc-200 transition" />
        </button>
      </div>

      {subHeader && subHeader}
    </div>
  );
};
