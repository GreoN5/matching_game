import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

import Game from "@/components/Game";

const mockCountries = [
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
];

const mockCapitals = ["Paris", "Berlin"];

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
  }),
}));

const getGameWithData = () => (
  <Game
    shuffledCountries={mockCountries
      .map((item) => item.country)
      .sort(() => 0.5 - Math.random())}
    shuffledCapitals={mockCapitals
      .map((item) => item)
      .sort(() => 0.5 - Math.random())}
    data={mockCountries.map((item) => ({
      name: item.country,
      capital: item.capital,
    }))}
  />
);

describe("Matching Game", () => {
  test("renders the game component", () => {
    const { getByText } = render(getGameWithData());

    expect(getByText("Matching Game")).toBeInTheDocument();
    expect(getByText("Countries")).toBeInTheDocument();
    expect(getByText("Capitals")).toBeInTheDocument();
    expect(getByText("Drag and drop here to match")).toBeInTheDocument();
  });

  test("selects and matches country and capital", () => {
    const { getByText, getByTestId } = render(getGameWithData());

    const franceCountry = getByText("France");
    fireEvent.dragStart(franceCountry);
    fireEvent.dragEnter(getByTestId("dropArea"));
    fireEvent.dragEnd(franceCountry);

    const parisCapital = getByText("Paris");
    fireEvent.dragStart(parisCapital);
    fireEvent.dragEnter(getByTestId("dropArea"));
    fireEvent.dragEnd(parisCapital);

    expect(getByText("France")).toBeInTheDocument();
    expect(getByText("Paris")).toBeInTheDocument();
  });

  test("does not match incorrect country and capital", () => {
    const { getByText, getByTestId } = render(getGameWithData());

    const franceCountry = getByText("France");
    fireEvent.dragStart(franceCountry);
    fireEvent.dragEnter(getByTestId("dropArea"));
    fireEvent.dragEnd(franceCountry);

    const berlinCapital = getByText("Berlin");
    fireEvent.dragStart(berlinCapital);
    fireEvent.dragEnter(getByTestId("dropArea"));
    fireEvent.dragEnd(berlinCapital);

    expect(getByTestId("dropArea")).not.toContainElement(franceCountry);
    expect(getByTestId("dropArea")).not.toContainElement(berlinCapital);
  });

  test("disables selected country and capital after match", async () => {
    const { getByTestId } = render(getGameWithData());

    const franceCountry = getByTestId("France");
    fireEvent.dragStart(franceCountry);
    fireEvent.dragEnter(getByTestId("dropArea"));
    fireEvent.dragEnd(franceCountry);

    const parisCapital = getByTestId("Paris");
    fireEvent.dragStart(parisCapital);
    fireEvent.dragEnter(getByTestId("dropArea"));
    fireEvent.dragEnd(parisCapital);

    expect(franceCountry).toHaveAttribute("draggable", "false");
    expect(parisCapital).toHaveAttribute("draggable", "false");
  });
});
