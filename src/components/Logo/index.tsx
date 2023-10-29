import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import LogoIcon from '@/assets/img/logo.svg?react';
import setting from '@/config/setting';
import useStyles from './useStyles';

function Logo() {
  const { styles } = useStyles();

  return (
    <Link to="/" className={styles.link}>
      <Flex justify="center" align="center" className={styles.flex}>
        <LogoIcon className={styles.logo} />
        <span>{setting.logoText}</span>
      </Flex>
    </Link>
  );
}

export default Logo;
