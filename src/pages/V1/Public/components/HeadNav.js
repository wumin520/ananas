import React, { PureComponent } from 'react';
import { Icon } from 'antd';

import styles from './HeadNav.less';

class HeadNav extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }

  render() {
    const { isLogin } = this.state;

    return (
      <div className={styles.nav}>
        <div className={styles.navLeft}>
          <div>一站式导购服务</div>
          <div className={styles.loginInfo}>
            {isLogin ? (
              <p>
                181****4321 <Icon type="down" />
              </p>
            ) : (
              <a
                onClick={() => {
                  this.setState({
                    isLogin: true,
                  });
                }}
              >
                Hi~ 请登录
              </a>
            )}
          </div>
          <div>我要注册</div>
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
