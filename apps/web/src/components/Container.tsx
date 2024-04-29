import * as React from 'react';

interface IContainerProps {
  children?: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = (props) => {
  const { children } = props;

  return <div className="max-w-[1920px] mx-auto">{children}</div>;
};

export default Container;
