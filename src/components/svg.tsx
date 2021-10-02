import React from "react"

const defaultSize = 100
const defaultColor = "#fff"

class GetSVG {
  constructor(
    private height: number,
    private color: string,
    private width?: number
  ) {}

  /** ## Sizing SVG */
  private div(param: JSX.Element) {
    return (
      <div
        style={{
          height: this.height + "px",
          width: (this.width ? this.width : this.height) + "px",
        }}
      >
        {param}
      </div>
    )
  }

  get temperature(): JSX.Element {
    return this.div(
      <svg viewBox="0 0 56.69 56.69">
        <path
          fill={this.color}
          d="m41.741 10.852v2h-7.75v-2zm-3.25 4.359h-4.5v2h4.5zm-4.5 6.359h7.75v-2h-7.75zm4.5 2.36h-4.5v2h4.5zm-4.5 6.359h7.75v-2h-7.75zm1.208 11.396c0 5.583-4.542 10.125-10.125 10.125s-10.125-4.542-10.125-10.125c0-3.618 1.9-6.906 5-8.725v-22.954c0-2.826 2.299-5.125 5.125-5.125s5.125 2.299 5.125 5.125v22.954c3.1 1.817 5 5.106 5 8.725zm-2 0c0-3.07-1.706-5.845-4.453-7.24l-.547-.278v-24.16c0-1.724-1.402-3.125-3.125-3.125s-3.125 1.401-3.125 3.125v24.16l-.547.278c-2.747 1.396-4.453 4.171-4.453 7.24 0 4.48 3.645 8.125 8.125 8.125s8.125-3.645 8.125-8.125zm-1.666 0c0 3.561-2.897 6.458-6.459 6.458-3.561 0-6.458-2.897-6.458-6.458 0-2.919 1.972-5.482 4.796-6.233l.371-.099v-22.23h2.583v22.229l.371.1c2.825.751 4.796 3.315 4.796 6.233zm-6.139-4.305c-.154-.684-.842-1.134-1.543-.974-2.448.554-4.158 2.695-4.158 5.207 0 .711.579 1.29 1.29 1.29s1.29-.579 1.29-1.29c0-1.277.902-2.409 2.147-2.69.692-.159 1.13-.851.974-1.543z"
        />
      </svg>
    )
  }
}

export const SVG = (
  height = defaultSize,
  color = defaultColor,
  width?: number
): GetSVG => new GetSVG(height, color, width)