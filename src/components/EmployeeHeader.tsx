export default function EmployeeHeader({ onBack }: { onBack?: () => void }) {
    return (
      <header className="px-6 py-3 rounded-t-[1.25rem] text-white text-[1.25rem] bg-[#649FBF] flex items-center gap-3">
        <button onClick={onBack} className="text-white">←</button>
        <h1>Adicionar Funcionário</h1>
      </header>
    );
  }
  