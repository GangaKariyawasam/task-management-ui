import React, { ReactNode } from 'react';
import { FileDoneOutlined, HomeOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import styles from './layout.module.less'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate('/'),
    },
    {
      key: '2',
      icon: <FileDoneOutlined />,
      label: 'Task Management',
      onClick: () => navigate('task'),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout className={styles.siteLayout}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content  style={{ margin: '24px 16px 0' }}>
          <div className={styles.contentLayout}
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          <Outlet />  
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;