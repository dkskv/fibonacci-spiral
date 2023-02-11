import { useCallback, useMemo, useState } from "react";
import "./index.css";
import { generateFibonacciSequence } from "./utils/generateFibonacciSequence";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useElementRect } from "../../shared/hooks/useElementRect";
import { Spiral } from "../../entities/spiral";

export function TunableFibonacciSpiral() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const rect = useElementRect(element);

  const [segmentsNumber, setSegmentsNumber] = useState(10);

  const coefficients = useMemo(
    () => generateFibonacciSequence(segmentsNumber).reverse(),
    [segmentsNumber]
  );

  const handleSliderChange = useCallback((n: number | number[]) => {
    if (typeof n === "number" && Number.isInteger(n)) {
      setSegmentsNumber(n);
    }
  }, []);

  return (
    <div className="TunableFibonacciSpiral">
      <div>
        <p>Количество сегментов</p>
        <Slider
          min={1}
          max={10}
          value={segmentsNumber}
          onChange={handleSliderChange}
          dots={true}
        />
      </div>
      <div
        ref={setElement}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <Spiral
          coefficients={coefficients}
          areaWidth={rect?.width ?? 0}
          areaHeight={rect?.height ?? 0}
          areaPadding={10}
        />
      </div>
    </div>
  );
}
