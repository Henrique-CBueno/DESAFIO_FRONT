export default function Steps(props: any) {
  const { activeStep, setActiveStep, steps } = props;

  return (
    <div className="h-full w-full grid grid-cols-9 justify-between py-2 relative">
      {steps.map((step: any, index: number) => (
        <div
          key={step.id}
          className="h-full w-full flex flex-col items-center justify-center gap-2 relative"
        >
          <div className="relative flex items-center justify-center w-full">
            <button
              id={`b${step.id}`}
              disabled={step.id > 1 && !steps.slice(0, step.id - 1).every((s: any) => s.isCompleted)}
              className={`h-12 w-12 cursor-pointer rounded-2xl flex items-center justify-center relative z-10 ${
                activeStep === step.id
                  ? "bg-[#649FBF] border-2 border-black shadow-black"
                  : step.isCompleted
                  ? "bg-[#649FBF]"
                  : "bg-[#DBDBDB]"
              } 
                 hover:border-2 border-black shadow-2xl hover:bg-[#649FBF] disabled:cursor-not-allowed`}
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
