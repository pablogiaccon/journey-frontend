import { Controller, useForm } from "react-hook-form";
import { Calendar, Plus, Tag } from "lucide-react";

import * as Modal from "../modal";
import { Button } from "../button";
import { Input } from "../input";

interface NewLinkForm {
  title: string;
  url: string;
}

const CreateLinkContent: React.FC = () => {
  const { control, handleSubmit } = useForm<NewLinkForm>({
    defaultValues: {
      title: "",
      url: "",
    },
  });

  function handleCreateLink(data: NewLinkForm) {
    console.log("data: ", data);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateLink)} className="space-y-3">
      <Controller
        control={control}
        name="title"
        rules={{
          required: "Campo obrigatório",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Título do link"
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
        name="url"
        rules={{
          required: "Campo obrigatório",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="URL"
            type="text"
            name="url"
            value={field.value}
            onChange={field.onChange}
            icon={<Calendar />}
            error={error?.message}
          />
        )}
      />

      <Button className="w-full justify-center" type="submit">
        Salvar link
      </Button>
    </form>
  );
};

export const ModalCreateLink: React.FC = () => {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button
          className="justify-center"
          variant="secondary"
          iconPosition="left"
          icon={<Plus />}
        >
          Cadastrar novo link
        </Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Content>
          <Modal.Header
            subHeader={
              <p className="text-sm text-zinc-400">
                Todos convidados podem visualizar os links importantes.
              </p>
            }
          >
            Cadastrar link
          </Modal.Header>

          <CreateLinkContent />
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
