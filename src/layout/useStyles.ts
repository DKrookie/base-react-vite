import { createStyles } from 'antd-style';
import { SettingObject } from '../types';

const useStyles = createStyles(({ token, css }, props: SettingObject) => ({
  logoWrapper: css`
    width: 200px;
    height: 100%;
  `,
  header: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${token.colorBgContainer};
    position: relative;
    z-index: 100;
    height: ${props.layoutHeaderHeight ?? 64}px;
    box-shadow:
      0 0.3px 0.8px rgba(0, 0, 0, 0.02),
      0 0.7px 2px rgba(0, 0, 0, 0.028),
      0 1.3px 3.8px rgba(0, 0, 0, 0.035),
      0 2.2px 6.7px rgba(0, 0, 0, 0.042);
    padding-inline: 10px;
  `,
  content: css`
    color: ${token.colorText};
    overflow: auto;
    padding: ${token.paddingXS}px;
    height: calc(100vh - ${props.layoutHeaderHeight ?? 64}px);
  `,
  theme: css`
    vertical-align: middle;
  `,
}));

export default useStyles;
