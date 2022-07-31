import { render, screen, fireEvent } from "@testing-library/react";
import PageSelector from "./PageSelector";

it("should render two buttons", () => {
  render(<PageSelector currentPage="1" pageCount="2" />);
  const buttons = screen.getAllByRole("button");
  buttons.forEach((button) => expect(button).toBeInTheDocument());
});

it("should render an element displaying the current page", () => {
  render(<PageSelector currentPage={1} pageCount={2} />);
  const currentPage = screen.getByTestId("current-page");
  expect(currentPage).toHaveTextContent(1);
});

it("should show the left button to be disabled if the current page is one", () => {
  render(<PageSelector currentPage={1} pageCount={2} />);
  const leftButton = screen.getByRole("button", {
    name: "go to previous page",
  });
  expect(leftButton.disabled).toBeTruthy();
});

it("should show the right button to be disabled if the current page is equal to the page count", () => {
  render(<PageSelector currentPage={2} pageCount={2} />);
  const rightButton = screen.getByRole("button", {
    name: "go to next page",
  });
  expect(rightButton.disabled).toBeTruthy();
});

it("should show both buttons not to be disabled otherwise", () => {
  render(<PageSelector currentPage={2} pageCount={3} />);
  const buttons = screen.getAllByRole("button");
  buttons.forEach((button) => expect(button.disabled).toBeFalsy());
});
