import { Calendar, MapPin, Settings2 } from "lucide-react";

import { Button } from "@components/button";
import {
  Activities,
  GuestsSection,
  LinksSection,
  ModalCreateActivity,
} from "@components/trip-details";

export function TripDetailsPage() {
  return (
    <div className="max-w-6xl px-24 py-10 mx-auto space-y-8">
      <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Florianópolis, Brasil</span>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">17 a 23 de Agosto</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <Button variant="secondary" icon={<Settings2 />}>
            Alterar local/data
          </Button>
        </div>
      </header>

      <div className="flex gap-16 px-4">
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-3xl font-semibold ">Atividades</h2>

            <ModalCreateActivity />
          </div>

          <Activities />
        </main>

        <aside className="w-80 space-y-6">
          <LinksSection />

          <div className="w-full h-px bg-zinc-800" />

          <GuestsSection />
        </aside>
      </div>
    </div>
  );
}
