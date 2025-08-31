
import { Button } from './ui/button';

interface Switch2Props {
  id?: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  labelOn?: string;
  labelOff?: string;
  width: string;
}

export default function Switch2({
  id,
  value,
  onChange,
  labelOn = "SIM",   
  labelOff = "NÃO",
  width
}: Switch2Props) {

  const handleToggle = () => {
    if (onChange) {
      onChange(!value);
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
          value ? 'right-1' : 'left-1'
        }`}
      />
      
      <span className={`text-xs font-medium text-gray-600 z-10 ${value ? 'text-blue-500' : ''}`}>
        {value ? labelOn : ''}
      </span>
      
      <span className={`text-xs font-medium text-gray-600 z-10 ${!value ? 'text-blue-500' : ''}`}>
        {!value ? labelOff : ''}
      </span>
    </Button>
  );
}