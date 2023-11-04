import { Suspense, useState } from 'react';
import { JellyTriangle } from '@uiball/loaders';
import { ConfigProvider, App as AntdApp, theme as AntdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'dayjs/locale/zh-cn';
import lightTheme from '@/assets/theme/theme.light.json';
import { routeObject } from '@/routes';
import { ThemeValue } from './types';
import ThemeContext from '@/context/ThemeContext';
import './assets/style/base.css';

dayjs.locale('zh-cn');

const router = createBrowserRouter(routeObject);

function App() {
  const [theme, setTheme] = useState(ThemeValue.light);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          ...lightTheme,
          algorithm:
            theme === ThemeValue.light ? AntdTheme.defaultAlgorithm : AntdTheme.darkAlgorithm,
        }}
      >
        <AntdApp>
          <Suspense fallback={<JellyTriangle size={60} speed={1.75} color="black" />}>
            <RouterProvider router={router} />
          </Suspense>
        </AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export default App;
