import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="chevron-right_svg__lucide chevron-right_svg__lucide-chevron-right-icon chevron-right_svg__lucide-chevron-right"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
export default SvgChevronRight;
