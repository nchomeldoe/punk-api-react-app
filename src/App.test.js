import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

it("should render the app with the title BrewDog", () => {
  render(<App />);
  const heading = screen.getByText(/brewdog/i);
  expect(heading).toBeInTheDocument();
});

it("should display the page number and left and right buttons", async () => {
  render(<App />);
  const currentPage = await screen.findByTestId("current-page");
  const buttons = screen.getAllByRole("button");
  expect(currentPage).toBeInTheDocument();
  buttons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});

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
