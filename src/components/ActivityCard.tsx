import { FiChevronDown } from "react-icons/fi";
import { Button } from "./ui/button";
import EPIRow from "./EPIRow.tsx";
import type { EmployeeFormState } from "./AddEmployee";


type ActivityEPI = {
  activityName: string;
  epis: { epi: string; caNumber: string }[];
};

export default function ActivityCard({
  activity,
  activityIndex,
  updateActivityName,
  updateEPI,
  addEPI,
  removeEPI,
  removeActivity,
  form,
  errors,
}: {
  activity: ActivityEPI;
  activityIndex: number;
  updateActivityName: (activityIndex: number, newName: string) => void;
  updateEPI: (
    activityIndex: number,
    epiIndex: number,
    patch: Partial<{ epi: string; caNumber: string }>
  ) => void;
  addEPI: (activityIndex: number) => void;
  removeEPI: (activityIndex: number, epiIndex: number) => void;
  removeActivity: (activityIndex: number) => void;
  form: EmployeeFormState;
  errors: any;
}) {
  const field =
    "w-full rounded-md border border-[#649FBF] bg-white py-1.5 px-2 text-sm " +
    "outline-none focus:ring-2 focus:ring-[#649FBF]/40 placeholder:text-gray-400";

  return (
    <div className="grid gap-3 border rounded-md p-4 border-[#649FBF] shadow-md">
      <div className="grid gap-1">
        <label className="text-sm">Selecione a atividade</label>
        <div className="relative">
          <select
            className={`${field} appearance-none pr-10 ${errors?.fieldErrors?.activityName ? 'border-[#AB2E46] focus:ring-2 focus:ring-red-800/40' : 'border-[#649FBF] focus:ring-2 focus:ring-[#649FBF]/40'}`}
            value={activity.activityName}
            onChange={(e) => updateActivityName(activityIndex, e.target.value)}
          >
            <option value="" disabled>Selecione</option>
            <option>Trabalho em Altura</option>
            <option>Manutenção Elétrica</option>
            <option>Operação de Máquinas</option>
            <option>Construção Civil</option>
          </select>
          <FiChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3A3A3A]"
            size={18}
          />
          
        </div>
      </div>

      {activity.epis.map((epi, epiIndex) => (
        <EPIRow
          key={epiIndex}
          epi={epi}
          epiIndex={epiIndex}
          activityIndex={activityIndex}
          updateEPI={updateEPI}
          addEPI={addEPI}
          removeEPI={removeEPI}
          isLastItem={epiIndex === activity.epis.length - 1}
          errors={errors?.fieldErrors?.epis?.[epiIndex] as any}
        />
      ))}

      {form.activities.length > 1 && (
        <Button
          type="button"
          className="mt-3 w-full rounded-md border border-[#649FBF] bg-white py-2 text-sm"
          onClick={() => removeActivity(activityIndex)}
        >
          <span className="text-[#649FBF]">Remover atividade</span>
        </Button>
      )}
    </div>
  );
}