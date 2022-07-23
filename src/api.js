export const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

export const serverUrl = 'https://api.openweathermap.org/data/2.5/';

export const getUrlByCity = (type, city) =>
  `${serverUrl}${type}?q=${city}&appid=${apiKey}&units=metric`;

export const getUrlByGeo = (type, lat, lon) =>
  `${serverUrl}${type}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

export const getIconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@4x.png`;

export const getForecastIconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}.png`;

export const getRequest = async ({ city, isGeo, lat, lon }) => {
  let urlWeather;
  let urlForecast;

  if (isGeo) {
    urlWeather = getUrlByGeo('weather', lat, lon);
    urlForecast = getUrlByGeo('forecast', lat, lon);
  } else {
    urlWeather = getUrlByCity('weather', city);
    urlForecast = getUrlByCity('forecast', city);
  }

  const responseWeather = await fetch(urlWeather);
  const responseForecast = await fetch(urlForecast);

  const data = {
    weather: await responseWeather.json(),
    forecast: await responseForecast.json(),
  };

  return data;
};
