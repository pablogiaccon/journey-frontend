import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

import { Button } from "@components/button";

import "./styles/global.css";
import { ModalInviteGuests } from "@components/modal-invite-guests";
import { INewTripForm } from "@models/index";
import { FormProvider, useForm } from "react-hook-form";

export function App() {
  const formMethods = useForm<INewTripForm>();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);

  function handleOpenGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function handleCloseGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  return (
    <FormProvider {...formMethods}>
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="text-center max-w-3xl w-full px-6 space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none w-full"
                  placeholder="Para onde vc vai?"
                  type="text"
                  disabled={isGuestsInputOpen}
                />
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none w-40"
                  placeholder="Quando?"
                  type="text"
                  disabled={isGuestsInputOpen}
                />
              </div>

              <div className="w-px h-6 bg-zinc-800" />

              {isGuestsInputOpen ? (
                <Button
                  icon={<Settings2 />}
                  variant="secondary"
                  onClick={handleCloseGuestsInput}
                >
                  Alterar local/data
                </Button>
              ) : (
                <Button icon={<ArrowRight />} onClick={handleOpenGuestsInput}>
                  Continuar
                </Button>
              )}
            </div>

            {isGuestsInputOpen && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
                <ModalInviteGuests />

                <div className="w-px h-6 bg-zinc-800" />

                <Button icon={<ArrowRight />}>Confirmar viagem</Button>
              </div>
            )}
          </div>

          <p className="text-zinc-500 text-sm">
            Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
            <br /> com nossos{" "}
            <a
              className="text-zinc-300 underline"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              termos de uso
            </a>{" "}
            e{" "}
            <a
              className="text-zinc-300 underline"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              políticas de privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </FormProvider>
  );
}
