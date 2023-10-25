import SuspenseOutlet from '@/components/SuspenseOutlet';

export const Component = () => {
  return (
    <div>
      view1
      <SuspenseOutlet context={{ className: 'hello' }} />
    </div>
  );
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'View1';
}

export default Component;
