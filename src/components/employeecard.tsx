import { FaEllipsisH } from "react-icons/fa"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useState, useRef } from "react"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

type EmployeeCardProps = {
    id: number
    name: string
    cpf: string
    role: string
    isActive: boolean
}

export default function EmployeeCard(props: EmployeeCardProps) {
    const [isOpened, setIsOpened] = useState(false)

    const popupRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(popupRef, () => setIsOpened(false));

    function tooglePopUp() {
        setIsOpened(!isOpened)
    }

    return (
        <div className={`w-full flex relative justify-between items-center rounded-[.625rem] ${props.isActive ? 'bg-[#649fbf33]' : 'bg-[#F2F2F2]'} `}>
            <div className="w-full p-4 grid gap-2">
                <h2 className="text-2xl text-[#707070]">{props.name}</h2>
                <div className="flex gap-4">
                    <Badge className="bg-[#649FBF] rounded-4xl px-3 py-0.5">{props.cpf}</Badge>
                    <Badge className="bg-[#649FBF] rounded-4xl px-3 py-0.5">{props.isActive ? "Ativo" : "Inativo"}</Badge>
                    <Badge className="bg-[#649FBF] rounded-4xl px-3 py-0.5">{props.role}</Badge>
                </div>
            </div>
            <Button 
            className="cursor-pointer bg-[#649FBF] rounded-r-[.625rem] w-fit h-full flex items-center justify-center ml-auto"
            onClick={tooglePopUp}
            >
                <FaEllipsisH  color="white" className="w-4 h-4 mx-4"/>
            </Button>

            {isOpened && (
                <div ref={popupRef} className="grid grid-rows-2 h-[95%] shadow-xl absolute right-0 top-0 bg-white rounded-[10px] text-[#959595] z-20">
                    <button className="cursor-pointer flex items-center justify-center px-10 border-b border-[#DBDBDB] hover:text-[#649FBF]">Alterar</button>
                    <button className="cursor-pointer flex items-center justify-center px-10 hover:text-[#649FBF]">Excluir</button>
                </div>
            )}
        </div>
    )
}