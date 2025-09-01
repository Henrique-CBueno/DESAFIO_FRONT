import { HiChevronDown } from "react-icons/hi";
import type { EmployeeFormState } from "./addEmployee";
import { z } from "zod";
import { employeeSchema } from '../schemas/employeeSchemas';

// Helper type for the flattened field errors
type FieldErrors = z.inferFlattenedErrors<typeof employeeSchema>['fieldErrors'];

export default function EmployeePersonalData({
  form,
  update,
  errors,
}: {
  form: EmployeeFormState;
  update: <K extends keyof EmployeeFormState>(
    key: K,
    value: EmployeeFormState[K]
  ) => void;
  // Correctly typed 'errors' prop
  errors: FieldErrors | undefined;
}) {
  return (
    <section className="grid gap-3 rounded-xl border border-[#649FBF] shadow-md p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="grid gap-1">
          <label className="text-sm">Nome</label>
          <input
            className={`border rounded-md py-1.5 px-2 ${errors?.name ? 'border-[#AB2E46]' : 'border-[#649FBF]'}`}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nome"
          />
        </div>

        <div className="grid gap-1">
          <label className="text-sm">Sexo</label>
          <div className="flex items-center gap-4 rounded-md p-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="gender"
                className={`appearance-none h-4 w-4 rounded-full border-2 checked:bg-[#649FBF] ${errors?.gender ? 'border-[#AB2E46]' : 'border-[#649FBF]'}`}
                checked={form.gender === "Feminino"}
                onChange={() => update("gender", "Feminino")}
              />
              Feminino
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="gender"
                className={`appearance-none h-4 w-4 rounded-full border-2 checked:bg-[#649FBF] ${errors?.gender ? 'border-[#AB2E46]' : 'border-[#649FBF]'}`}
                checked={form.gender === "Masculino"}
                onChange={() => update("gender", "Masculino")}
              />
              Masculino
            </label>
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm">CPF</label>
          <input
            className={`border rounded-md py-1.5 px-2 ${errors?.cpf ? 'border-[#AB2E46]' : 'border-[#649FBF]'}`}
            value={form.cpf}
            onChange={(e) => update("cpf", e.target.value)}
            placeholder="000.000.000-00"
          />
        </div>

        <div className="grid gap-1">
          <label className="text-sm">Data de Nascimento</label>
          <input
            type="date"
            className={`border rounded-md p-2 ${errors?.birthDate ? 'border-[#AB2E46]' : 'border-[#649FBF]'}`}
            value={form.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
          />
        </div>

        <div className="grid gap-1">
          <label className="text-sm">RG</label>
          <input
            className={`border rounded-md py-1.5 px-2 ${errors?.rg ? 'border-[#AB2E46]' : 'border-[#649FBF]'}`}
            value={form.rg}
            onChange={(e) => update("rg", e.target.value)}
            placeholder="RG"
          />
        </div>

        <div className="grid gap-1">
          <label className="text-sm">Cargo</label>
          <div className="relative">
            <select
              className={`w-full p-2 pr-8 border rounded-md appearance-none bg-white focus:outline-none focus:ring-2 ${errors?.role ? 'border-[#AB2E46] focus:ring-red-800' : 'border-[#649FBF] focus:ring-[#649FBF]'}`}
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            >
              <option value="" disabled>Selecione</option>
              <option>Operador</option>
              <option>Técnico</option>
              <option>Engenheiro</option>
              <option>Outro</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}