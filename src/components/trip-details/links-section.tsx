import { Link2 } from "lucide-react";

import { ModalCreateLink } from "./modal-create-link";

export const LinksSection: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <h3 className="font-semibold text-xl">Links Importantes</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Reserva do AIRBNB
            </span>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200 transition"
            >
              https://www.airbnb.com.br/rooms/104700011asdasdasdsadsad
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5" />
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Reserva do AIRBNB
            </span>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200 transition"
            >
              https://www.airbnb.com.br/rooms/104700011asdasdasdsadsad
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5" />
        </div>
      </div>

      <ModalCreateLink />
    </div>
  );
};
