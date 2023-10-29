import { Suspense } from 'react';
import { JellyTriangle } from '@uiball/loaders';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'dayjs/locale/zh-cn';
import lightTheme from '@/assets/theme/theme.light.json';
import { routeObject } from '@/routes';
import './assets/style/base.css';

dayjs.locale('zh-cn');

const router = createBrowserRouter(routeObject);

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{ ...lightTheme, algorithm: theme.darkAlgorithm }}>
      <AntdApp>
        <ThemeWrapper />
      </AntdApp>
    </ConfigProvider>
  );
}

function ThemeWrapper() {
  return (
    <Suspense fallback={<JellyTriangle size={60} speed={1.75} color="black" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
