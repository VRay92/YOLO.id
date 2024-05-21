import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Event {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  availableSeats: number;
  isFree: boolean;
  organizerId: number;
  location: string;
  cityId: number;
  createdAt: string;
  updatedAt: string;
  maxTicket: number;
  organizer: {
    id: number;
    username: string;
    imageProfile: string;
  };
  city: {
    id: number;
    name: string;
  };
  ticketTypes: {
    ticketTypeId: number;
    price: number;
    quantity: number;
    ticketType: {
      id: number;
      name: string;
    };
  }[];
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

export const fetchEventDetail = (id: string) => async (dispatch: any) => {
  try {
    dispatch(getEventsStart());
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}event/${id}`,
    );
    const event = response.data.data;
    dispatch(getEventsSuccess([event]));
  } catch (error: any) {
    dispatch(getEventsFailure(error.message));
  }
};

export const fetchEvents = () => async (dispatch: any) => {
  try {
    dispatch(getEventsStart());
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const events = response.data.data;
    dispatch(getEventsSuccess(events));
  } catch (error: any) {
    dispatch(getEventsFailure(error.message));
  }
};

export default eventSlice.reducer;
