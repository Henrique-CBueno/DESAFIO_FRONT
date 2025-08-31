import { Button } from "./ui/button";


interface SwitchProps {
  id: string;
  setIsDone?: any
  isDone?: boolean;
  activeStep?: number;
  onStepToggle?: (stepId: number, isCompleted: boolean) => void;
  yes?: string
  no?: string
  width: string
}

export default function Switch({ id, isDone, activeStep, onStepToggle, yes, no, width }: SwitchProps) {

  const handleToggle = () => {
    const newValue = !isDone;
    if (onStepToggle && typeof activeStep === 'number') {
      onStepToggle(activeStep, newValue);
    }
  };

  return (
    <Button
      id={id}
      type="button"
      onClick={handleToggle}
      className={`relative ${width} h-5 bg-[#DBDBDB] rounded-full transition-all duration-200 cursor-pointer flex items-center justify-between px-2`}
    >
      <div
        className={`absolute h-4 w-4 bg-[#649FBF] rounded-full transition-all duration-200 ${
          isDone ? 'right-1' : 'left-1'
        }`}
      />
      
      <span className={`text-xs font-medium text-gray-600 z-10 ${isDone ? 'text-blue-500' : ''}`}>
        {isDone ? (yes ? yes : 'SIM') : ''}
      </span>
      <span className={`text-xs font-medium text-gray-600 z-10 ${!isDone ? 'text-blue-500' : ''}`}>
      {!isDone ? (no ? no : 'NÃO') : ''}
      </span>
    </Button>
  );
}