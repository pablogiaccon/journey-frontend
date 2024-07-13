import { UserRoundPlus, X, AtSign, Plus } from "lucide-react";

import * as Modal from "./modal";
import { Button } from "./button";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { INewTripForm } from "@models/index";

interface NewEmailForm {
  email: string;
}

export const ModalInviteGuests: React.FC = () => {
  const { control } = useFormContext<INewTripForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const {
    control: newEmailFormControl,
    handleSubmit,
    resetField,
  } = useForm<NewEmailForm>({
    defaultValues: {
      email: "",
    },
  });

  function handleAddNewEmail(data: NewEmailForm) {
    const { email } = data;
    append({ email });
    resetField("email");
  }

  return (
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
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            }
          >
            Selecionar convidados
          </Modal.Header>

          <div className="flex gap-2 flex-wrap">
            {fields.map((guest, idx) => (
              <div
                key={guest.id}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{guest.email}</span>

                <button
                  className="text-zinc-400 hover:text-zinc-200 transition"
                  type="button"
                  onClick={() => remove(idx)}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <form
            onSubmit={handleSubmit(handleAddNewEmail)}
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
          >
            <div className="px-2 flex items-center flex-1 gap-2">
              <AtSign className="size-5 text-zinc-400" />

              <Controller
                control={newEmailFormControl}
                name="email"
                render={({ field }) => (
                  <input
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 h-full"
                    placeholder="Digite o email do convidado"
                    type="email"
                    name="email"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <Button type="submit" icon={<Plus />}>
              Convidar
            </Button>
          </form>
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
