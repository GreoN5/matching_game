import Game from "@/components/Game";
import { CountryCapitalDto } from "@/@types/Country";

async function getCountryCapitalData(): Promise<
  CountryCapitalDto[] | undefined
> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    const data = await response.json();

    return data as CountryCapitalDto[];
  } catch (error) {
    console.error(error);
    throw new Error("Error getting country data.");
  }
}

export default async function Home() {
  const data = await getCountryCapitalData();

  const countries = data
    ?.map((item) => item.name)
    .sort(() => 0.5 - Math.random());
  const capitals = data
    ?.map((item) => item.capital)
    .sort(() => 0.5 - Math.random());

  return (
    <Game
      data={data}
      shuffledCapitals={capitals}
      shuffledCountries={countries}
    />
  );
}
