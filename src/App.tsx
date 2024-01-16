//1024x600
import "./App.css";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import Date from "./components/Date";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <div className="w-full h-full grid grid-cols-4 grid-rows-6">
          <div className="col-span-3 row-span-5 text-white">
            <Clock />
          </div>
          <div className="row-span-6 text-white">
            <Weather />
          </div>
          <div className="row-span-2 col-span-2 text-white">
            <Date />
          </div>
          <div className="row-span-2 text-white">calendar</div>
        </div>
      </div>
    </>
  );
}

export default App;
