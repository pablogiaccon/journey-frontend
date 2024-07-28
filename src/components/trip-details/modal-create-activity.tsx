import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Calendar, Plus, Tag } from "lucide-react";

import { useCreateActivityService, TCreateNewActivity } from "@services/index";

import * as Modal from "../modal";
import { Button } from "../button";
import { Input } from "@components/input";
import { queryClient } from "@lib/react-query";

const CreateActivityContent: React.FC = () => {
  const { tripId } = useParams();
  const { onClose } = Modal.useModalContext();
  const { mutateAsync, isPending } = useCreateActivityService({ tripId });
  const { control, handleSubmit } = useForm<TCreateNewActivity>({
    defaultValues: {
      title: "",
      occurs_at: new Date(),
    },
  });

  async function handleCreateActivity({
    occurs_at,
    title,
  }: TCreateNewActivity) {
    try {
      await mutateAsync({ occurs_at, title });

      queryClient.invalidateQueries({
        queryKey: ["trip-activities", { tripId }],
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateActivity)} className="space-y-3">
      <Controller
        control={control}
        name="title"
        rules={{
          required: "Campo obrigatório",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Qual a atividade?"
            type="text"
            name="title"
            value={field.value}
            onChange={field.onChange}
            icon={<Tag />}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="occurs_at"
        rules={{
          required: "Campo obrigatório",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Data e horário da atividade"
            type="datetime-local"
            name="occurs_at"
            value={field.value as any}
            onChange={field.onChange}
            icon={<Calendar />}
            error={error?.message}
          />
        )}
      />

      <Button size="full" type="submit" isLoading={isPending}>
        Salvar atividade
      </Button>
    </form>
  );
};

export const ModalCreateActivity: React.FC = () => {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button iconPosition="left" icon={<Plus />}>
          Cadastrar atividade
        </Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Content size="form">
          <Modal.Header
            subHeader={
              <p className="text-sm text-zinc-400">
                Todos convidados podem visualizar as atividades.
              </p>
            }
          >
            Cadastrar atividade
          </Modal.Header>

          <CreateActivityContent />
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
