import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLoaderData, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SuspenseOutlet from '@/components/SuspenseOutlet';
import setting from '@/config/setting';
import type { ItemType, SettingObject } from '@/types';

const Logo = setting.logo;

const LogoWrapper = styled.div`
  width: 200px;
  height: 100%;
`;

const Header = styled(Layout.Header)<{ $setting: SettingObject }>`
  display: flex;
  background: ${({ theme }) => theme.colorBgContainer};
  position: relative;
  z-index: 100;
  height: ${({ $setting }) => ($setting.layoutHeaderHeight ?? 64).toString()}px;
  box-shadow:
    0 0.3px 0.8px rgba(0, 0, 0, 0.02),
    0 0.7px 2px rgba(0, 0, 0, 0.028),
    0 1.3px 3.8px rgba(0, 0, 0, 0.035),
    0 2.2px 6.7px rgba(0, 0, 0, 0.042);
  padding-inline: 0;
`;

const Content = styled(Layout.Content)<{ $setting: SettingObject }>`
  color: ${({ theme }) => theme.colorText};
  overflow: auto;
  padding: ${({ theme }) => theme.paddingXS}px;
  height: calc(100vh - ${({ $setting }) => ($setting.layoutHeaderHeight ?? 64).toString()}px);
`;

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

  useEffect(() => {
    const title = findTitle(items, location.pathname);
    document.title = [setting.logoText, ...title].join('·');
    setSelectedKeys([location.pathname]);
  }, [location]);

  return (
    <Layout style={{ width: '100vw' }}>
      <Header $setting={setting}>
        <LogoWrapper>{Logo ? <Logo /> : null}</LogoWrapper>
        <Menu
          items={items}
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ border: 'none', flex: 1 }}
        />
      </Header>
      <Layout>
        <Content $setting={setting}>
          <SuspenseOutlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Component;
