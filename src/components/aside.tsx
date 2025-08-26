import { Button } from "./ui/button"
import icon1 from "../assets/icon1.svg"
import icon2 from "../assets/icon2.svg"
import icon3 from "../assets/icon3.svg"
import icon4 from "../assets/icon4.svg"
import icon5 from "../assets/icon5.svg"
import icon6 from "../assets/icon6.svg"

export default function Aside(props: any) {

    const fields = [
        {
            id: 1,
            name: "Dashboard",
            icon: icon1
        },
        {
            id: 2,
            name: "Users",
            icon: icon2
        },
        {
            id: 3,
            name: "Settings",
            icon: icon3
        },
        {
            id: 4,
            name: "Notifications",
            icon: icon4
        },
        {
            id: 5,
            name: "Messages",
            icon: icon5
        },
        {
            id: 6,
            name: "Help",
            icon: icon6
        }
    ]

    const { activeField, setActiveField } = props;


    return(
        <div className="h-[80%] grid items-center justify-center rounded-r-2xl bg-[#649FBF]">
            <div className="w-[5%] top-[5%] h-10 absolute bg-white"></div>
            <div className="flex flex-col gap-2">
                {fields.map(field => (
                    <div key={field.id} className="relative grid place-items-center">
                        {activeField === field.id && (
                            <div className="absolute -left-4 top-0 h-full w-1.5 bg-white rounded-full" />
                        )}
                        <Button className={`bg-white opacity-80 h-12 w-12 cursor-pointer ${activeField === field.id ? 'opacity-100' : ''}`} onClick={() => setActiveField(field.id)}>
                            <img src={field.icon} alt={field.name} />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}