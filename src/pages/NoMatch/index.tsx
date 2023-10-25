import { Link } from 'react-router-dom';

export const Component = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'NoMatch';
}

export default Component;
