import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/Input";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convert, setConverted] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);
  const swap = () => {
    const tempSwap = from;
    setFrom(to);
    setTo(tempSwap);
    const tempAmount = convert;
    setConverted(amount);
    setAmount(tempAmount);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  onAmountChange={(amount) => {
                    console.log("hiiiii", amount);
                    setAmount(amount);
                  }}
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(from) => {
                    setFrom(from);
                    setAmount(from);
                  }}
                  selectCurrrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  onClick={swap}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convert}
                  currencyOptions={options}
                  onCurrencyChange={(to) => {
                    setTo(to);
                  }}
                  selectCurrrency={to}
                />
              </div>
              <button
                type="submit"
                onClick={() => {
                  setConverted(amount * currencyInfo[to]);
                }}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from} to {to}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
