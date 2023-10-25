export const Component = () => {
  return <div>View2</div>;
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'View2';
}

export default Component;
