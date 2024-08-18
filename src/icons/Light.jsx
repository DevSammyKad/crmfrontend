import * as React from "react";
const SvgLight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#171717"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 7.85a6.5 6.5 0 1 0 5-2.35M19.14 19.14l-.13-.13m0-14.02.13-.13zM4.86 19.14l.13-.13zM12 2.08V2zM12 22v-.08zM2.08 12H2zM22 12h-.08zM4.99 4.99l-.13-.13z"
    />
  </svg>
);
export default SvgLight;
