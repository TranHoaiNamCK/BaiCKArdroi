import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://65419d75f0b8287df1fe8b4a.mockapi.io/todo';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addJob = createAsyncThunk('jobs/addJob', async (newJob) => {
  const response = await axios.post(apiUrl, newJob);
  return response.data;
});

export const removeJob = createAsyncThunk('jobs/removeJob', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

export const editJob = createAsyncThunk('jobs/editJob', async ({ id, updatedJob }) => {
  const response = await axios.put(`${apiUrl}/${id}`, updatedJob);
  return response.data;
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })
      .addCase(editJob.fulfilled, (state, action) => {
        const { id, updatedJob } = action.payload;
        const existingJob = state.jobs.find((job) => job.id === id);
        if (existingJob) {
          existingJob.todojob = updatedJob.todojob;
        }
      });
  },
});

export default jobSlice.reducer;
