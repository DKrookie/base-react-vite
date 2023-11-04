import Scene from './components/Scene';
export const Component = () => {
  return (
    <div>
      <Scene />
    </div>
  );
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'View2';
}

export default Component;
