import Switch2 from "./switch2";

export default function EmployeeStatus({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <section className="grid gap-3 rounded-xl border border-[#649FBF] p-4 bg-white">
      <div className="flex items-center justify-between text-base text-center text-[#272F33]">
        <label>O trabalhador está ativo ou inativo? </label>
        <Switch2
          id="isNewUserActive"
          value={value}
          onChange={onChange}
          labelOn={"ATIVO"}
          labelOff={"INATIVO"}
          width="w-19"
        />
      </div>
    </section>
  );
}
