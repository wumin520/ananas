import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { getUserToken } from '@/utils/authority';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './MarketNav.less';

@connect(({ user, login }) => ({
  currentUser: user.currentUser,
  login,
}))
class MarketNav extends PureComponent {
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
    }
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };

  render() {
    const { isLogin } = this.state;
    const {
      currentUser: { state },
      currentUser,
    } = this.props;

    const phoneStr = currentUser.phone
      ? `${currentUser.phone.substr(0, 3)}****${currentUser.phone.substr(7)}`
      : '';

    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.logout}>退出登录</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.marketNav}>
        <div className={styles.nav}>
          <div className={styles.nav_left}>
            <Link to="/web/index">
              <img
                className={styles.logoImg}
                src="https://cdn.youlianyc.com/image/static/80177b5561be4401729b60666c74a07e5e459d34.jpg"
                alt=""
              />
            </Link>
            <div className={styles.line}>line</div>
            <div className={styles.title}>
              营销推广<span className={styles.tit_label}>商家</span>
            </div>
          </div>
          <div className={styles.nav_center}>
            <Link className={styles.nav_link} to="/market">
              首页
            </Link>
            <Link className={styles.nav_link} to="/market/MerchantsSettled">
              商家入驻
            </Link>
            <Link className={styles.nav_link} to="/public/helpCenter">
              帮助中心
            </Link>
          </div>
          <div className={styles.nav_right}>
            {isLogin ? (
              <div className={styles.after_login}>
                <Dropdown overlay={menu}>
                  <div className="ant-dropdown-link">
                    {phoneStr} <Icon type="down" />
                  </div>
                </Dropdown>

                {state === 0 ? (
                  <Link to="/user/settlein" className={styles.btn_apply}>
                    申请入驻
                  </Link>
                ) : (
                  <Link to="/homePage" className={styles.btn_apply}>
                    放单中心
                  </Link>
                )}
              </div>
            ) : (
              <div className={styles.btn_block}>
                <Link className={`${styles.btn} ${styles.btn_register}`} to="/user/register">
                  注册
                </Link>
                <Link className={`${styles.btn} ${styles.btn_login}`} to="/user/login">
                  登录
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MarketNav;
