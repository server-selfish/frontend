import type { SVGProps } from "react";
const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="chevron-down_svg__lucide chevron-down_svg__lucide-chevron-down-icon chevron-down_svg__lucide-chevron-down"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export default SvgChevronDown;
