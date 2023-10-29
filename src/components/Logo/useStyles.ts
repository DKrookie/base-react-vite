import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  link: css`
    color: ${token.colorText};

    &:hover {
      color: ${token.colorPrimary};
    }
  `,
  flex: css`
    font-size: 26px;
  `,
  logo: css`
    color: ${token.colorPrimary};
    margin-right: 5px;
  `,
}));

export default useStyles;
