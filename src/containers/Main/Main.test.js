import { fireEvent, render, screen } from "@testing-library/react";
import Main from "./Main";

it("should display the page number and left and right buttons", async () => {
  render(<Main />);
  const currentPage = await screen.findByTestId("current-page");
  const buttons = screen.getAllByRole("button");
  expect(currentPage).toBeInTheDocument();
  buttons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});
