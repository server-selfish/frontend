import type { SVGProps } from "react";
const SvgHyperlink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="hyperlink_svg__lucide hyperlink_svg__lucide-square-arrow-out-up-right-icon hyperlink_svg__lucide-square-arrow-out-up-right"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6M21 3l-9 9M15 3h6v6" />
  </svg>
);
export default SvgHyperlink;
