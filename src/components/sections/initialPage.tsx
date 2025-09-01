import { useState, useMemo } from "react";
import Employees from "../employees";
import Lorem from "../lorem";
import Steps from "../steps";
import { steps as mockDataSource } from "../../mocks/steps";
import NextPrev from "../nextPrev";
import Soon from "./soon";

interface Step {
  id: number;
  title: string;
  isCompleted: boolean;
  icon: any;
}

export default function InitialPage() {
  const [steps, setSteps] = useState<Step[]>(mockDataSource);
  const [activeStep, setActiveStep] = useState(1);

  const updateStepCompletion = (stepId: number, isCompleted: boolean) => {
    const stepToUpdate = mockDataSource.find((step) => step.id === stepId);
    if (stepToUpdate) {
      stepToUpdate.isCompleted = isCompleted;
    }
    setSteps([...mockDataSource]);
  };

  const currentStepObject = useMemo(() => {
    return mockDataSource.find(step => step.id === activeStep);
  }, [activeStep]);

  const handleNext = () => {
    // if (currentStepObject?.isCompleted && activeStep < mockDataSource.length) {
    //   setActiveStep(activeStep + 1);
    // } else if (!currentStepObject?.isCompleted) {
    //   alert("Por favor, conclua a etapa atual para poder avançar.");
    // }
    if(activeStep === 1 && !currentStepObject?.isCompleted) {
         alert("Por favor, conclua a etapa atual para poder avançar.");
    }
    updateStepCompletion(activeStep, true)
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) {
      updateStepCompletion(activeStep, false)
      setActiveStep(activeStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId === activeStep) return;
    if (stepId < activeStep) {
      setActiveStep(stepId);
      return;
    }
    const previousSteps = mockDataSource.slice(0, stepId - 1);
    const allPreviousStepsCompleted = previousSteps.every(step => step.isCompleted);
    if (allPreviousStepsCompleted) {
      setActiveStep(stepId);
    } else {
      alert("Você precisa concluir as etapas anteriores primeiro.");
    }
  };

  return (

    activeStep === 1 ? (
      <main className="w-full h-full flex flex-col gap-8 p-8">
        <div className="grid grid-cols-3 gap-6 h-fit w-full">
            <div className="bg-white shadow py-4 w-full rounded-[1.25rem] col-span-3">
              <Steps
                activeStep={activeStep}
                setActiveStep={handleStepClick}
                steps={steps}
              />
            </div>
          
              <div className="col-span-3 grid grid-cols-5 gap-8">
                <div className="bg-white shadow h-fit w-full rounded-[1.25rem] col-span-2">
                  <Lorem />
                </div>
                <div className="bg-white shadow h-full w-full rounded-[1.25rem] col-span-3">
                  <Employees
                    activeStep={activeStep}
                    onStepToggle={updateStepCompletion}
                    steps={steps}
                  />
                </div>
              </div>
            

          </div>
          
          <NextPrev
            onBack={handleBack}
            onNext={handleNext}
            isNextDisabled={!currentStepObject?.isCompleted || activeStep === mockDataSource.length}
            isBackDisabled={activeStep === 1}
            isLastStep={activeStep === mockDataSource.length}
          />
      </main>
    ) : (
      <main className="w-full h-screen gap-8 p-8 flex flex-col justify-between">
        <div>
          <div className="bg-white shadow py-4 w-full h-fit rounded-[1.25rem]">
                <Steps
                  activeStep={activeStep}
                  setActiveStep={handleStepClick}
                  steps={steps}
                />
              </div>
          <div>
            <Soon />
          </div>
        </div>

        <div>
          <NextPrev
              onBack={handleBack}
              onNext={handleNext}
              // isNextDisabled={!currentStepObject?.isCompleted || activeStep === mockDataSource.length}
              isNextDisabled={activeStep === mockDataSource.length}
              isBackDisabled={activeStep === 1}
              isLastStep={activeStep === mockDataSource.length}
            />
        </div>
            
      </main>
    )
  )
  }
