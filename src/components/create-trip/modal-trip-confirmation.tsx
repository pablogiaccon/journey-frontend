import { User, Mail, ArrowRight } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { INewTripForm } from "@models/index";
import { useCreateTripService } from "@services/index";
import { validateEmail } from "@utils/validateEmail";

import * as Modal from "../modal";
import { Button } from "../button";
import { Input } from "../input";

const TripConfirmationContent: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateTripService();

  const { control, handleSubmit } = useFormContext<INewTripForm>();

  async function handleConfirmTrip(data: INewTripForm) {
    try {
      const response = await mutateAsync(data);
      const { tripId } = response.data;

      navigate(`trip-details/${tripId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-3">
      <Controller
        control={control}
        name="ownerName"
        rules={{
          required: "Campo obrigatório",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Seu nome completo"
            type="text"
            name="ownerName"
            value={field.value}
            onChange={field.onChange}
            icon={<User />}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="ownerEmail"
        rules={{
          required: "Campo obrigatório",
          validate: {
            isEmail: (email) => validateEmail(email) || "E-mail inválido",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Seu e-mail pessoal"
            type="email"
            name="ownerEmail"
            value={field.value}
            onChange={field.onChange}
            icon={<Mail />}
            error={error?.message}
          />
        )}
      />
      <Button
        size="full"
        type="submit"
        onClick={handleSubmit(handleConfirmTrip)}
        isLoading={isPending}
      >
        Confirmar criação da viagem
      </Button>
    </div>
  );
};

export const ModalTripConfirmation: React.FC = () => {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button icon={<ArrowRight />}>Confirmar viagem</Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Content size="form">
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
          <TripConfirmationContent />
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
