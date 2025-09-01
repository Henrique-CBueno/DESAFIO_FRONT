import { TiPlus } from "react-icons/ti";
import { Button } from "./ui/button";
import EmployeeCard from "./employeecard";
import type { EmployeeFormStateWithID } from "./employeecard";
import EmployeeForm from "./addEmployee";
import { useState, useMemo } from "react";
import Switch from "./switch";

type EmployeesProps = {
  users: EmployeeFormStateWithID[];
  setUsers: React.Dispatch<React.SetStateAction<EmployeeFormStateWithID[]>>;
  steps: any[];
  activeStep: number;
  onStepToggle: (stepId: number, isCompleted: boolean) => void;
  setOpenPopup: any
};

export default function Employees(props: EmployeesProps) {
  const [onlyActives, setOnlyActives] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormStateWithID | undefined>();

  const { activeUsers, totalUsers, filteredUsers } = useMemo(() => {
    const active = props.users.filter(user => user.isActive);
    const filtered = onlyActives ? active : props.users;
    return {
      activeUsers: active.length,
      totalUsers: props.users.length,
      filteredUsers: filtered,
    };
  }, [props.users, onlyActives]);

  const currentStep = props.steps.find((step) => step.id === props.activeStep);
  const isStepCompleted = currentStep ? currentStep.isCompleted : false;

  function handleAddNew() {
    setSelectedEmployee(undefined);
    setIsFormVisible(true);
  }

  function handleEdit(employee: EmployeeFormStateWithID) {
    setSelectedEmployee(employee);
    setIsFormVisible(true);
  }
  
  function handleBack() {
    setIsFormVisible(false);
    setSelectedEmployee(undefined);
  }

  if (isFormVisible) {
    return (
      <EmployeeForm
        onBack={handleBack}
        users={props.users}
        setUsers={props.setUsers}
        employeeToEdit={selectedEmployee}
      />
    );
  }

  return (
    <div className="h-full">
      <header className="px-6 py-3 rounded-t-[1.25rem] text-white text-[1.75rem] bg-[#649FBF]">
        <h1>Funcionário(s)</h1>
      </header>
      <div className="h-full flex flex-col px-6 py-4 gap-4">
        <div className="grid gap-4">
          <div>
            <Button
              className="p-6 bg-white text-[#649FBF] w-full border-[1px] border-[#649FBF] cursor-pointer hover:bg-white hover:scale-105"
              onClick={handleAddNew}
            >
              <TiPlus color="#649FBF" />
              <span> Adicionar Funcionário</span>
            </Button>
          </div>
          <div className="flex w-full">
            <div className="flex gap-6 flex-1">
              <Button
                className="p-[0.625rem] bg-white flex-1 text-[#649FBF] border-[1px] border-[#649FBF] cursor-pointer hover:bg-white hover:scale-105"
                onClick={() => setOnlyActives(true)}
                disabled={onlyActives}
              >
                <span>Ver apenas ativos</span>
              </Button>
              <Button
                className="p-[0.625rem] bg-white flex-1 text-[#959595] border-[1px] border-[#959595] cursor-pointer hover:bg-white hover:scale-105"
                onClick={() => setOnlyActives(false)}
                disabled={!onlyActives}
              >
                <span>Limpar filtros</span>
              </Button>
            </div>
            <div className="flex items-center justify-end flex-1">
              <span className="text-[.625rem] font-bold text-[#3A3A3A3]">
                Ativos {activeUsers}/{totalUsers}
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <EmployeeCard
              key={user.id}
              employee={user}
              setUsers={props.setUsers}
              onEdit={handleEdit}
              setOpenPopup={props.setOpenPopup}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 justify-end text-[.875rem] text-[#3A3A3A]">
          <label htmlFor="finished" className="select-none cursor-pointer">
            A etapa está concluída?
          </label>
          <Switch
            id="finished"
            isDone={isStepCompleted}
            activeStep={props.activeStep}
            onStepToggle={props.onStepToggle}
            width="w-14"
          />
        </div>
      </div>
    </div>
  );
}