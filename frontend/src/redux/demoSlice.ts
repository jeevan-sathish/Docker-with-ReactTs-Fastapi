import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ApiData {
  message: string;
  loading: boolean;
  error: string | null;
}
const initialState: ApiData = {
  message: "",
  loading: false,
  error: null,
};

interface Data {
  name: string;
  age: number;
}
export const demoapi = createAsyncThunk<string, Data, { rejectValue: string }>(
  "demo/api",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/user", userData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ?? "something wnet wront",
      );
    }
  },
);

export const demoSlice = createSlice({
  name: "demoapi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(demoapi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(demoapi.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
      })
      .addCase(demoapi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "something went wrong";
      });
  },
});

export default demoSlice.reducer;
