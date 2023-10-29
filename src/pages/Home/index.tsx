import { Button } from 'antd';
import DTable from '@/components/DTable';

export const Component = () => {
  const handleFetch = ({ current, pageSize }: { current: number; pageSize: number }) => {
    const query = `page=${current}&pageSize=${pageSize}`;
    fetch('/api/test?' + query)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <Button onClick={() => handleFetch({ current: 1, pageSize: 100 })}>click</Button>
      <DTable />
    </div>
  );
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'Home';
}

export default Component;
