import {
  Controller,
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  useFormContext,
} from "react-hook-form";
import { UserRoundPlus, X, AtSign, Plus, OctagonX } from "lucide-react";
import { isEmpty } from "lodash";

import { INewTripForm } from "@models/index";
import { validateDuplicity, validateEmail } from "@utils/validateEmail";

import * as Modal from "../modal";
import { Button } from "../button";

interface NewEmailForm {
  email: string;
}

interface IInviteParticipants {
  append: UseFieldArrayAppend<INewTripForm>;
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<INewTripForm>[];
}

const InviteParticipantsContent: React.FC<IInviteParticipants> = (props) => {
  const { append, remove, fields } = props;

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
    <>
      <div className="flex gap-2 flex-wrap">
        {fields.map((participant, idx) => (
          <div
            key={participant.id}
            className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
          >
            <span className="text-zinc-300">{participant.email}</span>

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
        <Controller
          control={newEmailFormControl}
          name="email"
          rules={{
            required: "Campo obrigatório",
            validate: {
              isEmail: (email) => validateEmail(email) || "E-mail inválido",
              isDuplicated: (email) =>
                !validateDuplicity(
                  email,
                  fields.map((item) => item.email)
                ) || "E-mail já adicionado",
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

              <Button type="submit" disabled={invalid} icon={<Plus />}>
                Convidar
              </Button>
            </>
          )}
        />
      </form>
    </>
  );
};

export const ModalInviteParticipants: React.FC = () => {
  const { control } = useFormContext<INewTripForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  return (
    <Modal.Root>
      <Modal.Trigger className="flex items-center gap-2 flex-1 text-left">
        <UserRoundPlus className="size-5 text-zinc-400" />

        {isEmpty(fields) ? (
          <span className="text-zinc-400 text-lg flex-1">
            Quem estará na viagem?
          </span>
        ) : (
          <span className="text-zinc-100 text-lg flex-1">
            {fields.length} pessoa(s) convidada(s)
          </span>
        )}
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
            Selecionar convidados
          </Modal.Header>

          <InviteParticipantsContent
            append={append}
            fields={fields}
            remove={remove}
          />
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
