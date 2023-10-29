import Mock from 'mockjs';
import { defineMock } from 'vite-plugin-mock-dev-server';

const total = 5380;

export default defineMock({
  url: '/api/test',
  body: ({ query }) => {
    const start = query.pageSize * (query.page - 1);
    const tail = query.pageSize * query.page;
    const end = tail - total >= 0 ? total : tail;

    const data = Mock.mock({
      total,
      current: query.page,
      size: end - start,
      [`list|${end - start}`]: [
        {
          'id|+1': start,
          name: () => Mock.Random.name(),
          age: () => Mock.Random.natural(18, 35),
        },
      ],
    });
    return data;
  },
});
