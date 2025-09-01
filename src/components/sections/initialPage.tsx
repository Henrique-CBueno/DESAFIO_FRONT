import { useMemo } from "react";
import Employees from "../employees";
import Lorem from "../lorem";
import Steps from "../steps";
import NextPrev from "../nextPrev";
import Soon from "./soon";

export interface Step {
  id: number;
  title: string;
  isCompleted: boolean;
  icon: any;
}

export default function InitialPage(props: any) {
  

  const updateStepCompletion = (stepId: number, isCompleted: boolean) => {
    const stepToUpdate = props.steps.find((step: Step) => step.id === stepId);
    if (stepToUpdate) {
      stepToUpdate.isCompleted = isCompleted;
    }
    props.setSteps([...props.steps]);
  };

  const currentStepObject = useMemo(() => {
    return props.steps.find((step: Step) => step.id === props.activeStep);
  }, [props.activeStep]);

  const handleNext = () => {
    // if (currentStepObject?.isCompleted && activeStep < mockDataSource.length) {
    //   setActiveStep(activeStep + 1);
    // } else if (!currentStepObject?.isCompleted) {
    //   alert("Por favor, conclua a etapa atual para poder avançar.");
    // }
    if(props.activeStep === 1 && !currentStepObject?.isCompleted) {
         alert("Por favor, conclua a etapa atual para poder avançar.");
    }
    updateStepCompletion(props.activeStep, true)
    props.setActiveStep(props.activeStep + 1);
  };

  const handleBack = () => {
    if (props.activeStep > 1) {
      updateStepCompletion(props.activeStep, false)
      props.setActiveStep(props.activeStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId === props.activeStep) return;
    if (stepId < props.activeStep) {
      props.setActiveStep(stepId);
      return;
    }
    const previousSteps = props.steps.slice(0, stepId - 1);
    const allPreviousStepsCompleted = previousSteps.every((step: Step) => step.isCompleted);
    if (allPreviousStepsCompleted) {
      props.setActiveStep(stepId);
    } else {
      alert("Você precisa concluir as etapas anteriores primeiro.");
    }
  };

  return (

    props.activeStep === 1 ? (
      <main className="w-full h-full flex flex-col p-4 gap-4 lg:gap-8 lg:p-8">
        <div className="grid grid-cols-3 gap-6 h-fit w-full">

            <div className="bg-white shadow py-4 w-full rounded-[1.25rem] col-span-3">
              <Steps
                activeStep={props.activeStep}
                setActiveStep={handleStepClick}
                steps={props.steps}
              />
            </div>
          
              <div className="col-span-3 flex flex-col gap-6 lg:grid lg:grid-cols-5 ">
                <div className="bg-white shadow h-fit w-full rounded-[1.25rem] lg:col-span-2">
                  <Lorem />
                </div>
                <div className="bg-white shadow h-full w-full rounded-[1.25rem] lg:col-span-3">
                  <Employees
                    activeStep={props.activeStep}
                    onStepToggle={updateStepCompletion}
                    steps={props.steps}
                    users={props.users}
                    setUsers={props.setUsers}
                    setOpenPopup={props.setOpenPopup}
                  />
                </div>
              </div>
            

          </div>
          
          <NextPrev
            onBack={handleBack}
            onNext={handleNext}
            isNextDisabled={!currentStepObject?.isCompleted || props.activeStep === props.steps.length}
            isBackDisabled={props.activeStep === 1}
            isLastStep={props.activeStep === props.steps.length}
          />
      </main>
    ) : (
      <main className="w-full h-full p-4 gap-4 lg:gap-8 lg:p-8 flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-6 h-fit w-full">
          <div className="bg-white shadow py-4 w-full rounded-[1.25rem] col-span-3">
                <Steps
                  activeStep={props.activeStep}
                  setActiveStep={handleStepClick}
                  steps={props.steps}
                />
              </div>
          <div className="col-span-3">
            <Soon />
          </div>
        </div>

        <div>
          <NextPrev
              onBack={handleBack}
              onNext={handleNext}
              // isNextDisabled={!currentStepObject?.isCompleted || activeStep === mockDataSource.length}
              isNextDisabled={props.activeStep === props.steps.length}
              isBackDisabled={props.activeStep === 1}
              isLastStep={props.activeStep === props.steps.length}
            />
        </div>
            
      </main>
    )
  )
  }
