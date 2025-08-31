import { useState } from "react";
import { mockUsers } from "../mocks/users";
import { Button } from "./ui/button";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeStatus from "./EmployeeStatus";
import EmployeePersonalData from "./EmployeePersonalData";
import EmployeeEPISection from "./EmployeeEPISection";
import EmployeeHealthDoc from "./EmployeeHealthDoc";

type ActivityEPI = {
  activityName: string;
  epis: { epi: string; caNumber: string }[];
};

type HealthDoc = {
  file?: File | null;
  fileName?: string;
};

export type EmployeeFormState = {
  isActive: boolean;
  name: string;
  gender: "Feminino" | "Masculino" | "";
  cpf: string;
  birthDate: string;
  rg: string;
  role: string;
  usesEPI: boolean;
  activities: ActivityEPI[];
  healthDoc: HealthDoc;
};

export default function AddEmployee(props: { onBack?: () => void }) {
  const [form, setForm] = useState<EmployeeFormState>({
    isActive: true,
    name: "",
    gender: "",
    cpf: "",
    birthDate: "",
    rg: "",
    role: "",
    usesEPI: true,
    activities: [
      { activityName: "Atividade 1", epis: [{ epi: "", caNumber: "" }] },
    ],
    healthDoc: { file: null, fileName: "" },
  });

  function update<K extends keyof EmployeeFormState>(
    key: K,
    value: EmployeeFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newEmployee = {
      id:
        mockUsers.length > 0 ? mockUsers[mockUsers.length - 1].id + 1 : 1,
      ...form,
      activities: form.usesEPI ? form.activities : [],
      allEpis: form.usesEPI
        ? form.activities.flatMap((activity) => activity.epis)
        : [],
      healthDoc: form.healthDoc ?? { file: null, fileName: "" },
    };

    mockUsers.push(newEmployee);
    console.log("Novo employee adicionado:", newEmployee);

    if (props.onBack) props.onBack();
  }

  return (
    <div className="h-full">
      <EmployeeHeader onBack={props.onBack} />

      <form
        onSubmit={handleSubmit}
        className="px-6 py-4 grid gap-4 text-[#272F33]"
      >
        <EmployeeStatus value={form.isActive} onChange={(v) => update("isActive", v)} />

        <EmployeePersonalData form={form} update={update} />

        <EmployeeEPISection form={form} setForm={setForm} update={update} />

        {form.usesEPI && (
          <EmployeeHealthDoc form={form} update={update} />
        )}

        <Button
          type="submit"
          className="rounded-xl border border-[#649FBF] py-2 bg-white text-[#649FBF] cursor-pointer mt-3"
        >
          Salvar
        </Button>
      </form>
    </div>
  );
}
