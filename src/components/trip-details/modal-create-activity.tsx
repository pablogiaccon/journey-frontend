import { Controller, useForm } from "react-hook-form";
import { Calendar, Plus, Tag } from "lucide-react";

import * as Modal from "../modal";
import { Button } from "../button";
import { Input } from "@components/input";

interface NewActivityForm {
  description: string;
  occurs_at: Date;
}

const CreateActivityContent: React.FC = () => {
  const { control, handleSubmit } = useForm<NewActivityForm>({
    defaultValues: {
      description: "",
      occurs_at: new Date(),
    },
  });

  function handleCreateActivity(data: NewActivityForm) {
    console.log("data: ", data);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateActivity)} className="space-y-3">
      <Controller
        control={control}
        name="description"
        rules={{
          required: "Campo obrigatório",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Qual a atividade?"
            type="text"
            name="description"
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

      <Button className="w-full justify-center" type="submit">
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
        <Modal.Content>
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
