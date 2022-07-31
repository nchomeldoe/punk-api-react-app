import { render, screen } from "@testing-library/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const testCondition = true;
const testIcon = <FontAwesomeIcon icon={faArrowLeft} title="left arrow" />;

it("should be rendered in the document", () => {
  render(
    <Button
      disabledConditions={testCondition}
      ariaLabel="test aria label"
      icon={testIcon}
    />,
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument;
});

it("should be disabled if the disabled conditions passed down as props are met", () => {
  render(
    <Button
      disabledConditions={testCondition}
      ariaLabel="test aria label"
      icon={testIcon}
    />,
  );
  const button = screen.getByRole("button");
  expect(button.disabled).toBeTruthy();
});

it("should not be disabled if the disabled conditions passed down as props are not met", () => {
  render(
    <Button
      disabledConditions={!testCondition}
      ariaLabel="test aria label"
      icon={testIcon}
    />,
  );
  const button = screen.getByRole("button");
  expect(button.disabled).toBeFalsy();
});

it("should have the correct aria label", () => {
  render(
    <Button
      disabledConditions={!testCondition}
      ariaLabel="test aria label"
      icon={testIcon}
    />,
  );
  const button = screen.getByRole("button", { name: "test aria label" });
  expect(button).toBeInTheDocument();
});

it("should render the correct icon", () => {
  render(
    <Button
      disabledConditions={!testCondition}
      ariaLabel="test aria label"
      icon={testIcon}
    />,
  );
  const icon = screen.getByTitle("left arrow");
  expect(icon).toBeInTheDocument();
});
