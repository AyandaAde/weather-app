"use client";

import { forecastData } from "@/app/forecastData";
import { weatherData } from "@/app/weather";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  weather: weatherData,
  forecastData: forecastData,
  loading: false,
  error: false,
};

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (city, thunkAPI) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;
    try {
      const resp = await axios(url);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getForecastData = createAsyncThunk(
  "weather/getforecastData",
  async (city, thunkAPI) => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;
    try {
      const resp = await axios(forecastURL);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeatherData.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getWeatherData.fulfilled, (state, action) => {
      state.loading = false;
      state.weather = action.payload;
    });
    builder.addCase(getForecastData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getForecastData.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getForecastData.fulfilled, (state, action) => {
      state.loading = false;
      state.forecastData = action.payload;
    });
  },
});

export default weatherSlice.reducer;
