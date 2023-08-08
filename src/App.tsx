import { useState } from "react";
import Style from "./App.module.css";
import ConversionApp from "./Component/ConversionApp";

function App() {
  const [value, setValue] = useState(0);
  const Quantity = [
    { name: "Length", primary: "km", secondary: "m" },
    { name: "Volume", primary: "l", secondary: "ml" },
    { name: "Mass", primary: "kg", secondary: "g" },
    { name: "Time", primary: "min", secondary: "sec" },
    { name: "Temperature", primary: "C", secondary: "F" },
    { name: "Area", primary: "sqm", secondary: "sqcm" },
    { name: "Speed", primary: "mps", secondary: "kmph" },
    { name: "Energy", primary: "joule", secondary: "calorie" },
    { name: "Pressure", primary: "pascal", secondary: "bar" },
  ];

  return (
    <>
      <main className={Style.container} data-theme={value}>
        <div className={Style.wrapper}>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setValue(Number(e.target.value))
            }
            className={Style.quantity}
          >
            {Quantity.map((e, index) => (
              <option
                key={index}
                value={index}
                className={`
                ${Style.options}
                  ${e.name === Quantity[value].name ? Style.selected : ""} 
                `}
              >
                {e.name}
              </option>
            ))}
          </select>
          <ConversionApp
            quantity={Quantity[value].name}
            primary={Quantity[value].primary}
            secondary={Quantity[value].secondary}
          />
        </div>
      </main>
    </>
  );
}

export default App;
