import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import type { EmployeeFormState } from "./AddEmployee";
import { Button } from "./ui/button";
import ActivityCard from "./ActivityCard.tsx";
import { z } from "zod";
import { employeeSchema } from '../schemas/employeeSchemas';

type FieldErrors = z.inferFlattenedErrors<typeof employeeSchema>['fieldErrors'];

export default function EmployeeEPISection({
  form,
  setForm,
  update,
  errors,
}: {
  form: EmployeeFormState;
  setForm: React.Dispatch<React.SetStateAction<EmployeeFormState>>;
  update: <K extends keyof EmployeeFormState>(
    key: K,
    value: EmployeeFormState[K]
  ) => void;
  errors: FieldErrors | undefined;
}) {
  const [checked, setChecked] = useState(false);



  function addActivity() {
    setForm((prev) => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          activityName: "",
          epis: [{ epi: "", caNumber: "" }],
        },
      ],
    }));
  }

  function removeActivity(index: number) {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  }

  function updateActivityName(activityIndex: number, newName: string) {
    setForm((prev) => {
      const copy = [...prev.activities];
      copy[activityIndex] = { ...copy[activityIndex], activityName: newName };
      return { ...prev, activities: copy };
    });
  }

  function updateEPI(
    activityIndex: number,
    epiIndex: number,
    patch: Partial<{ epi: string; caNumber: string }>
  ) {
    setForm((prev) => {
      const copy = [...prev.activities];
      const episCopy = [...copy[activityIndex].epis];
      episCopy[epiIndex] = { ...episCopy[epiIndex], ...patch };
      copy[activityIndex] = { ...copy[activityIndex], epis: episCopy };
      return { ...prev, activities: copy };
    });
  }

  function addEPI(activityIndex: number) {
    setForm((prev) => {
      const copy = [...prev.activities];
      copy[activityIndex] = {
        ...copy[activityIndex],
        epis: [...copy[activityIndex].epis, { epi: "", caNumber: "" }],
      };
      return { ...prev, activities: copy };
    });
  }

  function removeEPI(activityIndex: number, epiIndex: number) {
    setForm((prev) => {
      const copy = [...prev.activities];
      copy[activityIndex] = {
        ...copy[activityIndex],
        epis: copy[activityIndex].epis.filter((_, i) => i !== epiIndex),
      };
      return { ...prev, activities: copy };
    });
  }

  return (
    <section className="grid gap-3 rounded-xl border border-[#649FBF] p-4 bg-white">
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold">
          Quais EPIs o trabalhador usa na atividade?
        </label>
        <label className="flex items-center gap-2 text-base cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!form.usesEPI}
            onChange={() => update("usesEPI", !form.usesEPI)}
            className="hidden peer"
            onClick={() => setChecked(!checked)}
          />
          {checked ? (
            <span className="w-5 h-5 flex items-center justify-center border-2 border-[#649FBF] rounded-[2px]">
              <FiCheck className="text-[#649FBF] text-sm" />
            </span>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center border-2 border-[#649FBF] rounded-[2px]" />
          )}
          <span>O trabalhador não usa EPI.</span>
        </label>
      </div>
      {!checked && (
        <div className="grid gap-4">
          {form.activities.map((activity, activityIndex) => (
            <ActivityCard
              key={activityIndex}
              activity={activity}
              activityIndex={activityIndex}
              updateActivityName={updateActivityName}
              updateEPI={updateEPI}
              addEPI={addEPI}
              removeEPI={removeEPI}
              removeActivity={removeActivity}
              form={form}
              errors={errors?.activities?.[activityIndex] as any}
            />
          ))}
          <Button
            type="button"
            className="rounded-md border border-[#649FBF] bg-white py-2 text-sm 
                        focus:ring-2 focus:ring-[#649FBF]/40 mt-3 cursor-pointer"
            onClick={addActivity}
          >
            <span className="text-[#649FBF]">Adicionar outra atividade</span>
          </Button>
        </div>
      )}
    </section>
  );
}