import { useMemo } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import "react-day-picker/style.css";
import * as Modal from "./modal";

interface IProps {
  disabled?: boolean;
  triggerText: string;
  rangeDate: DateRange | undefined;
  onSelectRange(range: DateRange | undefined): void;
}

export const DatePicker: React.FC<IProps> = (props) => {
  const { disabled = false, rangeDate, onSelectRange, triggerText } = props;

  const formattedDate = useMemo(() => {
    if (!rangeDate?.from || !rangeDate?.to) return null;

    const from = format(rangeDate.from, "d 'de' LLL", { locale: ptBR });
    const to = format(rangeDate.to, "'até' d 'de' LLL", { locale: ptBR });

    return `${from} ${to}`;
  }, [rangeDate]);

  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <button
          disabled={disabled}
          type="button"
          className={`flex items-center gap-2 text-left w-[240px]  hover:text-zinc-300 disabled:hover:text-zinc-400 transition ${
            formattedDate ? ` text-zinc-300` : `text-zinc-400`
          }`}
        >
          <Calendar className="size-5" />

          <span className="text-base w-40 flex-1">
            {formattedDate || triggerText}
          </span>
        </button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Content>
          <Modal.Header>Selecione a data</Modal.Header>

          <DayPicker
            mode="range"
            selected={rangeDate}
            onSelect={onSelectRange}
            classNames={{
              range_middle: "bg-lime-300 border-transparent text-zinc-800",
              selected: "bg-lime-300 text-zinc-800",
              range_start: "bg-lime-300 rounded-l-full text-zinc-800",
              range_end: "bg-lime-300 rounded-r-full text-zinc-800",
              today: "text-lime-300",
              chevron: "fill-lime-300 hover:fill-lime-600 transition",
            }}
          />
        </Modal.Content>
      </Modal.Portal>
      <Modal.Overlay />
    </Modal.Root>
  );
};
