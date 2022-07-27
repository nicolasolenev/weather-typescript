import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';

import { Request, IRequstData } from '../api';

type IWeatherState = {
  isFetching: boolean;
  isReady: boolean;
  isError: boolean;
  errorMessage: string | null;
  data: {
    [key: string]: any;
  };
};

type IState = {
  selectedCity: string;
  favoriteCities: string[];
  weather: IWeatherState;
  forecast: IWeatherState;
};

const initialState: IState = {
  selectedCity: 'Aktobe',
  favoriteCities: [],
  weather: {
    isFetching: false,
    isReady: false,
    isError: false,
    errorMessage: null,
    data: {},
  },
  forecast: {
    isFetching: false,
    isReady: false,
    isError: false,
    errorMessage: null,
    data: {},
  },
};

export const fetchWeatherData = createAsyncThunk<IRequstData, string>(
  'weather/fetchWeatherData',
  Request
);

export const fetchForecastData = createAsyncThunk<IRequstData, string>(
  'weather/fetchForecastData',
  Request
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
      state.weather.isFetching = true;
      state.weather.isReady = false;
      state.weather.isError = false;
      state.weather.errorMessage = null;
    });

    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      const data = action.payload;
      const isValid = Number(data.cod) === 200;

      state.weather.isFetching = false;

      if (isValid) {
        state.selectedCity = data.name;
        state.weather.data = data;
        state.weather.isReady = true;
      } else {
        state.weather.isError = true;
        state.weather.errorMessage = data.message;
      }
    });

    // builder.addCase(fetchWeatherData.rejected, (state) => {
    //   state.weather.isFetching = false;
    //   state.weather.isError = true;
    //   state.weather.errorMessage = 'Oops, something went wrong ;(';
    // });

    builder.addCase(fetchForecastData.pending, (state) => {
      state.forecast.isFetching = true;
      state.forecast.isReady = false;
      state.forecast.isError = false;
      state.forecast.errorMessage = null;
    });

    builder.addCase(fetchForecastData.fulfilled, (state, action) => {
      const data = action.payload;
      const isValid = Number(data.cod) === 200;

      state.forecast.isFetching = false;

      if (isValid) {
        state.forecast.data = data;
        state.forecast.isReady = true;
      } else {
        state.forecast.isError = true;
        state.forecast.errorMessage = data.message;
      }
    });

    // builder.addCase(fetchForecastData.rejected, (state) => {
    //   state.forecast.isFetching = false;
    //   state.forecast.isError = true;
    //   state.forecast.errorMessage = 'Oops, something went wrong ;(';
    // });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      const key = action.type.includes('WeatherData') ? 'weather' : 'forecast';

      state[key].isFetching = false;
      state[key].isError = true;
      state[key].errorMessage = 'Server Error';
    });
  },
});

export const { addFavorite, deleteFavorite } = weatherSlice.actions;

export default weatherSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
