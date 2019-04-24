import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { getUserToken } from '@/utils/authority';
import { Icon, Dropdown, Menu } from 'antd';

import styles from './HeadNav.less';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class HeadNav extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const token = getUserToken();
    if (token) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      this.setState({
        isLogin: true,
      });
    }
  }

  render() {
    const { isLogin } = this.state;
    const { currentUser } = this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <a className={styles.menuA} target="_blank" rel="noopener noreferrer" href="/">
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.nav}>
        <div className={styles.navLeft}>
          <div>一站式导购服务</div>
          <div className={styles.loginInfo}>
            {isLogin ? (
              <Dropdown overlay={menu}>
                <p>
                  {currentUser.phone} <Icon type="down" />
                </p>
              </Dropdown>
            ) : (
              <a href="/user/login">Hi~ 请登录</a>
            )}
          </div>
          <div>
            {isLogin ? (
              <a href="/user/settlein">商家中心</a>
            ) : (
              <a href="/user/register">我要注册</a>
            )}
          </div>
        </div>
        <div className={styles.navRight}>
          <div>帮助中心</div>
          <div>联系我们</div>
        </div>
      </div>
    );
  }
}

export default HeadNav;
