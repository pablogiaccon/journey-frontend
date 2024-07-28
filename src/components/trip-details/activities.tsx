import { CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useTripActivitiesService } from "@services/index";

import { SpinLoader } from "@components/spin-loader";

export const Activities: React.FC = () => {
  const { tripId } = useParams();
  const { data: tripActivities, isLoading } = useTripActivitiesService({
    tripId,
  });

  const hasActivities = !!tripActivities && tripActivities?.length > 0;

  return (
    <>
      {isLoading ? (
        <div className="p-5 flex items-center justify-center">
          <SpinLoader variant="secondary" />
        </div>
      ) : (
        <div className="space-y-8">
          {hasActivities ? (
            <>
              {tripActivities.map((dayActivity) => (
                <div key={dayActivity.date.toString()} className="space-y-2.5">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">
                      Dia {format(dayActivity.date, "d", { locale: ptBR })}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {format(dayActivity.date, "EEEE", { locale: ptBR })}
                    </span>
                  </div>

                  {dayActivity.activities.length === 0 ? (
                    <p className="text-zinc-500 text-sm">
                      Nenhuma atividade cadastrada nessa data.
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {dayActivity.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3"
                        >
                          <CircleCheck className="size-5 text-lime-300" />
                          <span className="text-zinc-100">
                            {activity.title}
                          </span>
                          <span className="text-zinc-400 text-sm ml-auto ">
                            {format(activity.occurs_at, "HH:mm'h'", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada.
            </p>
          )}
        </div>
      )}
    </>
  );
};
