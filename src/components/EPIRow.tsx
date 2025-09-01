import { FiChevronDown } from "react-icons/fi";
import { Button } from "./ui/button";

export default function EPIRow({
  epi,
  epiIndex,
  activityIndex,
  updateEPI,
  addEPI,
  removeEPI,
  isLastItem,
  errors,
}: {
  epi: { epi: string; caNumber: string };
  epiIndex: number;
  activityIndex: number;
  updateEPI: (
    activityIndex: number,
    epiIndex: number,
    patch: Partial<{ epi: string; caNumber: string }>
  ) => void;
  addEPI: (activityIndex: number) => void;
  removeEPI: (activityIndex: number, epiIndex: number) => void;
  isLastItem: boolean;
  errors: any;
}) {
  const field =
    "w-full rounded-md border bg-white py-1.5 px-2 text-sm " +
    "outline-none focus:ring-2 placeholder:text-gray-400";

  const handleCANumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const numbersOnly = value.replace(/[^0-9]/g, '');
    updateEPI(activityIndex, epiIndex, { caNumber: numbersOnly });
  };

  const buttonClasses =
    "w-full h-fit rounded-md border border-[#649FBF] bg-white py-1.5 text-sm cursor-pointer hover:scale-105";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="grid gap-1">
        <label className="text-sm">Selecione o EPI</label>
        <div className="relative">
          <select
                         className={`${field} appearance-none pr-10 ${
               errors?.fieldErrors?.epi
                 ? "border-[#AB2E46] focus:ring-red-800/40"
                 : "border-[#649FBF] focus:ring-[#649FBF]/40"
             }`}
            value={epi.epi}
            onChange={(e) =>
              updateEPI(activityIndex, epiIndex, { epi: e.target.value })
            }
          >
            <option value="">Selecione</option>
            <option>Capacete</option>
            <option>Luvas</option>
            <option>Óculos de proteção</option>
            <option>Calçado de segurança</option>
          </select>
          <FiChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3A3A3A]"
            size={18}
          />
          
        </div>
      </div>

      <div className="grid gap-1">
        <label className="text-sm">Informe o número do CA</label>
        <input
                     className={`${field} ${
             errors?.fieldErrors?.caNumber
               ? "border-[#AB2E46] focus:ring-red-800/40"
               : "border-[#649FBF] focus:ring-[#649FBF]/40"
           }`}
          value={epi.caNumber}
                     onChange={handleCANumberChange}
          placeholder="00000"
          type="number"
        />
        
      </div>

      <div className="grid grid-cols-3 self-end">
        <Button
          type="button"
          onClick={() => addEPI(activityIndex)}
          className={`${buttonClasses} ${!isLastItem ? "hidden" : "col-span-2"}`}
        >
          <span className="text-[#649FBF]">Adicionar EPI</span>
        </Button>

        <Button
          type="button"
          onClick={() => removeEPI(activityIndex, epiIndex)}
          className={`${buttonClasses} ${isLastItem ? "hidden" : "col-span-2"}`}
        >
          <span className="text-[#649FBF]">Excluir EPI</span>
        </Button>
      </div>
    </div>
  );
}