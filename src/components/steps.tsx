import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Steps(props: any) {
  const { activeStep, setActiveStep, steps } = props;
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-full pb-2">
      {isMobile ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-4">
            {steps.map((step: any, index: number) => (
              <div
                key={step.id}
                className="flex-shrink-0 w-32 flex flex-col items-center justify-center gap-2 relative"
              >
                <div className="relative flex items-center justify-center w-full">
                  <button
                    id={`b${step.id}`}
                    disabled={
                      step.id > 1 &&
                      !steps
                        .slice(0, step.id - 1)
                        .every((s: any) => s.isCompleted)
                    }
                    className={`h-12 w-12 cursor-pointer rounded-2xl flex items-center justify-center relative z-10 ${
                      activeStep === step.id
                        ? "bg-[#649FBF] border-2 border-black shadow-black"
                        : step.isCompleted
                        ? "bg-[#649FBF]"
                        : "bg-[#DBDBDB]"
                    } hover:border-2 border-black shadow-2xl hover:bg-[#649FBF] disabled:cursor-not-allowed`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <img
                      src={step.icon}
                      alt=""
                      className="h-[60%] w-[70%] select-none"
                    />
                  </button>

                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 w-full border-t-4 border-dashed border-[#649FBF] -z-0"></div>
                  )}
                </div>

                <label
                  className={`select-none cursor-pointer text-sm  ${
                    activeStep === step.id || step.isCompleted
                      ? "font-bold text-[#649FBF]"
                      : "text-[#959595]"
                  }`}
                  htmlFor={`b${step.id}`}
                >
                  {step.title}
                </label>

                <h1
                  className={`text-sm font-bold text-[#272F33] ${
                    !step.isCompleted ? "invisible" : ""
                  }`}
                >
                  Concluído
                </h1>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full w-full grid grid-cols-9 justify-between pb-2 relative">
          {steps.map((step: any, index: number) => (
            <div
              key={step.id}
              className="h-full w-full flex flex-col items-center justify-center gap-2 relative"
            >
              <div className="relative flex items-center justify-center w-full">
                <button
                  id={`b${step.id}`}
                  disabled={
                    step.id > 1 &&
                    !steps
                      .slice(0, step.id - 1)
                      .every((s: any) => s.isCompleted)
                  }
                  className={`h-12 w-12 cursor-pointer rounded-2xl flex items-center justify-center relative z-10 ${
                    activeStep === step.id
                      ? "bg-[#649FBF] border-2 border-black shadow-black"
                      : step.isCompleted
                      ? "bg-[#649FBF]"
                      : "bg-[#DBDBDB]"
                  } hover:border-2 border-black shadow-2xl hover:bg-[#649FBF] disabled:cursor-not-allowed`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <img
                    src={step.icon}
                    alt=""
                    className="h-[60%] w-[70%] select-none"
                  />
                </button>

                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-1/2 w-full border-t-4 border-dashed border-[#649FBF] -z-0"></div>
                )}
              </div>

              <label
                className={`select-none cursor-pointer text-sm ${
                  activeStep === step.id || step.isCompleted
                      ? "font-bold text-[#649FBF]"
                      : "text-[#959595]"
                }`}
                htmlFor={`b${step.id}`}
              >
                {step.title}
              </label>

              <h1
                className={`text-sm font-bold text-[#272F33] ${
                  !step.isCompleted ? "invisible" : ""
                }`}
              >
                Concluído
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
