import * as React from 'react';
import axios from 'axios';
import OrganizerRoute from '@/components/OrganizerRoute';

interface ICreateEventProps {}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = (props) => {
  const setEvent = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/`);
    } catch (error) {}
  };
  return <OrganizerRoute><div></div></OrganizerRoute>;
};

export default CreateEvent;
