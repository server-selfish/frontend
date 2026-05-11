import type { SVGProps } from "react";
const SvgMail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="mail_svg__lucide mail_svg__lucide-mail-icon mail_svg__lucide-mail"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect width={20} height={16} x={2} y={4} rx={2} />
  </svg>
);
export default SvgMail;
