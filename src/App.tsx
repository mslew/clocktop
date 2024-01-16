//1024x600
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col border h-screen w-screen justify-center items-center">
        <div className="border border-red-300 w-full h-full grid grid-cols-4 grid-rows-6">
          <div className="border border-blue-800 col-span-3 row-span-5 text-white"> time</div>
          <div className="border border-yellow-800 row-span-6 text-white">weather</div>
          <div className="border border-green-800 row-span-2 col-span-2 text-white">date</div>
          <div className="border border-purple-800 row-span-2">calendar</div>
        </div>
      </div>
    </>
  );
}

export default App;