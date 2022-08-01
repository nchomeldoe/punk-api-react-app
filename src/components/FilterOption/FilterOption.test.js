import { render, screen, fireEvent } from "@testing-library/react";
import FilterOption from "./FilterOption";

it("should render filter option input element with label text passed down as prop", () => {
  render(<FilterOption label="test label" />);
  const label = screen.getByText("test label");
  expect(label).toBeInTheDocument();
});

it("should initially be unchecked", () => {
  render(<FilterOption label="test label" />);
  const inputElement = screen.getByRole("checkbox");
  expect(inputElement.checked).toBeFalsy();
});

it("should become checked when user clicks it", () => {
  render(<FilterOption label="test label" />);
  const inputElement = screen.getByRole("checkbox");
  fireEvent.click(inputElement);
  expect(inputElement.checked).toBeTruthy();
});

it("should become unchecked when user clicks it again", () => {
  render(<FilterOption label="test label" />);
  const inputElement = screen.getByRole("checkbox");
  fireEvent.click(inputElement);
  expect(inputElement.checked).toBeTruthy();
  fireEvent.click(inputElement);
  expect(inputElement.checked).toBeFalsy();
});
