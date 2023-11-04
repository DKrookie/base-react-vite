import Mock from 'better-mock';
import { defineMock } from 'vite-plugin-mock-dev-server';

const total = 5401;

export default defineMock({
  url: '/api/test',
  body: ({ query }) => {
    const start = query.pageSize * (query.page - 1);
    const tail = query.pageSize * query.page;
    const end = tail - total >= 0 ? total : tail;

    const res = {
      total,
      size: end - start,
      current: Number(query.page),
      list: [],
    };

    const data = Mock.mock({
      [`list|${end - start}`]: [
        {
          'id|+1': start,
          name: () => Mock.Random.name(),
          age: () => Mock.Random.natural(18, 35),
        },
      ],
    });
    if (Array.isArray(data.list)) res.list = data.list;
    else res.list = res.list.concat(data.list);
    return res;
  },
});
