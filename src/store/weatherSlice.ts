import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getUrlByCity, getUrlByGeo } from '../api';
import { getRequest } from '../api';
import type { IOverload } from '../api';

type IData = {
  isFetching: boolean;
  errorMessage: string;
  weather: {
    [key: string]: any;
  };
  forecast: {
    [key: string]: any;
  };
};

type IState = {
  selectedCity: string;
  favoriteCities: string[];
  data: IData;
};

const initialState: IState = {
  selectedCity: 'Aktobe',
  favoriteCities: [],
  data: {
    isFetching: false,
    errorMessage: '',
    weather: {},
    forecast: {},
  },
};

type IFetchData = {
  weather: {
    [key: string]: any;
  };
  forecast: {
    [key: string]: any;
  };
};

type IRequestParams = string | [number, number];

export const fetchWeatherData = createAsyncThunk<IFetchData, IRequestParams>(
  'weather/fetchWeatherData',
  async function (cityOrCoords: IRequestParams) {
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

    return data as IFetchData;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteCities.push(action.payload);
    },

    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteCities = [...state.favoriteCities].filter(
        (city) => city !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.data.isFetching = true;
    });

    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      const data = action.payload;
      const isValid =
        Number(data.weather.cod) === 200 && Number(data.forecast.cod) === 200;

      if (isValid) {
        const cityName = data.weather.name;

        state.selectedCity = cityName;

        state.data = {
          isFetching: false,
          errorMessage: '',
          weather: {
            name: cityName,
            temperature: Math.round(data.weather.main.temp),
            icon: data.weather.weather[0].icon,
            feelsLike: Math.round(data.weather.main.feels_like),
            weather: data.weather.weather[0].main,
            sunrise: data.weather.sys.sunrise,
            sunset: data.weather.sys.sunset,
          },
          forecast: data.forecast,
        };
      } else {
        state.data = {
          isFetching: false,
          errorMessage: data.weather.message ?? data.forecast.message,
          weather: {},
          forecast: {},
        };
      }
    });

    builder.addCase(fetchWeatherData.rejected, (state) => {
      state.data = {
        isFetching: false,
        errorMessage: 'Oops, something went wrong ;(',
        weather: {},
        forecast: {},
      };
    });
  },
});

export const { addFavorite, deleteFavorite } = weatherSlice.actions;

export default weatherSlice.reducer;
