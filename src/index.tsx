import * as React from "react"
import ReactDOM from "react-dom"
import Redux from "./redux"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

import App from "./views"

ReactDOM.render(
  <React.StrictMode>
    <Redux>
      <App />
    </Redux>
  </React.StrictMode>,
  document.getElementById("root")
)
