import { ReactNode, FunctionComponent } from 'react';

interface ContainerProps {
  children?: ReactNode;
}

const Container: FunctionComponent = ({ children }: ContainerProps) => {
  return <div className="container px-5">{children}</div>;
};

export default Container;
