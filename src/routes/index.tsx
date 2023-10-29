import {
  ClusterOutlined,
  CommentOutlined,
  DownOutlined,
  GlobalOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Navigate, RouteObject, Link } from 'react-router-dom';
import type { ItemType, RouteConfiguration } from '@/types';

const routesConfiguration: RouteConfiguration[] = [
  {
    path: '/',
    lazy: () => import('@/layout'),
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        lazy: () => import('@/pages/Home'),
        menu: {
          key: 'home',
          label: '首页',
          icon: <HomeOutlined />,
        },
      },
      {
        path: 'view1',
        lazy: () => import('@/pages/View1'),
        menu: { key: 'view1', label: '视图1', icon: <ClusterOutlined /> },
        children: [
          {
            index: true,
            element: <Navigate to="/view1/view3" />,
          },
          {
            path: 'view3',
            lazy: () => import('@/pages/View1/children/View3'),
            menu: { key: 'view3', label: '视图3', icon: <CommentOutlined /> },
          },
        ],
      },
      {
        path: 'view2',
        lazy: () => import('@/pages/View2'),
        menu: {
          key: 'view2',
          label: '视图2',
          icon: <GlobalOutlined />,
        },
      },
      {
        path: '*',
        lazy: () => import('@/pages/NoMatch'),
      },
    ],
  },
];

const getRouteObjectFromRoutesConfiguration = (rcs: RouteConfiguration[]): RouteObject[] => {
  return rcs?.map((rc) => {
    const { menu: _, children, ...rest } = rc;
    if (!children) {
      return rest;
    }
    // In order to comply with the return type, a paragraph needs to be written so that typescript can correctly identify it.
    // In fact, index can not be false here
    // Becasue if index is true that children must be undefined. see RouteConfiguration definition
    if (rest.index === true) {
      return { ...rest };
    } else {
      return { ...rest, children: getRouteObjectFromRoutesConfiguration(children) };
    }
  });
};

const getUrl = (url: string[]): string => {
  return url
    .filter((t) => t)
    .reduce((prev, current) => {
      if (prev.endsWith('/')) {
        return prev + current;
      } else {
        return prev + '/' + current;
      }
    });
};

const getMenuSettingFromRoutesConfiguration = (
  rcs: RouteConfiguration[],
  link: string[] = [],
): ItemType[] => {
  let item: ItemType[] = [];
  rcs.forEach((rc) => {
    const { menu, children, path } = rc;
    const url = link.concat(path ?? '');
    if (children) {
      const i = getMenuSettingFromRoutesConfiguration(children, url);
      if (menu) {
        // @ts-ignore ItemType not easy to handle, ant-design official also uses any handle it
        // see https://github.com/ant-design/ant-design/blob/fb0297f7bf48bcfbe0f83beca6f5222c5f8bd2e5/components/menu/hooks/useItems.tsx#L48
        item = item.concat({ ...menu, key: getUrl(url), children: i });
      } else {
        item = item.concat(...i);
      }
    } else if (menu) {
      item = item.concat({ ...menu, key: getUrl(url) });
    }
  });
  return item;
};

// ItemType not easy to handle, ant-design official also uses any handle it
// see https://github.com/ant-design/ant-design/blob/fb0297f7bf48bcfbe0f83beca6f5222c5f8bd2e5/components/menu/hooks/useItems.tsx#L48
const getMenuItems = (menuSetting: ItemType[]): ItemType[] => {
  return menuSetting.map((ms) => {
    const { children, label, key } = ms as any;
    let menuNode: React.ReactNode;
    if (children) {
      menuNode = (
        <Link to={key as string} style={{ color: 'inherit' }}>
          {label}
          <DownOutlined style={{ marginLeft: '5px' }} />
        </Link>
      );
      const c = getMenuItems(children as ItemType[]);
      return { ...ms, label: menuNode, key: key, title: label, children: c };
    } else {
      menuNode = (
        <Link to={key} style={{ color: 'inherit' }}>
          {label}
        </Link>
      );
      return { ...ms, label: menuNode, key: key, title: label };
    }
  });
};

export const routeObject = getRouteObjectFromRoutesConfiguration(routesConfiguration);
const menuSetting = getMenuSettingFromRoutesConfiguration(routesConfiguration);
export const menuItems = getMenuItems(menuSetting);
