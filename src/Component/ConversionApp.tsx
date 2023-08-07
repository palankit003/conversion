import React, { useState, ChangeEvent, useEffect } from "react";
import Style from "./ConversionApp.module.css";

interface ConversionAppProps {
  quantity: string;
  primary: string;
  secondary: string;
}

const ConversionApp: React.FC<ConversionAppProps> = ({
  quantity,
  primary,
  secondary,
}) => {
  const [inputValue, setInputValue] = useState<number | string>(0);
  const [outputValue, setOutputValue] = useState<number | string>(0);
  const [inputUnit, setInputUnit] = useState<string>(primary);
  const [outputUnit, setOutputUnit] = useState<string>(secondary);

  // Define conversion factors for different quantities
  useEffect(() => {
    setInputUnit(primary);
    setOutputUnit(secondary);
    setInputValue(0);
    setOutputValue(0);
  }, [primary, secondary, quantity]);

  useEffect(() => {});
  const conversionFactors: { [key: string]: { [key: string]: number } } = {
    Length: {
      km: 1,
      m: 1000,
      mm: 1000000,
    },
    Volume: {
      l: 1,
      ml: 1000,
      gal: 0.264172,
      cubicMeter: 0.001,
      cubicInch: 61.0237,
      cubicFoot: 0.0353147,
    },
    Mass: {
      kg: 1,
      g: 1000,
      mg: 1000000,
      ton: 0.001,
    },
    Time: {
      sec: 1,
      min: 1 / 60,
      hour: 1 / 3600,
      day: 1 / 86400,
    },
    Temperature: {
      celsius: 1,
      fahrenheit: 9 / 5,
    },
    Area: {
      sqm: 1,
      sqcm: 10000,
      sqft: 10.7639,
      acre: 0.000247105,
    },
    Speed: {
      mps: 1,
      kmph: 3.6,
      mph: 2.23694,
    },
    Energy: {
      joule: 1,
      calorie: 0.239006,
      kilowattHour: 2.77778e-7,
    },
    Pressure: {
      pascal: 1,
      bar: 0.00001,
      psi: 0.000145038,
    },

    // Add more quantities and their corresponding conversion factors as needed.
  };

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value.replace(/^0+/, ""));
    if (isNaN(value)) {
      setInputValue(0);
      setOutputValue(0);
    }
    setInputValue(value);
    setOutputValue(
      Number(
        (
          (value * conversionFactors[quantity][outputUnit]) /
          conversionFactors[quantity][inputUnit]
        )
          .toFixed(6)
          .toString()
          .replace(/(\.[0-9]*?)0+$/, "$1")
      )
    );
  }

  function outputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value.replace(/^0+/, ""));
    if (isNaN(value)) {
      setInputValue(0);
      setOutputValue(0);
    }
    setOutputValue(value);
    setInputValue(
      Number(
        (
          (value * conversionFactors[quantity][inputUnit]) /
          conversionFactors[quantity][outputUnit]
        )
          .toFixed(6)
          .toString()
          .replace(/(\.[0-9]*?)0+$/, "$1")
      )
    );
  }

  function handleInputUnitChange(e: ChangeEvent<HTMLSelectElement>) {
    const unit = e.target.value;
    setInputUnit(unit);
    setInputValue(0);
    setOutputValue(0);
  }

  function handleOutputUnitChange(e: ChangeEvent<HTMLSelectElement>) {
    const unit = e.target.value;
    setOutputUnit(unit);
    setInputValue(0);
    setOutputValue(0);
  }

  return (
    <>
      <div className={Style.container}>
        <div className={Style.unitOne}>
          <select
            value={inputUnit}
            onChange={handleInputUnitChange}
            className={Style.inputUnit}
          >
            {Object.keys(conversionFactors[quantity]).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <input
            value={inputValue}
            type="number"
            placeholder="Enter a number"
            onChange={inputChange}
          />
        </div>
        <div className={Style.unitTwo}>
          <select
            value={outputUnit}
            onChange={handleOutputUnitChange}
            className={Style.outputUnit}
          >
            {Object.keys(conversionFactors[quantity]).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <input
            value={outputValue}
            type="number"
            placeholder="Enter a number"
            onChange={outputChange}
          />
        </div>
      </div>
    </>
  );
};

export default ConversionApp;
