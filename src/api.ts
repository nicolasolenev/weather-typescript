const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

const DOMAIN = {
  MAIN: 'https://openweathermap.org/',
  API: 'https://api.openweathermap.org/',
};

export const API_TYPE = {
  WEATHER: 'weather',
  FORECAST: 'forecast',
};

type IGetUrlByCity = (type: string, city: string) => string;
export const getUrlByCity: IGetUrlByCity = (type, city) =>
  `${DOMAIN.API}data/2.5/${type}?q=${city}&appid=${API_KEY}&units=metric`;

type IGetUrlByGeo = (type: string, lat: number, lon: number) => string;
export const getUrlByGeo: IGetUrlByGeo = (type, lat, lon) =>
  `${DOMAIN.API}data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

interface IGetIconUrlParam {
  iconId: string;
  isForecast?: boolean;
}

type IGetUrlsByGeo = (
  lat: number,
  lon: number
) => { weather: string; forecast: string };
export const getUrlsByGeo: IGetUrlsByGeo = (lat: number, lon: number) => {
  return {
    weather: getUrlByGeo(API_TYPE.WEATHER, lat, lon),
    forecast: getUrlByGeo(API_TYPE.FORECAST, lat, lon),
  };
};

type IGetIconUrl = ({ iconId, isForecast }: IGetIconUrlParam) => string;

export const getIconUrl: IGetIconUrl = ({ iconId, isForecast }) => {
  if (isForecast) {
    return `${DOMAIN.MAIN}img/wn/${iconId}.png`;
  }

  return `${DOMAIN.MAIN}/img/wn/${iconId}@4x.png`;
};

export type IRequstData = {
  cod: number | string;
  [key: string]: any;
};
export const Request = async (url: string): Promise<IRequstData> => {
  const response = await fetch(url);
  const data = await response.json();

  return data as IRequstData;
};
