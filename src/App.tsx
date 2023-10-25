import { Suspense } from 'react';
import { JellyTriangle } from '@uiball/loaders';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'dayjs/locale/zh-cn';
import lightTheme from '@/assets/theme/theme.light.json';
import { routeObject } from '@/routes';
import './assets/style/base.css';

dayjs.locale('zh-cn');

const { useToken } = theme;

const router = createBrowserRouter(routeObject);

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{ ...lightTheme, algorithm: theme.defaultAlgorithm }}>
      <AntdApp>
        <ThemeWrapper />
      </AntdApp>
    </ConfigProvider>
  );
}

function ThemeWrapper() {
  const { token } = useToken();

  return (
    <ThemeProvider theme={token}>
      <Suspense fallback={<JellyTriangle size={60} speed={1.75} color="black" />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
