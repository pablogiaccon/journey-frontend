import { useState } from "react";
import { ArrowRight, MapPin, Settings2 } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { INewTripForm } from "@models/index";

import { Button } from "@components/button";
import {
  ModalInviteParticipants,
  ModalTripConfirmation,
} from "@components/create-trip";
import { DatePicker } from "@components/date-picker";
import { Input } from "@components/input";

export function CreateTripPage() {
  const formMethods = useForm<INewTripForm>({
    defaultValues: {
      participants: [],
      destination: "",
      ownerEmail: "",
      ownerName: "",
      rangeDate: undefined,
    },
  });

  const [isParticipantsInputOpen, setIsParticipantsInputOpen] = useState(false);

  function handleOpenParticipantsInput() {
    setIsParticipantsInputOpen(true);
  }

  function handleCloseParticipantsInput() {
    setIsParticipantsInputOpen(false);
  }

  const destination = formMethods.watch("destination");
  const rangeDate = formMethods.watch("rangeDate");

  const isDestinationAndDateEmpty =
    !!destination.length && !!rangeDate?.from && !!rangeDate.to;

  return (
    <FormProvider {...formMethods}>
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="text-center max-w-4xl w-full px-6 space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-16 bg-zinc-900 pr-4 rounded-xl flex items-center gap-3 shadow-shape">
              <Controller
                control={formMethods.control}
                name="destination"
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field }) => (
                  <Input
                    icon={<MapPin />}
                    containerStyles={{ variant: "embed" }}
                    placeholder="Para onde vc vai?"
                    type="text"
                    disabled={isParticipantsInputOpen}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={formMethods.control}
                name="rangeDate"
                render={({ field }) => (
                  <DatePicker
                    onSelectRange={field.onChange}
                    rangeDate={field.value}
                    triggerText="Quando?"
                    disabled={isParticipantsInputOpen}
                  />
                )}
              />

              <div className="w-px h-6 bg-zinc-800" />

              {isParticipantsInputOpen ? (
                <Button
                  icon={<Settings2 />}
                  variant="secondary"
                  onClick={handleCloseParticipantsInput}
                >
                  Alterar local/data
                </Button>
              ) : (
                <Button
                  disabled={!isDestinationAndDateEmpty}
                  icon={<ArrowRight />}
                  onClick={handleOpenParticipantsInput}
                >
                  Continuar
                </Button>
              )}
            </div>

            {isParticipantsInputOpen && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
                <ModalInviteParticipants />

                <div className="w-px h-6 bg-zinc-800" />

                <ModalTripConfirmation />
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
