import { useState } from "react";
import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from "lucide-react";

import { Button } from "@components/button";
import * as Modal from "@components/modal";

import "./styles/global.css";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);

  function handleOpenGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function handleCloseGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  return (
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
              <Modal.Root>
                <Modal.Trigger className="flex items-center gap-2 flex-1 text-left">
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  <span className="text-zinc-400 text-lg flex-1">
                    Quem estará na viagem?
                  </span>
                </Modal.Trigger>

                <Modal.Portal>
                  <Modal.Content>
                    <Modal.Header
                      subHeader={
                        <p className="text-sm text-zinc-400">
                          Os convidados irão receber e-mails para confirmar a
                          participação na viagem.
                        </p>
                      }
                    >
                      Selecionar convidados
                    </Modal.Header>

                    <div className="flex gap-2 flex-wrap">
                      <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                        <span className="text-zinc-300">
                          pablogiaccon@gmail.com
                        </span>

                        <button
                          className="text-zinc-400 hover:text-zinc-200 transition"
                          type="button"
                        >
                          <X className="size-4" />
                        </button>
                      </div>

                      <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                        <span className="text-zinc-300">
                          pablogiaccon@gmail.com
                        </span>

                        <button
                          className="text-zinc-400 hover:text-zinc-200 transition"
                          type="button"
                        >
                          <X className="size-4" />
                        </button>
                      </div>

                      <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                        <span className="text-zinc-300">
                          pablogiaccon@gmail.com
                        </span>

                        <button
                          className="text-zinc-400 hover:text-zinc-200 transition"
                          type="button"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-px bg-zinc-800" />

                    <form className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                      <div className="px-2 flex items-center flex-1 gap-2">
                        <AtSign className="size-5 text-zinc-400" />

                        <input
                          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 h-full"
                          placeholder="Digite o email do convidado"
                          type="text"
                        />
                      </div>

                      <Button icon={<Plus />}>Convidar</Button>
                    </form>
                  </Modal.Content>
                </Modal.Portal>
                <Modal.Overlay />
              </Modal.Root>

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
  );
}
