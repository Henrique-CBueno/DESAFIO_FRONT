import { useState } from "react";
import bg from "./assets/bg.svg"
import Aside from "./components/sections/aside";
import Soon from "./components/sections/soon";
import InitialPage from "./components/sections/initialPage";

function App() {
  const [activeField, setActiveField] = useState<number | null>(2);

  return(
    <div className={`h-screen w-screen grid grid-cols-[6%_1fr] bg-[#F2F2F2] overflow-x-hidden`}>
      <aside className="">
        <Aside activeField={activeField} setActiveField={setActiveField} />
      </aside>

      <main 
      style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right -25px bottom -25px"
    }}
    >
        {
          activeField === 2 ? (
            <InitialPage />
          )
          :
          (
            <Soon />
          )
        }
      </main>
    </div>
  )
}

export default App