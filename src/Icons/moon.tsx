import { useSelector } from "src/state/index.js";

interface MoonIconProps {}

export const Moon = (props: MoonIconProps) => {
  const theme = useSelector((state) => state.theme);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={32}
      height={32}
      style={{ fill: "black" }}
      {...props}
    >
      <path d="M21 12c0 5-4 9-9 9a9 9 0 0 1 0-18c.34 0 .68.02 1.01.06a7 7 0 1 0 7.93 7.93c.04.33.06.67.06 1.01z" />
    </svg>
  );
};
