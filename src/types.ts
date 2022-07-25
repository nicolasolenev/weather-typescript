// export interface IWeather {
//   name: string;
//   temperature: number;
//   icon: string;
//   feelsLike: number;
//   weather: string;
//   sunrise: number;
//   sunset: number;
// }

export interface IData {
  isFetching: boolean;
  errorMessage: string;
  // weather: IWeather;
  weather: {
    [key: string]: any;
  };
  forecast: {
    [key: string]: any;
  };
}

export interface IState {
  selectedCity: any;
  favoriteCities: string[];
  data: IData;
}

export interface ICoords {
  longitude: number;
  latitude: number;
}

export interface IGeoData {
  coords: ICoords;
  [key: string]: any;
}

export type getUrlFunction = (obj: {
  type: string;
  city?: string;
  lat?: number;
  lon?: number;
}) => string;

export type getIconUrlFunction = (iconId: string) => string;

interface IRequestArg {
  city?: string;
  isGeo?: boolean;
  lat?: number;
  lon?: number;
}

// export type getRequestFunction = (obj: IRequestArg) => Promise<{
//   weather: {
//     [key: string]: number | string | boolean;
//   };
//   forecast: {
//     [key: string]: number | string | boolean;
//   };
// }>;

export type getRequestFunction = (obj: IRequestArg) => any;
