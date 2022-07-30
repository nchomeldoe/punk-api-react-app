import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render the app with the title BrewDog", () => {
  render(<App />);
  const heading = screen.getByText(/brewdog/i);
  expect(heading).toBeInTheDocument();
});
