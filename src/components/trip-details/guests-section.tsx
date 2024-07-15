import { Button } from "@components/button";
import { CircleCheck, CircleDashed, UserCog } from "lucide-react";

export const GuestsSection: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <h3 className="font-semibold text-xl">Convidados</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Jessica White
            </span>
            <span className="block text-zinc-400 truncate">
              jessica.white44@gmail.com
            </span>
          </div>
          <CircleCheck className="text-lime-300 size-5" />
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Dr. Rita Pacocha
            </span>
            <span className="block text-zinc-400 truncate">
              lacy.stiedemann@gmail.com
            </span>
          </div>
          <CircleDashed className="text-zinc-400 size-5" />
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">
              Wilfred Dickenss III
            </span>
            <span className="block text-zinc-400 truncate">
              marian.hyatt@hotmail.com
            </span>
          </div>
          <CircleCheck className="text-lime-300 size-5" />
        </div>
      </div>

      <Button
        className="justify-center"
        variant="secondary"
        iconPosition="left"
        icon={<UserCog />}
      >
        Cadastrar novo link
      </Button>
    </div>
  );
};
