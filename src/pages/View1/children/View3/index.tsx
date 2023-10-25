import { useOutletContext } from 'react-router-dom';

export const Component = () => {
  const { className } = useOutletContext<{ className: string }>();

  return <div className={className}>View3</div>;
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'View3';
}

export default Component;
