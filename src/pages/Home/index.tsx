import { Button } from 'antd';
import DTable from '@/components/DTable';
import { ColumnsType } from 'antd/es/table';
import { useRef, useState } from 'react';

interface DataType {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'age',
    dataIndex: 'age',
  },
];

export const Component = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [pageInfo, setPageInfo] = useState<{ current: number; pageSize: number; total: number }>({
    pageSize: 100,
    current: 1,
    total: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  const handleFetch = ({ current, pageSize }: { current: number; pageSize: number }) => {
    const query = `page=${current}&pageSize=${pageSize}`;
    fetch('/api/test?' + query)
      .then((res) => res.json())
      .then((res: { current: number; list: DataType[]; size: number; total: number }) => {
        setData(res.list);
        setPageInfo((prev) => ({
          ...prev,
          current: res.current,
          total: res.total,
        }));
      });
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    handleFetch({ current: page, pageSize });
  };

  return (
    <div>
      <Button onClick={() => handleFetch({ current: 1, pageSize: 100 })}>click</Button>
      <DTable<DataType>
        ref={ref}
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          hideOnSinglePage: true,
          pageSizeOptions: [20, 50, 100],
          ...pageInfo,
          onChange: handlePaginationChange,
        }}
        scroll={{ y: '82vh' }}
      />
    </div>
  );
};

if (import.meta.env.MODE === 'development') {
  Component.displayName = 'Home';
}

export default Component;
