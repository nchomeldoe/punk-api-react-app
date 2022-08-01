import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

it("should display a page number of 1", async () => {
  render(<App />);
  const currentPage = await screen.findByTestId("current-page");
  expect(currentPage).toHaveTextContent(1);
});

it("should increment the page number on click of right button", async () => {
  render(<App />);
  const currentPage = await screen.findByTestId("current-page");
  const rightButton = screen.getByRole("button", {
    name: "go to next page",
  });
  fireEvent.click(rightButton);
  expect(currentPage).toHaveTextContent(2);
});
