import Employees from "../employees";
import Lorem from "../lorem";
import Steps from "../steps";

export default function InitialPage() {
  return (
    <main className="grid grid-cols-3 grid-rows-12 gap-6 h-full w-full">
      <div className="bg-red-800 h-full w-full col-span-3 row-span-2 rounded-[1.25rem]">
        <Steps />
      </div>
      <div className="col-span-3 row-span-9 grid grid-cols-5 gap-8">
        <div className="bg-white shadow h-full w-full rounded-[1.25rem] col-span-2">
          <Lorem />
        </div>
        <div className="bg-red-800 h-full w-full rounded-[1.25rem] col-span-3">
          <Employees />
        </div>
      </div>
      <div className="bg-red-800 h-full w-full col-start-3 col-span-1 row-span-1 rounded-[1.25rem]">
        next step
      </div>
    </main>
  );
}
