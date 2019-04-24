import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { getUserToken } from '@/utils/authority';
import { Icon, Dropdown, Menu } from 'antd';

import styles from './HeadNav.less';

@connect(({ user, login }) => ({
  currentUser: user.currentUser,
  login,
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

  loginOut = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };

  render() {
    const { isLogin } = this.state;
    const { currentUser } = this.props;
    const { state } = currentUser;

    const menu = (
      <Menu>
        <Menu.Item>
          <a
            className={styles.menuA}
            onClick={this.loginOut.bind(this)}
            rel="noopener noreferrer"
            href="/"
          >
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
              <div>
                {state === 0 ? (
                  <a href="/user/settlein">商家中心</a>
                ) : (
                  <a href="/homePage">放单中心</a>
                )}
              </div>
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
