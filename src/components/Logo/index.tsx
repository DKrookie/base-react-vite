import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '@/assets/img/logo.svg';
import setting from '@/config/setting';

const SLink = styled(Link)`
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  height: 100%;

  &:hover {
    color: ${({ theme }) => theme.colorPrimary};
  }
`;

function Logo() {
  return (
    <SLink to="/">
      <Flex justify="center" align="center" style={{ width: 25, height: 25, marginRight: 5 }}>
        <LogoIcon />
      </Flex>
      <span>{setting.logoText}</span>
    </SLink>
  );
}

export default Logo;
