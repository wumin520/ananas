import React, { PureComponent } from 'react';
import { Row, Col, Dropdown, Icon, Button } from 'antd';
// import { router } from 'umi';
import styles from './NavOfficial.less';

class Header extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    /* eslint-disable */
    const menu = (
      <div className={styles.menu_box}>
        <div className={styles.menu_content}>
          <div className={styles.menu_wx + ' ' + styles.wx}>
            <img
              className={styles.menu_img}
              src="https://cdn.youlianyc.com/image/static/3d7c612c5ceb53bf830d54dee065473797a63fde.jpg"
              alt=""
            />
            <div className={styles.hint}>
              <p className={styles.title}>微信小程序</p>
              <p className={styles.desc}>超级流量池，快速裂变增长粉丝</p>
            </div>
          </div>
          <div className={styles.menu_wx}>
            <img
              className={styles.menu_img}
              src="https://cdn.youlianyc.com/image/static/794a94895308836b92d79ffed29ac994ac0eaa3e.jpg"
              alt=""
            />
            <div className={styles.hint}>
              <p className={styles.title}>
                CMS网站{' '}
                <Button type="primary" size="small" disabled>
                  敬请期待
                </Button>
              </p>
              <p className={styles.desc}>精细化运营，体验式营销一站式解决方案</p>
            </div>
          </div>
          <div className={styles.menu_wx}>
            <img
              className={styles.menu_img}
              src="https://cdn.youlianyc.com/image/static/d7c47cc92c732f0baa1b1fbb4eafb40b8014c347.jpg"
              alt=""
            />
            <div className={styles.hint}>
              <p className={styles.title}>
                精品单页{' '}
                <Button type="primary" size="small" disabled>
                  敬请期待
                </Button>
              </p>
              <p className={styles.desc}>活动运营营销方案，病毒式传播，快速变现</p>
            </div>
          </div>
          <div className={styles.menu_wx}>
            <img
              className={styles.menu_img}
              src="https://cdn.youlianyc.com/image/static/00d5d8bc31b63800823ca3a81c72e255ce78a4d0.jpg"
              alt=""
            />
            <div className={styles.hint}>
              <p className={styles.title}>
                开放API{' '}
                <Button type="primary" size="small" disabled>
                  敬请期待
                </Button>
              </p>
              <p className={styles.desc}>完善的导购解决方案，丰富的数据API接口</p>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div
        className={styles.nav}
        style={{ backgroundColor: this.props.bgColor, opacity: this.props.opacity }}
      >
        <div className={styles.content}>
          <Row type="flex" justify="space-between">
            <Col span={4}>
              <div className={styles.nav_img} />
            </Col>
            <Col span={15}>
              <Row type="flex" justify="end">
                <Col span={4} style={{ textAlign: 'right' }}>
                  <a href="/web/index">首页</a>
                </Col>
                <Dropdown overlay={menu} overlayStyle={{ width: '100%' }}>
                  <Col span={4} style={{ textAlign: 'right' }}>
                    <a className="ant-dropdown-link" href="/public/matrix">
                      浏量矩阵 <Icon type="down" />
                    </a>
                  </Col>
                </Dropdown>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <a href="/market">营销推广</a>
                </Col>
                <Col span={3} style={{ textAlign: 'right' }}>
                  <a href="">关于我们</a>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Header;
