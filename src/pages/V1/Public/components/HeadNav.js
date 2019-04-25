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

    if (token && token !== '') {
      dispatch({
        type: 'user/fetchCurrent',
      });
      this.setState({
        isLogin: true,
      });
    } else {
      this.setState({
        isLogin: false,
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
    const { state, phone } = currentUser;
    const phoneStr = phone
      ? `${currentUser.phone.substr(0, 3)}****${currentUser.phone.substr(7)}`
      : '';
    const menu = (
      <Menu>
        <Menu.Item>
          <div className={styles.menuA} onClick={this.loginOut}>
            退出登录
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.nav_block}>
        <div className={styles.nav}>
          <div className={styles.navLeft}>
            <div>打造社交内容导购新生态</div>
            <div className={styles.loginInfo}>
              {isLogin ? (
                <Dropdown overlay={menu}>
                  <p>
                    {phoneStr} <Icon type="down" />
                  </p>
                </Dropdown>
              ) : (
                <a className={styles.loginHello} href="/user/login">
                  Hi~ 请登录
                </a>
              )}
            </div>
            <div>
              {isLogin ? (
                <div>
                  {state === 0 ? (
                    <a className={styles.headNavWord} href="/user/settlein">
                      商家入驻
                    </a>
                  ) : (
                    <a className={styles.headNavWord} href="/homePage">
                      放单中心
                    </a>
                  )}
                </div>
              ) : (
                <a className={styles.headNavWord} href="/user/register">
                  我要注册
                </a>
              )}
            </div>
          </div>
          {/*
            <div className={styles.navRight}>
            <div>
              <a className={styles.headNavWord} href="/public/helpCenter">
                帮助中心
              </a>
            </div>
            <div>联系我们</div>
          </div>
           */}
        </div>
      </div>
    );
  }
}

export default HeadNav;
