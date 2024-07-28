import { TripDetailsProvider } from "@hooks/index";

import {
  Activities,
  ParticipantsSection,
  LinksSection,
  ModalCreateActivity,
  TripDetailsHeader,
} from "@components/trip-details";

export function TripDetailsPage() {
  return (
    <TripDetailsProvider>
      <div className="max-w-6xl px-24 py-10 mx-auto space-y-8">
        <TripDetailsHeader />

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

            <ParticipantsSection />
          </aside>
        </div>
      </div>
    </TripDetailsProvider>
  );
}
