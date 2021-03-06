import * as React from 'react';
import Card from './Card';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div>
      <Card info="danger">
        <h4>{message}</h4>
        <h2>
          <span role="img" aria-label="error">
            🙅‍♂️
          </span>
        </h2>
      </Card>
    </div>
  );
};

export default Error;
