import { useState } from "react";
import Employees from "../employees";
import Lorem from "../lorem";
import Steps from "../steps";
import { steps as initialSteps } from "../../mocks/steps";

export default function InitialPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState(initialSteps);
  
  const updateStepCompletion = (stepId: number, isCompleted: boolean) => {
    setSteps((prevSteps: any[]) => 
      prevSteps.map((step: any) => 
        step.id === stepId 
          ? { ...step, isCompleted } 
          : step
      )
    );
  };

  return (
    <main className="w-full h-full flex flex-col gap-8 p-8">
      <div className="grid grid-cols-3 gap-6 h-full w-full">
        <div className="bg-white shadow h-full w-full rounded-[1.25rem] col-span-3">
          <Steps activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>
        </div>
        <div className="col-span-3 grid grid-cols-5 gap-8">
          <div className="bg-white shadow h-fit w-full rounded-[1.25rem] col-span-2">
            <Lorem />
          </div>
            <div className="bg-white shadow h-full w-full rounded-[1.25rem] col-span-3">
             <Employees activeStep={activeStep} onStepToggle={updateStepCompletion} steps={steps}/>
           </div>
        </div>
      </div>
      <div className="bg-red-800 h-full w-[25%] self-end rounded-[1.25rem]">
        next step
      </div>
    </main>
  );
}
