export type CountryType = {
  dialCode: string;
  id: number;
  name: string;
  isoCode: string;
  flagEmoji: string;
  flagSvg: string;
};

export type CountryListType = Array<CountryType>;
