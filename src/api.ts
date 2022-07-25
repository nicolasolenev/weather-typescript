const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const serverUrl = 'https://api.openweathermap.org/';
const iconUrl = 'https://openweathermap.org/';

type IgetUrlByCity = (type: string, city: string) => string;
export const getUrlByCity: IgetUrlByCity = (type, city) =>
  `${serverUrl}data/2.5/${type}?q=${city}&appid=${apiKey}&units=metric`;

type IgetUrlByGeo = (type: string, lat: number, lon: number) => string;
export const getUrlByGeo: IgetUrlByGeo = (type, lat, lon) =>
  `${serverUrl}data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

interface IgetIconUrlParam {
  iconId: string;
  forecast?: boolean;
}

type IgetIconUrl = ({ iconId, forecast }: IgetIconUrlParam) => string;

export const getIconUrl: IgetIconUrl = ({ iconId, forecast }) => {
  if (forecast) {
    return `${iconUrl}img/wn/${iconId}.png`;
  }

  return `${iconUrl}/img/wn/${iconId}@4x.png`;
};

type IData = {
  weather: {
    [key: string]: any;
  };
  forecast: {
    [key: string]: any;
  };
};

type Icortage = [number, number];

type IOverload = {
  (param: string): Promise<IData>;
  (param: Icortage): Promise<IData>;
};

export const getRequest: IOverload = async (
  cityOrCoords: string | Icortage
) => {
  let urlWeather = '';
  let urlForecast = '';

  if (typeof cityOrCoords === 'string') {
    const city = cityOrCoords;

    urlWeather = getUrlByCity('weather', city);
    urlForecast = getUrlByCity('forecast', city);
  } else if (typeof cityOrCoords === 'object') {
    const [lat, lon] = cityOrCoords;

    urlWeather = getUrlByGeo('weather', lat, lon);
    urlForecast = getUrlByGeo('forecast', lat, lon);
  }

  const responseWeather = await fetch(urlWeather);
  const responseForecast = await fetch(urlForecast);

  const data = {
    weather: await responseWeather.json(),
    forecast: await responseForecast.json(),
  };

  return data;
};
