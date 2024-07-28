import { Link2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { useTripLinksService } from "@services/trips";

import { ModalCreateLink } from "./modal-create-link";
import { SpinLoader } from "@components/spin-loader";

export const LinksSection: React.FC = () => {
  const { tripId } = useParams();
  const { data: tripLinks, isLoading } = useTripLinksService({ tripId });

  return (
    <div className="flex flex-col space-y-6">
      <h3 className="font-semibold text-xl">Links Importantes</h3>

      {isLoading ? (
        <div className="p-5 flex items-center justify-center">
          <SpinLoader variant="secondary" />
        </div>
      ) : (
        <div className="space-y-5">
          {tripLinks?.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between gap-6"
            >
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200 transition"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5" />
            </div>
          ))}
        </div>
      )}

      <ModalCreateLink />
    </div>
  );
};
