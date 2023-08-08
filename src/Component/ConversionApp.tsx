import React, { useState, ChangeEvent, useEffect } from "react";
import Style from "./ConversionApp.module.css";

interface ConversionAppProps {
  quantity: string;
  primary: string;
  secondary: string;
}

const conversionFactors: {
  [key: string]: { [key: string]: { value: number; fullForm: string } };
} = {
  Length: {
    km: { value: 1, fullForm: "Kilometer" },
    m: { value: 1000, fullForm: "Meter" },
    mm: { value: 1000000, fullForm: "Millimeter" },
  },
  Volume: {
    l: { value: 1, fullForm: "Liter" },
    ml: { value: 1000, fullForm: "Milliliter" },
    gal: { value: 0.264172, fullForm: "Gallon (U.S. liquid gallon)" },
    cubicM: { value: 0.001, fullForm: "Cubic meter" },
    cubicIn: { value: 61.0237, fullForm: "Cubic inch" },
    cubicFt: { value: 0.0353147, fullForm: "Cubic foot" },
  },
  Mass: {
    kg: { value: 1, fullForm: "Kilogram" },
    g: { value: 1000, fullForm: "Gram" },
    mg: { value: 1000000, fullForm: "Milligram" },
    ton: { value: 0.001, fullForm: "Metric ton" },
  },
  Time: {
    sec: { value: 1, fullForm: "Second" },
    min: { value: 1 / 60, fullForm: "Minute" },
    hour: { value: 1 / 3600, fullForm: "Hour" },
    day: { value: 1 / 86400, fullForm: "Day" },
  },
  Temperature: {
    C: { value: 1, fullForm: "Celsius" },
    F: { value: 9 / 5, fullForm: "Fahrenheit" },
    K: { value: 273.15, fullForm: "Kelvin" },
  },
  Area: {
    sqm: { value: 1, fullForm: "Square meter" },
    sqcm: { value: 10000, fullForm: "Square centimeter" },
    sqft: { value: 10.7639, fullForm: "Square foot" },
    acre: { value: 0.000247105, fullForm: "Acre" },
  },
  Speed: {
    mps: { value: 1, fullForm: "Meters per second" },
    kmph: { value: 3.6, fullForm: "Kilometers per hour" },
    mph: { value: 2.23694, fullForm: "Miles per hour" },
  },
  Energy: {
    joule: { value: 1, fullForm: "Joule" },
    calorie: {
      value: 0.239006,
      fullForm: "Calorie (International Calorie)",
    },
    kWH: { value: 2.77778e-7, fullForm: "Kilowatt-hour" },
  },
  Pressure: {
    pascal: { value: 1, fullForm: "Pascal" },
    bar: { value: 0.00001, fullForm: "Bar" },
    psi: { value: 0.000145038, fullForm: "Pounds per square inch" },
  },
};

const ConversionApp: React.FC<ConversionAppProps> = ({
  quantity,
  primary,
  secondary,
}) => {
  const [inputValue, setInputValue] = useState<number | string>(0);
  const [outputValue, setOutputValue] = useState<number | string>(0);
  const [inputUnit, setInputUnit] = useState<string>(primary);
  const [outputUnit, setOutputUnit] = useState<string>(secondary);
  const [inputHeading, setInputHeading] = useState<string>(
    conversionFactors[quantity][primary].fullForm
  );
  const [outputHeading, setOutputHeading] = useState<string>(
    conversionFactors[quantity][secondary].fullForm
  );
  // Define conversion factors for different quantities
  useEffect(() => {
    setInputUnit(primary);
    setOutputUnit(secondary);
    setInputValue(0);
    setOutputValue(0);
  }, [primary, secondary, quantity]);
  useEffect(() => {
    if (
      conversionFactors[quantity][inputUnit] &&
      conversionFactors[quantity][outputUnit]
    ) {
      setInputHeading(conversionFactors[quantity][inputUnit].fullForm);
      setOutputHeading(conversionFactors[quantity][outputUnit].fullForm);
    }
  }, [inputUnit, outputUnit]);

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = isNaN(parseFloat(e.target.value))
      ? e.target.value
      : parseFloat(e.target.value);
    if (isNaN(Number(value))) {
      setInputValue(0);
      setOutputValue(0);
    }
    setInputValue(value);
    if (inputUnit === outputUnit) {
      setOutputValue(value);
      return;
    }
    if (quantity !== "Temperature") {
      setOutputValue(
        Number(
          (
            (Number(value) * conversionFactors[quantity][outputUnit].value) /
            conversionFactors[quantity][inputUnit].value
          )
            .toFixed(6)
            .toString()
            .replace(/(\.[0-9]*?)0+$/, "$1")
        )
      );
    } else if (quantity === "Temperature" && inputUnit === "C") {
      const tempValue: string | number = isNaN(parseFloat(e.target.value))
        ? e.target.value
        : parseFloat(e.target.value);
      setInputValue(tempValue);

      if (outputUnit === "F") {
        setOutputValue(
          Number(
            (Number(tempValue) * 1.8 + 32)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      } else if (outputUnit === "K") {
        setOutputValue(
          Number(
            (Number(value) + 273.15)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      }
    } else if (quantity === "Temperature" && inputUnit === "F") {
      const tempValue: string | number = isNaN(parseFloat(e.target.value))
        ? e.target.value
        : parseFloat(e.target.value);
      setInputValue(tempValue);
      if (outputUnit === "C") {
        setOutputValue(
          Number(
            (((Number(value) - 32) * 5) / 9)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      } else if (outputUnit === "K") {
        setOutputValue(
          Number(
            (((Number(value) - 32) * 5) / 9 + 273.15)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      }
    } else if (quantity === "Temperature" && inputUnit === "K") {
      const tempValue: string | number = isNaN(parseFloat(e.target.value))
        ? e.target.value
        : parseFloat(e.target.value);
      setInputValue(tempValue);
      if (outputUnit === "C") {
        setOutputValue(
          Number(
            (Number(value) - 273.15)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      } else if (outputUnit === "F") {
        setOutputValue(
          Number(
            ((Number(value) - 273.15) * 1.8 + 32)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      }
    }
  }

  function outputChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string | number = isNaN(parseFloat(e.target.value))
      ? e.target.value
      : parseFloat(e.target.value);
    if (isNaN(Number(value))) {
      setInputValue(0);
      setOutputValue(0);
    }
    setOutputValue(value);

    if (inputUnit === outputUnit) {
      setInputValue(value);
      return;
    }
    if (quantity !== "Temperature") {
      setInputValue(
        Number(
          (
            (Number(value) * conversionFactors[quantity][inputUnit].value) /
            conversionFactors[quantity][outputUnit].value
          )
            .toFixed(6)
            .toString()
            .replace(/(\.[0-9]*?)0+$/, "$1")
        )
      );
    } else if (quantity === "Temperature" && outputUnit === "C") {
      const tempValue: string | number = isNaN(parseFloat(e.target.value))
        ? e.target.value
        : parseFloat(e.target.value);
      setOutputValue(tempValue);
      if (inputUnit === "F") {
        setInputValue(
          Number(
            (Number(value) * 1.8 + 32)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      } else if (inputUnit === "K") {
        setInputValue(
          Number(
            (Number(value) + 273.15)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      }
    } else if (quantity === "Temperature" && outputUnit === "F") {
      const tempValue: string | number = isNaN(parseFloat(e.target.value))
        ? e.target.value
        : parseFloat(e.target.value);
      setOutputValue(tempValue);
      if (inputUnit === "C") {
        setInputValue(
          Number(
            (((Number(value) - 32) * 5) / 9)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      } else if (inputUnit === "K") {
        setInputValue(
          Number(
            (((Number(value) - 32) * 5) / 9 + 273.15)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      }
    } else if (quantity === "Temperature" && outputUnit === "K") {
      const tempValue: string | number = isNaN(parseFloat(e.target.value))
        ? e.target.value
        : parseFloat(e.target.value);
      setOutputValue(tempValue);
      if (inputUnit === "C") {
        setInputValue(
          Number(
            (Number(value) - 273.15)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      } else if (inputUnit === "F") {
        setInputValue(
          Number(
            ((Number(value) - 273.15) * 1.8 + 32)
              .toFixed(6)
              .toString()
              .replace(/(\.[0-9]*?)0+$/, "$1")
          )
        );
      }
    }
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
          <div>{inputHeading}</div>
          <div className={Style.inputContainer}>
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
        </div>
        <div className={Style.unitTwo}>
          <div>{outputHeading}</div>
          <div className={Style.outputContainer}>
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
      </div>
    </>
  );
};

export default ConversionApp;
