import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "./SearchBox";

it("should render search box input element with placeholder text passed down as prop", () => {
  render(<SearchBox label="test placeholder" />);
  const inputElement = screen.getByPlaceholderText(/test placeholder/i);
  expect(inputElement).toBeInTheDocument();
});

it("should initially have a falsy value", () => {
  render(<SearchBox label="test placeholder" />);
  const inputElement = screen.getByPlaceholderText(/test placeholder/i);
  expect(inputElement.value).toBeFalsy();
});

it("should change value as user types into input", () => {
  render(<SearchBox label="test placeholder" />);
  const inputElement = screen.getByPlaceholderText(/test placeholder/i);
  fireEvent.change(inputElement, { target: { value: "test value" } });
  expect(inputElement.value).toBe("test value");
});
