import React, { Component, Fragment } from 'react';
// import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Row, Col, Button } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import getPageTitle from '@/utils/getPageTitle';

// const links = [
//   {
//     key: 'help',
//     title: formatMessage({ id: 'layout.user.link.help' }),
//     href: '',
//   },
//   {
//     key: 'privacy',
//     title: formatMessage({ id: 'layout.user.link.privacy' }),
//     href: '',
//   },
//   {
//     key: 'terms',
//     title: formatMessage({ id: 'layout.user.link.terms' }),
//     href: '',
//   },
// ];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 超多客出品
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    console.log(this, 1);
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          {/* <div className={styles.lang}>
            <SelectLang />
          </div> */}
          <div className={styles.content}>
            {/* <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>超多客</span>
                </Link>
              </div>
              <div className={styles.desc}>超多客，卖你所买</div>
            </div> */}
            <div className={styles.topMenu_bg}>
              <Row className={styles.topMenu}>
                <Col span={12}>
                  <Link to="/web/index">
                    <img
                      className={styles.logo}
                      alt="logo"
                      src="https://cdn.youlianyc.com/image/static/80177b5561be4401729b60666c74a07e5e459d34.jpg"
                    />
                  </Link>
                  <span className={styles.slogan}>
                    {/* eslint-disable */
                    pathname.indexOf('tuishou') > -1
                      ? '推手认证'
                      : pathname.indexOf('work/') > -1
                      ? '超多客代理系统'
                      : '一站式导购服务'}
                  </span>
                </Col>
                <Col span={12}>
                  {pathname.indexOf('work/') === -1 ? (
                    <Link to="/web/index">
                      <Button
                        style={{ float: 'right' }}
                        type="primary"
                        ghost
                        className={styles.btnBackHome}
                      >
                        返回首页
                      </Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </div>
            {children}
          </div>
          {/* <GlobalFooter links={links} copyright={copyright} /> */}
          <GlobalFooter copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
