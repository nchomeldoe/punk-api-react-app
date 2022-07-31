import { render, screen } from "@testing-library/react";
import BeerCard from "./BeerCard";

const beerExampleOne = {
  name: "test name",
  tagline: "test tagline",
  first_brewed: "test date",
  description: "This is a test description. It has more than one sentence.",
  image_url: "test-url",
  abv: "test abv",
  ph: "test ph",
  food_pairing: ["test dish 1", "test dish 2", "test dish 3"],
};

const beerExampleTwo = {
  name: "test name",
  tagline: "test tagline",
  first_brewed: "test date",
  description: "This is a test description with only one sentence.",
  abv: "test abv",
  ph: "test ph",
  food_pairing: ["test dish 1", "test dish 2"],
};

it("should render a beer image with the correct src and alt based on props", () => {
  render(<BeerCard beer={beerExampleOne} />);
  const beerImage = screen.getByRole("img");
  expect(beerImage.src).toContain("test-url");
  expect(beerImage.alt).toBe("test name");
});

it("should not render a beer image if no url is passed down", () => {
  render(<BeerCard beer={beerExampleTwo} />);
  const beerImage = screen.queryByRole("img");
  expect(beerImage).not.toBeInTheDocument();
});

it("should render all the relevant information about the beer", () => {
  render(<BeerCard beer={beerExampleTwo} />);
  const beerName = screen.getByText("test name");
  const beerTagline = screen.getByText("test tagline");
  const beerDetails = screen.getByText("ABV: test abv | pH: test ph");
  const beerDate = screen.getByText("Since: test date");
  const beerDescription = screen.getByText(
    "This is a test description with only one sentence.",
  );
  const beerPairingHeading = screen.getByText("Pair with:");
  const firstPairing = screen.getByText("test dish 1");
  const secondPairing = screen.getByText("test dish 2");
  [
    beerName,
    beerTagline,
    beerDetails,
    beerDate,
    beerDescription,
    beerPairingHeading,
    firstPairing,
    secondPairing,
  ].forEach((element) => expect(element).toBeInTheDocument());
});

it("should render the correct number of food pairing list items", () => {
  render(<BeerCard beer={beerExampleOne} />);
  const beerPairings = screen.getAllByRole("listitem");
  expect(beerPairings.length).toBe(3);
});

it("should render only the first sentece of the description", () => {
  render(<BeerCard beer={beerExampleOne} />);
  const beerDescriptionSecondSentence = screen.queryByText(
    "It has more than one sentence.",
  );
  expect(beerDescriptionSecondSentence).not.toBeInTheDocument();
});
