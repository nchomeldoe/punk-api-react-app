import { render, screen } from "@testing-library/react";
import FilterContainer from "./FilterContainer";

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

it("should render a text input for each search with an input type of text passed to it as props if is it a search type filter container", () => {
  render(<FilterContainer type="search" filters={testFilters} />);
  const textInputs = screen.getAllByRole("textbox");
  expect(textInputs.length).toBe(2);
});

it("should render a checkbox input for each search with an input type of checkbox passed to it as props if is it a filter type filter container", () => {
  render(<FilterContainer type="filter" filters={testFilters} />);
  const checkboxInputs = screen.getAllByRole("checkbox");
  expect(checkboxInputs.length).toBe(2);
});
