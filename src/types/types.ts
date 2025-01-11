export interface Country {
  code: string;
  name: string;
   capital: string;
  continent: {
    name: string;
  };
 
  languages: {
    name: string;
  }[];
}

export interface CountriesData {
  data: any;
  countries: Country[];
}

export interface ContinentData {
  name: string;
  value: number;
}

export interface LanguageData {
  name: string;
  count: number;
}

export interface Language {
  name: string;
}

export interface Continent {
  name: string;
}

export interface CountryData {
  countries: Country[];
}

export interface Filters {
  country: string;
  language: string;
  continent: string;
}
