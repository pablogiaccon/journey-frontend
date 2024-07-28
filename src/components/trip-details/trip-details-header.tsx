import { useMemo } from "react";
import { MapPin, Calendar, Settings2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@components/button";
import { useTripDetailsContext } from "@hooks/use-trip-details";

export const TripDetailsHeader = () => {
  const { tripDetails } = useTripDetailsContext();

  const formattedDate = useMemo(() => {
    if (!tripDetails?.starts_at || !tripDetails?.ends_at) return null;

    const from = format(tripDetails.starts_at, "d 'de' LLL");
    const to = format(tripDetails.ends_at, "'até' d 'de' LLL");

    return `${from} ${to}`;
  }, [tripDetails?.ends_at, tripDetails?.starts_at]);

  return (
    <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{tripDetails?.destination}</span>
      </div>

      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{formattedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary" icon={<Settings2 />}>
          Alterar local/data
        </Button>
      </div>
    </header>
  );
};
