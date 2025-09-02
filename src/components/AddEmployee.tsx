import { useState } from "react";
import { Button } from "./ui/button";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeStatus from "./EmployeeStatus";
import EmployeePersonalData from "./EmployeePersonalData";
import EmployeeEPISection from "./EmployeeEPISection";
import EmployeeHealthDoc from "./EmployeeHealthDoc";
import type { EmployeeFormStateWithID } from "./employeecard";
import { employeeSchema, activitySchema, epiSchema } from '../schemas/employeeSchemas';
import { z } from "zod";

type FlattenedErrors = z.inferFlattenedErrors<typeof employeeSchema>;

type ActivityEPI = {
  activityName: string;
  epis: { epi: string; caNumber: string }[];
};

type HealthDoc = {
  file?: File | null;
  fileName?: string;
};

export type EmployeeFormState = {
  id?: number;
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


const defaultFormState: EmployeeFormState = {
  isActive: true,
  name: "",
  gender: "",
  cpf: "",
  birthDate: "",
  rg: "",
  role: "",
  usesEPI: true,
  activities: [
    { activityName: "", epis: [{ epi: "", caNumber: "" }] },
  ],
  healthDoc: { file: null, fileName: "" },
};



export default function AddEmployee(
  props: {
    onBack?: () => void;
    users: EmployeeFormStateWithID[];
    setUsers: React.Dispatch<React.SetStateAction<EmployeeFormStateWithID[]>>;
    employeeToEdit?: EmployeeFormStateWithID;
  }) {

  const [form, setForm] = useState<EmployeeFormState>(
    props.employeeToEdit || defaultFormState
  );
  
  const [errors, setErrors] = useState<FlattenedErrors | undefined>(undefined);

  
  function update<K extends keyof EmployeeFormState>(
    key: K,
    value: EmployeeFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleUsesEPIChange(usesEPI: boolean) {
    setForm((prev) => {
      if (!usesEPI) {
        return {
          ...prev,
          usesEPI: false,
          activities: [], 
        };
      }
      return {
        ...prev,
        usesEPI: true,
        activities: prev.activities.length > 0 ? prev.activities : [{ activityName: "", epis: [{ epi: "", caNumber: "" }] }],
      };
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationResult = employeeSchema.safeParse(form);

    if (!validationResult.success) {

      const flattenedErrors = validationResult.error?.flatten();
      console.log(flattenedErrors)
      
      const processedErrors = { ...flattenedErrors };
      if (form.usesEPI && form.activities.length > 0) {
        const activityErrors = form.activities.map((activity) => {
          const activityValidation = activitySchema.safeParse(activity);
          if (!activityValidation.success) {
            const activityFlattened = activityValidation.error.flatten();
            
            if (activity.epis.length > 0) {
              const epiErrors = activity.epis.map((epi) => {
                const epiValidation = epiSchema.safeParse(epi);
                if (!epiValidation.success) {
                  return epiValidation.error.flatten();
                }
                return null;
              });
                             activityFlattened.fieldErrors = {
                 ...activityFlattened.fieldErrors,
                 epis: epiErrors as any
               };
            }
            
            return activityFlattened;
          }
          return null;
        });
        processedErrors.fieldErrors = {
          ...processedErrors.fieldErrors,
          activities: activityErrors as any
        };
      }
      
             setErrors(processedErrors);


      return;
    }
    
    setErrors(undefined);
    
  
    if (form.id) {
      const updatedEmployee = {
        ...form,
        activities: form.usesEPI ? form.activities : [],
        allEpis: form.usesEPI
          ? form.activities.flatMap((activity) => activity.epis)
          : [],
        healthDoc: form.healthDoc ?? { file: null, fileName: "" },
      };
  
      props.setUsers((currentUsers: any) =>
        currentUsers.map((user: any) =>
          user.id === form.id ? updatedEmployee : user
        )
      );
    } else {
      const newEmployee = {
  
        id:
          props.users.length > 0
            ? Math.max(...props.users.map((u) => u.id)) + 1
            : 1,
        ...form,
        activities: form.usesEPI ? form.activities : [],
        allEpis: form.usesEPI
          ? form.activities.flatMap((activity) => activity.epis)
          : [],
        healthDoc: form.healthDoc ?? { file: null, fileName: "" },
      };
  
      props.setUsers((currentUsers) => [...currentUsers, newEmployee]);
    }
  
    if (props.onBack) props.onBack();
  }

  return (
    <div className="h-full" id="addEmployye">
      <EmployeeHeader onBack={props.onBack} />

      <form
        onSubmit={handleSubmit}
        className="px-6 py-4 grid gap-4 text-[#272F33] "
      >
        <EmployeeStatus value={form.isActive} onChange={(v) => update("isActive", v)} />

        <EmployeePersonalData form={form} update={update} errors={errors?.fieldErrors} />

        <EmployeeEPISection form={form} setForm={setForm} errors={errors?.fieldErrors as any} onUsesEPIChange={handleUsesEPIChange} />

        {form.usesEPI && (
          <EmployeeHealthDoc form={form} update={update} />
        )}

        <Button
          type="submit"
          className="ubuntu rounded-xl border border-[#649FBF] py-2 bg-white text-[#649FBF] cursor-pointer mt-3"
        >
          Salvar
        </Button>
      </form>
    </div>
  );
}