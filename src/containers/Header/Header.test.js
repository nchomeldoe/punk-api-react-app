import { render, screen } from "@testing-library/react";
import Header from "./Header";
const testFilters = {
  testSearchOne: {
    value: "",
    type: "frontEnd",
    inputType: "text",
    label: "Test search one",
  },
  testSearchTwo: {
    value: "",
    type: "frontEnd",
    inputType: "text",
    label: "Test search two",
  },
  testFilterOne: {
    value: false,
    type: "backEnd",
    inputType: "checkbox",
    label: "Test filter one",
  },
  testFilterTwo: {
    value: false,
    type: "backEnd",
    inputType: "checkbox",
    label: "Test filter two",
  },
};

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

it("should render the title BrewDog", () => {
  render(<Header filters={testFilters} />);
  const heading = screen.getByText(/brewdog/i);
  expect(heading).toBeInTheDocument();
});
