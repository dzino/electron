import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Redux from "../redux"
import App from "./index"

test("Rendering an item", () => {
  render(
    <Redux>
      <App />
    </Redux>
  )
  const linkElement = screen.getByText(/10/i)
  expect(linkElement).toBeInTheDocument()
})
