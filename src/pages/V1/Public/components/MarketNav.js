import React, { PureComponent } from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';
import Link from 'umi/link';
import styles from './MarketNav.less';

class MarketNav extends PureComponent {
  state = {};

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            退出
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.marketNav}>
        <div className={styles.nav}>
          <div className={styles.nav_left}>
            <img
              className={styles.logoImg}
              src="https://cdn.youlianyc.com/image/static/80177b5561be4401729b60666c74a07e5e459d34.jpg"
              alt=""
            />
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
            <div style={{ display: 'none' }} className={styles.btn_block}>
              <Button className={`${styles.btn} ${styles.btn_register}`}>注册</Button>
              <Button className={`${styles.btn} ${styles.btn_login}`}>登录</Button>
            </div>
            <div className={styles.after_login}>
              <Dropdown overlay={menu}>
                <div className="ant-dropdown-link">
                  183****1234 <Icon type="down" />
                </div>
              </Dropdown>
              <Button className={styles.btn_apply}>申请入驻</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketNav;
