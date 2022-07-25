import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRequest } from '../api';

const initialState = {
  selectedCity: 'Aktobe',
  favoriteCities: [],
  data: {
    isFetching: false,
    errorMessage: '',
    weather: {},
    forecast: {},
  },
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  getRequest
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoriteCities.push(action.payload.city);
    },

    deleteFavorite: (state, action) => {
      state.favoriteCities = [...state.favoriteCities].filter(
        (city) => city !== action.payload.city
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
