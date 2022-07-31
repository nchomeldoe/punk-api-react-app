import { render, screen } from "@testing-library/react";
import Message from "./Message.jsx";

it("should render the message passed into displayedMessage prop", () => {
  render(<Message displayedMessage="test message" />);
  const message = screen.getByText(/test message/i);
  expect(message).toBeInTheDocument();
});
