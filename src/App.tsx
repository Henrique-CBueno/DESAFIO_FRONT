import { useState } from "react";
import bg from "./assets/bg.svg"
import Aside from "./components/sections/aside";
import Soon from "./components/sections/soon";
import InitialPage, { type Step } from "./components/sections/initialPage";
import { mockUsers } from "./mocks/users";
import { motion, AnimatePresence } from "framer-motion";

import { FaTimes } from "react-icons/fa";
import { steps as mockSteps } from "./mocks/steps";


function App() {
  const [activeField, setActiveField] = useState<number | null>(2);
  const [users, setUsers] = useState(mockUsers)
  const [activeStep, setActiveStep] = useState(1);
  const [popup, setOpenPopup] = useState(false);
  const [steps, setSteps] = useState<Step[]>(mockSteps);

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
            <InitialPage users={users}
            setUsers={setUsers}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setOpenPopup={setOpenPopup}
            steps={steps}
            setSteps={setSteps}
            />
          )
          :
          (
            <Soon />
          )
        }
      </main>

      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenPopup(false)}
            />

            <motion.div
              className="relative z-50 text-red-800 grid w-[60%] rounded-[24px] p-10 bg-white/80 gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="text-[#272F33] text-xl font-bold">Usuário excluído com sucesso!</span>
              <button className="text-[#649FBF] text-base font-extrabold cursor-pointer" onClick={()=>setOpenPopup(false)}>OK</button>

            <FaTimes className="absolute right-6 top-5 cursor-pointer" onClick={()=>setOpenPopup(false)}/>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App