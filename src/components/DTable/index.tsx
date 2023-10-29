import { useLayoutEffect, useRef, useState } from 'react';
import { Pagination, Table, theme } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';

interface DTableProps<T> extends TableProps<T> {}

const { useToken } = theme;

const DTable = <T extends AnyObject>(props: DTableProps<T>): React.ReactElement => {
  const { scroll, pagination } = props;

  const tableRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [subPx, setSubPx] = useState(0);

  const { token } = useToken();

  useLayoutEffect(() => {
    const tableRect = tableRef.current!.querySelector('.ant-table-body')?.getBoundingClientRect();
    const paginationRect = paginationRef.current!.getBoundingClientRect();
    if (tableRect) {
      setSubPx(tableRect.top + paginationRect.height + token.paddingXS);
    }
  }, [token.padding]);

  const paginationRender = (pagination?: false | TablePaginationConfig) => {
    if (!pagination) {
      return <></>;
    } else if (
      (pagination.hideOnSinglePage && pagination.total === 0) ||
      (pagination.hideOnSinglePage &&
        Math.ceil((pagination.total ?? 1) / (pagination.pageSize ?? 1)) === 1)
    ) {
      return (
        <Pagination
          {...pagination}
          hideOnSinglePage={false}
          style={{ visibility: 'hidden', margin: token.margin + 'px' }}
        />
      );
    }

    return <Pagination {...pagination} style={{ margin: token.margin + 'px' }} />;
  };

  return (
    <div>
      <Table<T>
        ref={tableRef}
        {...props}
        scroll={{ y: `calc(100vh - ${subPx}px)`, ...scroll }}
        pagination={false}
      />
      <div ref={paginationRef} style={{ display: 'flex', justifyContent: 'end' }}>
        {paginationRender(pagination)}
      </div>
    </div>
  );
};

export default DTable;
