import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col border h-screen w-screen justify-center items-center">
        <div className="border border-red-300 w-3/4 h-3/4 grid grid-cols-4 grid-rows-4">
          <div className="border border-blue-800"></div>
          <div className="border border-yellow-800"></div>
          <div className="border border-green-800"></div>
          <div className="border border-purple-800"></div>
          <div className="border border-red-800"></div>
        </div>
      </div>
    </>
  );
}

export default App;