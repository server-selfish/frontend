import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 96 96"
    {...props}
  >
    <path fill="url(#plus_svg__a)" d="M0 0h96v96H0z" />
    <defs>
      <pattern
        id="plus_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#plus_svg__b" transform="scale(.01042)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZUlEQVR4nO3bsUojARRG4atdfHgRV9FH1MZs47ZnCUwlBhTinJE5H9wmpJjJgXT/TJIkSZIk33D9nS/ncg4z8zAzf5f7s3yWldzNDB/u1n6oPXn5JMCr/VB7wpnLSiiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuNhjgJuZeVwmQed+gL3fcZlO/chc6nkDL8gvudNvdfE14r8NvBi/5N4vveAswLgBTvoLmi/f0/yAw7LHPW7gBdnovc3M/R42y5y5rIQCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuCiAiwK4KICLArgogIsCuI5nxhFZycMnAU7LlKzksGzW3pd72sMsaIuulkuSJEmSZL7kP/mqWZAp6BPHAAAAAElFTkSuQmCC"
        id="plus_svg__b"
        width={96}
        height={96}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);
export default SvgPlus;
