import type { SVGProps } from "react";
const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="chevron-left_svg__lucide chevron-left_svg__lucide-chevron-left-icon chevron-left_svg__lucide-chevron-left"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
export default SvgChevronLeft;
