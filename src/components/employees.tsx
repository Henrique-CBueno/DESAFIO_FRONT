import { TiPlus } from "react-icons/ti";
import { Button } from "./ui/button";
import { mockUsers } from "../mocks/users";
import EmployeeCard from "./employeecard";
import { useState, useEffect } from "react";
import Switch from "./switch";

export default function Employees(props: any) {
    let activeUsers: number = 0
    let totalUsers:number = 0
    const [onlyActives, setOnlyActives] = useState(false)
    
    const [isDone, setIsDone] = useState(false);
    
    useEffect(() => {
        if (props.steps && props.activeStep) {
            const currentStep = props.steps.find((step: any) => step.id === props.activeStep);
            setIsDone(currentStep ? currentStep.isCompleted : false);
        }
    }, [props.activeStep, props.steps]);

    mockUsers.forEach((user) => {
        if (user.isActive) {
            activeUsers += 1;
        }
        totalUsers += 1;
    });

    return(
        <div className="h-full">
            <header className="px-6 py-3 rounded-t-[1.25rem] text-white text-[1.75rem] bg-[#649FBF]">
                <h1>Funcionário(s)</h1>
            </header>
            <div className="h-full flex flex-col px-6 py-4 gap-4">
                <div className="grid gap-4">
                    <div>
                        <Button className="p-6 bg-white text-[#649FBF] w-full border-[1px] border-[#649FBF] cursor-pointer hover:bg-white hover:scale-105">
                            <TiPlus color="#649FBF"/>
                            <span> Adicionar Funcionário</span>
                        </Button>
                    </div>
                    <div className="flex w-full">
                        <div className="flex gap-6 flex-1">
                            <Button className="p-[0.625rem] bg-white flex-1 text-[#649FBF] border-[1px] border-[#649FBF] cursor-pointer hover:bg-white hover:scale-105"
                            onClick={() => setOnlyActives(true)}
                            disabled={onlyActives}>
                                <span>Ver apenas ativos</span>
                            </Button>

                            <Button className="p-[0.625rem] bg-white flex-1 text-[#959595] border-[1px] border-[#959595] cursor-pointer hover:bg-white hover:scale-105"
                            onClick={() => setOnlyActives(false)}
                            disabled={!onlyActives}>
                                <span>Limpar filtros</span>
                            </Button>
                        </div>
                        <div className="flex items-center justify-end flex-1">
                            <span className="text-[.625rem] font-bold text-[#3A3A3A3]">Ativos {activeUsers}/{totalUsers}</span>
                        </div>
                    </div>
                </div>
                <div className="grid gap-4">
                    {
                        onlyActives 
                        ?
                        mockUsers.map((user) => {
                            if(user.isActive) {
                                return (
                                    <EmployeeCard key={user.id} id={user.id} cpf={user.cpf} name={user.name} role={user.role} isActive={user.isActive}/>
                                )
                            }
                        })
                        :
                        mockUsers.map((user) => {
                            return (
                                <EmployeeCard key={user.id} id={user.id} cpf={user.cpf} name={user.name} role={user.role} isActive={user.isActive}/>
                            )
                        })
                    }
                </div>
                <div className="flex items-center gap-3 justify-end text-[.875rem] text-[#3A3A3A]">
                    <label htmlFor="finished" className="select-none cursor-pointer">A etapa está concluída?</label>
                    <Switch 
                        id="finished" 
                        setIsDone={setIsDone} 
                        isDone={isDone} 
                        activeStep={props.activeStep}
                        onStepToggle={props.onStepToggle}
                    />
                </div>
            </div>
        </div>
    )
}