import { Button } from "./ui/button";

interface NextPrevProps {
  onBack: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
  isBackDisabled: boolean;
  isLastStep: boolean;
}

export default function NextPrev({ 
  onBack, 
  onNext, 
  isNextDisabled, 
  isBackDisabled, 
  isLastStep
}: NextPrevProps) {
  


  return (
    <div className={`w-full flex ${isBackDisabled ? 'justify-end' : 'justify-between'}`}>

      <Button 
        onClick={onBack}
        disabled={isBackDisabled}
        className={`bg-[#649FBF] h-fit w-fit px-12 py-2 text-sm rounded-xl text-white cursor-pointer font-bold disabled:bg-[#959595] ${isBackDisabled ? 'hidden' : ''}`}
      >
        Anterior
      </Button>
      
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`bg-[#649FBF] h-fit w-fit px-12 py-2 text-sm rounded-xl text-white cursor-pointer font-bold disabled:bg-[#959595]`}
      >
        {isLastStep ? 'Finalizar' : 'Próximo'}
      </Button>
    </div>
  );
}
