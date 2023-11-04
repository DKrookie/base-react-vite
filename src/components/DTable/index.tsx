import { forwardRef } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';

interface DTableProps<T extends AnyObject = AnyObject> extends TableProps<T> {}

const DTable = <T extends AnyObject>(props: DTableProps<T>, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div>
      <Table {...props} ref={ref} />
    </div>
  );
};

export default forwardRef(DTable) as unknown as <T extends AnyObject>(
  props: DTableProps<T> & { ref: React.Ref<HTMLDivElement> },
) => React.ReactElement;
