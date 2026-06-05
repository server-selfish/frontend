import type { SVGProps } from "react";
const SvgConfigure = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="configure_svg__lucide configure_svg__lucide-cog-icon configure_svg__lucide-cog"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M11 10.27 7 3.34M11 13.73l-4 6.93M12 22v-2M12 2v2M14 12h8M17 20.66l-1-1.73M17 3.34l-1 1.73M2 12h2M20.66 17l-1.73-1M20.66 7l-1.73 1M3.34 17l1.73-1M3.34 7l1.73 1" />
    <circle cx={12} cy={12} r={2} />
    <circle cx={12} cy={12} r={8} />
  </svg>
);
export default SvgConfigure;
