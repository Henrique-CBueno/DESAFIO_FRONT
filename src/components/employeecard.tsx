import { FaEllipsisH } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import type { EmployeeFormState } from "./AddEmployee";

export type EmployeeFormStateWithID = EmployeeFormState & { id: number };

type EmployeeCardProps = {
  employee: EmployeeFormStateWithID;
  setUsers: React.Dispatch<React.SetStateAction<EmployeeFormStateWithID[]>>;
  onEdit: (employee: EmployeeFormStateWithID) => void;
  setOpenPopup: any
};

export default function EmployeeCard(props: EmployeeCardProps) {
  const [isOpened, setIsOpened] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(popupRef, () => setIsOpened(false));

  const { employee, setUsers, onEdit } = props;

  function togglePopUp() {
    setIsOpened(!isOpened);
  }

  const handleDeleteEmployee = (employeeId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== employeeId)
      );
      props.setOpenPopup(true)
    }
  };

  const handleEditEmployee = () => {
    onEdit(employee);
    setIsOpened(false);
  };

  return (
    <div
      className={`w-full flex relative justify-between items-center rounded-[.625rem] ${
        employee.isActive ? "bg-[#649fbf33]" : "bg-[#F2F2F2]"
      } `}
    >
      <div className="w-full p-4 grid gap-2">
        <h2 className="text-2xl text-[#707070]">{employee.name}</h2>
        <div className="flex gap-1.5 lg:gap-4">
          <Badge className="bg-[#649FBF] rounded-4xl lg:px-3 py-0.5">
            {employee.cpf}
          </Badge>
          <Badge className="bg-[#649FBF] rounded-4xl lg:px-3 py-0.5">
            {employee.isActive ? "Ativo" : "Inativo"}
          </Badge>
          <Badge className="bg-[#649FBF] rounded-4xl lg:px-3 py-0.5">
            {employee.role}
          </Badge>
        </div>
      </div>
      <Button
        className="cursor-pointer bg-[#649FBF] rounded-r-[.625rem] w-12 lg:w-fit h-full"
        onClick={togglePopUp}
      >
        <FaEllipsisH color="white" className="w-4 h-4 mx-4" />
      </Button>

      {isOpened && (
        <div
          ref={popupRef}
          className="grid grid-rows-2 h-[95%] shadow-xl absolute right-0 top-0 bg-white rounded-[10px] text-[#959595] z-20"
        >
          <button
            className="cursor-pointer flex items-center justify-center px-10 border-b border-[#DBDBDB] hover:text-[#649FBF]"
            onClick={handleEditEmployee}
          >
            Alterar
          </button>
          <button
            className="cursor-pointer flex items-center justify-center px-10 hover:text-[#649FBF]"
            onClick={() => handleDeleteEmployee(employee.id)}
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}