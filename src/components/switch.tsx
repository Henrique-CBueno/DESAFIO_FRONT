

interface SwitchProps {
  id: string;
  setIsDone: (value: boolean) => void;
  isDone?: boolean;
  activeStep: number;
  onStepToggle?: (stepId: number, isCompleted: boolean) => void;
}

export default function Switch({ id, setIsDone, isDone, activeStep, onStepToggle }: SwitchProps) {

  const handleToggle = () => {
    const newValue = !isDone;
    setIsDone(newValue);
    
    if (onStepToggle) {
      onStepToggle(activeStep, newValue);
    }
  };

  return (
    <button
      id={id}
      onClick={handleToggle}
      className={`relative w-14 h-5 bg-[#DBDBDB] rounded-full transition-all duration-200 cursor-pointer flex items-center justify-between px-2`}
    >
      <div
        className={`absolute h-4 w-4 bg-[#649FBF] rounded-full transition-all duration-200 ${
          isDone ? 'right-1' : 'left-1'
        }`}
      />
      
      <span className={`text-xs font-medium text-gray-600 z-10 ${isDone ? 'text-blue-500' : ''}`}>
        {isDone ? 'SIM' : ''}
      </span>
      <span className={`text-xs font-medium text-gray-600 z-10 ${!isDone ? 'text-blue-500' : ''}`}>
        {!isDone ? 'NÃO' : ''}
      </span>
    </button>
  );
}