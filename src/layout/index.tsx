import { useEffect, useState } from 'react';
import { Layout, Menu, Segmented } from 'antd';
import { useLoaderData, useLocation } from 'react-router-dom';
import SuspenseOutlet from '@/components/SuspenseOutlet';
import setting from '@/config/setting';
import Moon from '@/assets/img/moon-fill.svg?react';
import Sun from '@/assets/img/sun-fill.svg?react';
import useStyles from './useStyles';
import type { ItemType } from '@/types';

const Logo = setting.logo;

const { Header, Content } = Layout;

function findTitle(items: ItemType[], pathname: string): string[] {
  for (const item of items) {
    const { key, children, title } = item as any;
    if (pathname === key) {
      return [title as string];
    }
    if (children) {
      const subTitle = findTitle(children, pathname);
      if (subTitle.length) {
        return [title as string, ...subTitle];
      }
    }
  }
  return [];
}

export const loader = async () => {
  const { menuItems } = await import('@/routes');
  return menuItems;
};

export const Component = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const items = useLoaderData() as ItemType[];
  const location = useLocation();

  const { styles } = useStyles(setting);

  useEffect(() => {
    const title = findTitle(items, location.pathname);
    document.title = [setting.logoText, ...title].join('·');
    setSelectedKeys([location.pathname]);
  }, [location]);

  console.log(styles);

  return (
    <Layout style={{ width: '100vw' }}>
      <Header className={styles.header}>
        <div className={styles.logoWrapper}>{Logo ? <Logo /> : null}</div>
        <Menu
          items={items}
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ border: 'none', flex: 1 }}
        />
        <Segmented
          block
          options={[
            {
              value: 'dark',
              icon: <Moon />,
            },
            {
              value: 'light',
              icon: <Sun />,
            },
          ]}
        />
      </Header>
      <Layout>
        <Content className={styles.content}>
          <SuspenseOutlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Component;
