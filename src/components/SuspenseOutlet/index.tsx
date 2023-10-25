import { Suspense } from 'react';
import { JellyTriangle } from '@uiball/loaders';
import { Outlet } from 'react-router-dom';
import type { OutletProps } from 'react-router-dom';

const SuspenseOutlet: React.FC<OutletProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <JellyTriangle size={60} speed={1.75} color="black" />
        </div>
      }
    >
      <Outlet {...props} />
    </Suspense>
  );
};
export default SuspenseOutlet;
