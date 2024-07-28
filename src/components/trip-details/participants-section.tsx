import { useParams } from "react-router-dom";
import { CircleCheck, CircleDashed } from "lucide-react";

import { useTripParticipantsService } from "@services/index";

import { SpinLoader } from "@components/spin-loader";
import { ModalManageParticipants } from "./modal-add-participants";

export const ParticipantsSection: React.FC = () => {
  const { tripId } = useParams();
  const { data: tripParticipants, isLoading: isLoadingParticipants } =
    useTripParticipantsService({ tripId: tripId });

  return (
    <div className="flex flex-col space-y-6">
      <h3 className="font-semibold text-xl">Convidados</h3>

      {isLoadingParticipants ? (
        <div className="p-5 flex items-center justify-center">
          <SpinLoader variant="secondary" />
        </div>
      ) : (
        <div className="space-y-5">
          {tripParticipants?.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-6"
            >
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>

              {participant.is_confirmed ? (
                <CircleCheck className="text-lime-300 size-5" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5" />
              )}
            </div>
          ))}
        </div>
      )}

      <ModalManageParticipants />
    </div>
  );
};
