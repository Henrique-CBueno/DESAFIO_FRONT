import type { EmployeeFormState } from "./AddEmployee";

export default function EmployeeHealthDoc({
  form,
  update,
}: {
  form: EmployeeFormState;
  update: <K extends keyof EmployeeFormState>(
    key: K,
    value: EmployeeFormState[K]
  ) => void;
}) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    update("healthDoc", { file: file ?? null, fileName: file ? file.name : "" });
  }

  return (
    <section className="grid gap-6 rounded-xl border border-[#649FBF] shadow-md p-4 bg-white">
      <label className="text-base font-bold">Adicione Atestado de Saúde (opcional)</label>

      <label htmlFor="healthFile" className="grid gap-6">
        <label className="rounded-md border border-[#649FBF] px-3 py-1.5">
          <h1 className="text-[#272F33]">
            {!form.healthDoc.fileName
              ? "Nenhum Arquivo Selecionado!"
              : `${form.healthDoc.fileName}`}
          </h1>
        </label>

        <div className="rounded-md border border-[#649FBF] py-2 cursor-pointer flex items-center justify-center transition-all hover:scale-105">
          <input
            id="healthFile"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <h2 className="ubuntu text-[#649FBF] text-sm">Selecionar arquivo</h2>
        </div>
      </label>
    </section>
  );
}
