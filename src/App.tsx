import { useState } from "react";
import Aside from "./components/aside";

function App() {
  const [activeField, setActiveField] = useState<number | null>(2);

  return(
    <div className="h-screen w-screen grid grid-cols-[5%_1fr] dark:bg-[#F2F2F2]">
      <aside className="">
        <Aside activeField={activeField} setActiveField={setActiveField} />
      </aside>

      <main className="bg-green-50 p-8">
        <h1>{activeField}</h1>
      </main>

    </div>
  )
}

export default App
