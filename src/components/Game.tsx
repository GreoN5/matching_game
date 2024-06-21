"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CountryCapitalDto } from "@/@types/Country";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";
import DropArea from "@/components/DropArea";
import PickableData from "@/components/PickableData";
import { CountriesCapitals, SelectedPair } from "@/@types/Game";

type Props = {
  shuffledCountries?: string[];
  shuffledCapitals?: string[];
  data?: CountryCapitalDto[];
};

const Game = ({
  shuffledCountries,
  shuffledCapitals,
  data,
}: Props): JSX.Element => {
  const [countriesCapitals, setCountriesCapitals] = useState<CountriesCapitals>(
    {
      capitals:
        shuffledCapitals?.map((country) => ({
          name: country,
          disabled: false,
        })) ?? [],
      countries:
        shuffledCountries?.map((capital) => ({
          name: capital,
          disabled: false,
        })) ?? [],
    },
  );
  const [selectedPair, setSelectedPair] = useState<SelectedPair>({
    capital: "",
    country: "",
  });
  const [score, setScore] = useState(30);
  const [matchedPairs, setMatchedPairs] = useState<CountryCapitalDto[]>([]);
  const router = useRouter();

  const adjustSelectedEntity = (source: DraggableLocation) => {
    if (source.droppableId === "countries") {
      const country = countriesCapitals.countries[source.index].name;
      setSelectedPair((prevState) => ({
        ...prevState,
        country,
      }));
    }

    if (source.droppableId === "capitals") {
      const capital = countriesCapitals.capitals[source.index].name;
      setSelectedPair((prevState) => ({
        ...prevState,
        capital,
      }));
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    if (!destination?.droppableId || destination.droppableId !== "dropArea") {
      return;
    }

    adjustSelectedEntity(source);
  };

  const calculateScoreInCaseOfNoMatch = () => {
    if (score >= 5) {
      setScore((prevState) => prevState - 5);
    } else {
      setScore((prevState) => prevState - prevState);
    }
  };

  const disableAlreadyGuessedData = () => {
    setCountriesCapitals((prevState) => ({
      ...prevState,
      countries: countriesCapitals.countries.map((country) =>
        country.name === selectedPair.country
          ? { ...country, disabled: true }
          : country,
      ),
    }));
    setCountriesCapitals((prevState) => ({
      ...prevState,
      capitals: countriesCapitals.capitals.map((capital) =>
        capital.name === selectedPair.capital
          ? { ...capital, disabled: true }
          : capital,
      ),
    }));
  };

  useMemo(() => {
    if (!selectedPair.country || !selectedPair.capital) {
      return;
    }

    const match = data?.find(
      (item) =>
        item.name === selectedPair.country &&
        item.capital === selectedPair.capital,
    );

    if (match) {
      setScore((prevState) => prevState + 7);
      setMatchedPairs((prevState) => [
        ...prevState,
        { name: selectedPair.country, capital: selectedPair.capital },
      ]);

      disableAlreadyGuessedData();
    } else {
      calculateScoreInCaseOfNoMatch();
    }

    setSelectedPair({
      capital: "",
      country: "",
    });
  }, [selectedPair.country, selectedPair.capital]);

  useEffect(() => {
    if (matchedPairs.length === data?.length) {
      router.push(`/result?score=${score}`);
    }
  }, [matchedPairs.length]);

  return (
    <div className="flex flex-col items-center justify-center p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Matching Game</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap justify-center gap-8 mb-4 w-full max-w-4xl">
          <PickableData data={countriesCapitals.countries} type="countries" />
          <PickableData data={countriesCapitals.capitals} type="capitals" />
        </div>
        <DropArea selectedPair={selectedPair} />
        <div className="text-xl font-semibold mt-4">Score: {score}</div>
      </DragDropContext>
    </div>
  );
};

export default Game;
