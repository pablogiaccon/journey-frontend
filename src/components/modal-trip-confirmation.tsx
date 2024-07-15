import { User, Mail, ArrowRight } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { INewTripForm } from "@models/index";

import * as Modal from "./modal";
import { Button } from "./button";
import { Input } from "./input";

export const ModalTripConfirmation: React.FC = () => {
  const { control, handleSubmit } = useFormContext<INewTripForm>();

  function handleConfirmTrip(data: INewTripForm) {
    console.log("data: ", data);
  }

  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button icon={<ArrowRight />}>Confirmar viagem</Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Content>
          <Modal.Header
            subHeader={
              <p className="text-sm text-zinc-400">
                Para concluir a criação da viagem para{" "}
                <strong>Florianópolis, Brasil</strong> nas datas de{" "}
                <strong>16 a 27 de Agosto de 2024</strong> preencha seus dados
                abaixo:
              </p>
            }
          >
            Confirmar criação da viagem
          </Modal.Header>

          <div className="space-y-3">
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  placeholder="Seu nome completo"
                  type="text"
                  name="name"
                  value={field.value}
                  onChange={field.onChange}
                  icon={<User />}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  placeholder="Seu e-mail pessoal"
                  type="email"
                  name="email"
                  value={field.value}
                  onChange={field.onChange}
                  icon={<Mail />}
                  error={error?.message}
                />
              )}
            />
            <Button
              className="w-full justify-center"
              type="submit"
              onClick={handleSubmit(handleConfirmTrip)}
            >
              Confirmar criação da viagem
            </Button>
          </div>
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};