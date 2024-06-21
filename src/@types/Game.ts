export type SelectedPair = {
  country: string;
  capital: string;
};

export type EntityData = {
  name: string;
  disabled: boolean;
};

export type CountriesCapitals = {
  countries: EntityData[];
  capitals: EntityData[];
};
