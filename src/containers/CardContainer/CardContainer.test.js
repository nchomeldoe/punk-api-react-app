import { render, screen } from "@testing-library/react";
import CardContainer from "./CardContainer";
import beers from "../../assets/data/beers.js";

it("should render a beer card for the first beer in the array passed to it as props", () => {
  render(<CardContainer beers={beers} />);
  const beerCard = screen.getByText(beers[0].name);
  expect(beerCard).toBeInTheDocument();
});

it("should render the same number of beer cards as there are beers in the array passed to it as props", () => {
  render(<CardContainer beers={beers} />);
  const pairingsLists = screen.getAllByRole("list");
  expect(pairingsLists.length).toBe(beers.length);
});
