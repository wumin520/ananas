import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './MarketNav.less';
import { getStorage } from '@/utils/authority';

@connect(({ user, login }) => ({
  currentUser: user.currentUser,
  login,
}))
class FavNav extends PureComponent {
  constructor() {
    super();
    this.state = {
      top: '32px',
      path: '/CapitalManage/Recharge',
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (!getStorage('token')) {
      this.setState({
        path: '/user/login',
      });
    } else if (getStorage('sh_state') === '0') {
      this.setState({
        path: '/user/settlein',
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

  render() {
    const { top, path } = this.state;

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
            <div className={styles.title}>充值活动</div>
          </div>
          <div className={styles.nav_right}>
            <div className={styles.after_login}>
              <Link className={`${styles.btn_apply}`} to={path}>
                立即充值
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavNav;
