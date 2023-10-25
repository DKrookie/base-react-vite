export const Component = () => {
  return <div>Home</div>;
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'Home';
}

export default Component;
