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
class FavNav extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      top: '32px',
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);

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

  handleScroll = () => {
    const { scrollY } = window;
    if (scrollY > 32) {
      this.setState({
        top: '0',
      });
    } else {
      this.setState({
        top: '32px',
      });
    }
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };

  render() {
    const { isLogin, top } = this.state;
    const { currentUser } = this.props;
    const tsState = currentUser.ts_state;

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
      <div style={{ top }} className={styles.marketNav}>
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
              选品库<span className={styles.tit_label}>推手</span>
            </div>
          </div>
          <div className={styles.nav_right}>
            {isLogin ? (
              <div className={styles.after_login}>
                <Dropdown overlay={menu}>
                  <div className="ant-dropdown-link">
                    {phoneStr} <Icon type="down" />
                  </div>
                </Dropdown>

                {tsState === 0 ? (
                  <Link to="/user/tuishou-signin" className={styles.btn_apply}>
                    申请认证
                  </Link>
                ) : (
                  <Link to="/tuishou" className={styles.btn_apply}>
                    推手中心
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

export default FavNav;
