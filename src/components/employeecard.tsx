import { FaEllipsisH } from "react-icons/fa"
import { Badge } from "./ui/badge"

type EmployeeCardProps = {
    id: number
    name: string
    cpf: number
    role: string
    isActive: boolean
}

export default function EmployeeCard(props: EmployeeCardProps) {

    return (
        <div className={`w-full flex justify-between items-center rounded-[.625rem] ${props.isActive ? 'bg-[#649fbf33]' : 'bg-[#F2F2F2]'} `}>
            <div className="w-full p-4 grid gap-2">
                <h2 className="text-2xl text-[#707070]">{props.name}</h2>
                <div className="flex gap-4">
                    <Badge className="bg-[#649FBF] rounded-4xl px-3 py-0.5">{props.cpf}</Badge>
                    <Badge className="bg-[#649FBF] rounded-4xl px-3 py-0.5">{props.isActive ? "Ativo" : "Inativo"}</Badge>
                    <Badge className="bg-[#649FBF] rounded-4xl px-3 py-0.5">{props.role}</Badge>
                </div>
            </div>
            <button className="cursor-pointer bg-[#649FBF] rounded-r-[.625rem] w-fit h-full flex items-center justify-center ml-auto">
                <FaEllipsisH  color="white" className="w-4 h-4 mx-4"/>
            </button>
        </div>
    )
}