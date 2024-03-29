import type { MenuProps } from 'antd';
import type {
  MenuDividerType,
  MenuItemGroupType,
  MenuItemType,
  SubMenuType,
} from 'antd/es/menu/hooks/useItems';
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

export type { ItemType } from 'antd/es/menu/hooks/useItems';

type NoChildrenItemType<T extends MenuItemType = MenuItemType> =
  | T
  | Omit<SubMenuType<T>, 'children'>
  | Omit<MenuItemGroupType<T>, 'children'>
  | MenuDividerType
  | null;

interface MyIndexRouteObject extends IndexRouteObject {
  children?: undefined;
  menu?: undefined;
}

interface MyNonIndexRouteObject extends Omit<NonIndexRouteObject, 'children'> {
  menu?: NoChildrenItemType;
  children?: RouteConfiguration[];
}

export type RouteConfiguration = MyIndexRouteObject | MyNonIndexRouteObject;

export interface LayoutProps {
  items: MenuProps['items'];
}

type SVGURL = string;

export interface SettingObject {
  layoutHeaderHeight?: number;
  siderCollapsedWidth?: number;
  logoText: string;
  logo?: (() => JSX.Element) | SVGURL;
}

export enum ThemeValue {
  dark = 'dark',
  light = 'light',
}
