import * as React from 'react';
import axios from 'axios';

interface ICreateEventProps {}

const CreateEvent: React.FunctionComponent<ICreateEventProps> = (props) => {
  const setEvent = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/`);
    } catch (error) {}
  };
  return <div></div>;
};

export default CreateEvent;
