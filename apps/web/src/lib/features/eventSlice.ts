import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  startDate: string;
  isFree: boolean;
  averageRating: number;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEventsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getEventsSuccess(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
      state.loading = false;
    },
    getEventsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getEventsStart, getEventsSuccess, getEventsFailure } =
  eventSlice.actions;

export const fetchEvents = (token: string) => async (dispatch: any) => {
  try {
    dispatch(getEventsStart());

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/${token}/events`,
    );
    const events = response.data.data;

    dispatch(getEventsSuccess(events));
  } catch (error: any) {
    dispatch(getEventsFailure(error.message));
  }
};

export default eventSlice.reducer;
