import { FC } from "react";

interface IChart {
  value: number;
  timeSpent: string;
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x.toFixed(2),
    start.y.toFixed(2),
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x.toFixed(2),
    end.y.toFixed(2),
  ].join(" ");

  return d;
};

const Chart: FC<IChart> = ({ value, timeSpent }) => {
  const lightText = "p-0 m-0 text-[10px] font-medium";
  const boldText = "p-0 m-0 text-2xl font-extrabold";
  return (
    <div
      className={`w-[120px] h-[120px] relative flex justify-center items-center `}
    >
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 text-nxu-charging-gold"
      >
        {value > 0 && (
          <path
            d={describeArc(
              60,
              60,
              50,
              -(360 / 100) * (value >= 100 ? 99.9999999 : value),
              0
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
          />
        )}
        <circle
          cx={60}
          cy={60}
          r={45}
          stroke="white"
          fill="none"
          strokeWidth={1}
        />
      </svg>
      <div className="text-lg font-bold leading-6 flex flex-col items-center">
        <p className={boldText}>{`${
          value >= 0 ? `${value}%` : "N/A"
        }`}</p>
        <p className={lightText}>{timeSpent}</p>
      </div>
    </div>
  );
};

export default Chart;
