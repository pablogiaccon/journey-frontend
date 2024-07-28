import { AtSign, OctagonX, Plus, UserCog } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  useInviteParticipantService,
  useTripParticipantsService,
} from "@services/trips";
import { validateDuplicity, validateEmail } from "@utils/validateEmail";
import { queryClient } from "@lib/react-query";

import * as Modal from "../modal";
import { Button } from "../button";
import { SpinLoader } from "@components/spin-loader";

const ManageParticipantsContent = () => {
  const { tripId } = useParams();

  const { data: participants, isFetching } = useTripParticipantsService({
    tripId,
  });
  const { mutateAsync, isPending } = useInviteParticipantService({ tripId });

  const { control, handleSubmit, reset } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmitParticipantInvite(data: { email: string }) {
    try {
      const { email } = data;
      await mutateAsync({ email });

      queryClient.invalidateQueries({
        queryKey: ["trip-participants", { tripId }],
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {participants?.map((participant) => (
          <div
            key={participant.id}
            className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
          >
            <span className="text-zinc-300">{participant.email}</span>
          </div>
        ))}
        {isFetching && (
          <div className="flex items-center justify-center">
            <SpinLoader variant="secondary" />
          </div>
        )}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form
        onSubmit={handleSubmit(handleSubmitParticipantInvite)}
        className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
      >
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Campo obrigatório",
            validate: {
              isEmail: (email) => validateEmail(email) || "E-mail inválido",
              isDuplicated: (email) =>
                !validateDuplicity(
                  email,
                  participants?.map((item) => item.email) || []
                ) || "E-mail já convidado",
            },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <>
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign
                  className={`size-5 ${
                    invalid ? "text-red-500" : "text-zinc-400"
                  }`}
                />

                <input
                  className={`bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 h-full ${
                    invalid
                      ? "placeholder-red-500 text-red-500"
                      : "placeholder-zinc-400 text-zinc-400"
                  }`}
                  placeholder="Digite o email do convidado"
                  type="email"
                  name="email"
                  value={field.value}
                  onChange={field.onChange}
                />

                {invalid && (
                  <span title={error?.message}>
                    <OctagonX className="text-red-500" />
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={invalid}
                icon={<Plus />}
                isLoading={isPending}
              >
                Convidar
              </Button>
            </>
          )}
        />
      </form>
    </>
  );
};

export const ModalManageParticipants: React.FC = () => {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button variant="secondary" iconPosition="left" icon={<UserCog />}>
          Gerenciar convidados
        </Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Content size="form">
          <Modal.Header
            subHeader={
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            }
          >
            Gerenciar convidados
          </Modal.Header>

          <ManageParticipantsContent />
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
