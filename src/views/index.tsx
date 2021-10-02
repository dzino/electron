import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Dec from "../declaration"
import GraphX from "../components/graph"
import { SVG } from "../components/svg"
import Circular from "../components/circular-input"

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    margin: "0 5",
  },
  centeredContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  graphHeader: {
    width: 80,
    alignItems: "center",
    marginLeft: -1,
    padding: 0,
    marginTop: -20,
  },
  v: {
    margin: 5,
    color: "#3b649650",
    fontFamily: "Open Sans,open-sans,sans-serif",
    fontSize: 14,
  },
  h2: {
    marginLeft: 10,
    padding: 0,
    fontWeight: 700,
    fontFamily: "Open Sans,open-sans,sans-serif",
    fontSize: 30,
  },
  input: {
    padding: 10,
    backgroundColor: "#00000000",
    borderRadius: 20,
    border: "2px solid",
    borderColor: "#3b649630",
    width: 70,
  },
  invert: {
    transform: "rotate(0.5turn)",
  },
}

class Graph {
  private length = 0
  private full = false

  constructor(private graphLength: number, private data: number[]) {
    this.length = this.data.length
    this.full = this.graphLength - this.length <= 0
  }

  get max() {
    return Math.max(...this.data)
  }

  get render() {
    return this.full
      ? this.data.slice(this.length - this.graphLength)
      : [...new Array(this.graphLength - this.length).fill(0), ...this.data]
  }
}

export default function App() {
  /* Redux */
  const dispatch: (v: Dec.Actions.All) => void = useDispatch()
  const [limitTemp, setLimitTemp] = [
    useSelector((state: Dec.Redux.RootState) => state.limitTemp.value),
    (v: Dec.General.TempUnit) => dispatch({ type: "LIMIT_TEMP", payload: v }),
  ]
  const data = useSelector((state: Dec.Redux.RootState) => state.data.value)

  const [temperature, setTemperature] = useState<number>(0)
  const alarm: boolean = temperature < limitTemp

  const { graphLength, timeout }: Dec.Redux.RootState["settings"] = useSelector(
    (state: Dec.Redux.RootState) => state.settings
  )

  const graphTemp = new Graph(
    graphLength,
    data.map((i) => i.temperature)
  )

  useEffect(() => {
    dispatch({ type: "GET_LOCAL" })
    dispatch({ type: "UPDATE" })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const lastUnit = data[data.length - 1]
    if (lastUnit) {
      setTemperature(lastUnit.temperature)
      setTimeout(() => dispatch({ type: "UPDATE" }), timeout)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={styles.app}>
      <div className="row" style={{ marginBottom: 60 }}>
        <div
          className="col-sm center-block"
          style={{ ...styles.centeredContent, marginTop: 40 }}
        >
          <div>
            <GraphX
              data={graphTemp.render}
              threshold={limitTemp}
              thresholdInversion={true}
              xHead={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
              xMeasure={"min"}
              maxY={graphTemp.max}
              animationTime={500}
            />
            <div
              className="col"
              style={{ ...styles.graphHeader, marginTop: -25 }}
            >
              {
                SVG(40, temperature < limitTemp ? "#f73914  " : "#71cdf1")
                  .temperature
              }
              <h2 style={{ ...styles.h2, marginLeft: 6, marginTop: 5 }}>
                {temperature}
              </h2>
            </div>
            <div style={{ ...styles.centeredContent, marginTop: -20 }}>
              <Circular
                activeColort={alarm ? "#f73914" : "#71cdf1"}
                value={limitTemp}
                setValue={setLimitTemp}
                maxCircular={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
