import stepsImg from "../assets/steps.svg";
import { useState } from "react";

export default function Steps() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    {
      id: 1,
      title: "Step 1",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 2,
      title: "Step 2",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 3,
      title: "Step 3",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 4,
      title: "Step 4",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 5,
      title: "Step 5",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 6,
      title: "Step 6",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 7,
      title: "Step 7",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 8,
      title: "Step 8",
      isCompleted: false,
      icon: stepsImg,
    },
    {
      id: 9,
      title: "Step 9",
      isCompleted: false,
      icon: stepsImg,
    },
  ];

  return (
    <div className="h-full w-full grid grid-cols-9 justify-between py-2 relative">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="h-full w-full flex flex-col items-center justify-center gap-2 relative"
        >
          <div className="relative flex items-center justify-center w-full">
            <button
              id={`b${step.id}`}
              className={`h-12 w-12 cursor-pointer rounded-2xl flex items-center justify-center relative z-10 ${
                activeStep === step.id || step.isCompleted
                  ? "bg-[#649FBF] border-2 border-black shadow-black"
                  : "bg-[#DBDBDB]"
              } hover:border-2 border-black shadow-2xl hover:bg-[#649FBF]`}
              onClick={() => setActiveStep(step.id)}
            >
              <img
                src={step.icon}
                alt=""
                className="h-[60%] w-[70%] select-none"
              />
            </button>

            {/* linha conectando (só renderiza se não for o último) */}
            {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-1/2 w-full border-t-4 border-dashed border-[#649FBF] -z-0"></div>
            )}
          </div>

          <label
            className={`select-none cursor-pointer text-[#959595] ${
              activeStep === step.id || step.isCompleted
                ? "font-bold text-[#649FBF]"
                : ""
            }`}
            htmlFor={`b${step.id}`}
          >
            {step.title}
          </label>
        </div>
      ))}
    </div>
  );
}
