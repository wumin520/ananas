import React, { PureComponent } from 'react';
import Link from 'umi/link';
import styles from './Footer.less';

class Footer extends PureComponent {
  state = {};

  render() {
    return (
      <div className={styles.bg_footer}>
        <div className={styles.footer}>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.title}>超多客</div>
              <Link className={styles.ele} to="/">
                公司简介
              </Link>
              <Link className={styles.ele} to="/">
                企业文化
              </Link>
              <Link className={styles.ele} to="/">
                合作联系
              </Link>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>产品服务</div>
              <Link className={styles.ele} to="/">
                CMS网站
              </Link>
              <Link className={styles.ele} to="/">
                微信小程序
              </Link>
              <Link className={styles.ele} to="/">
                精品单页
              </Link>
              <Link className={styles.ele} to="/">
                开放API
              </Link>
            </div>
            {/*
              <div className={styles.item}>
                <div className={styles.title}>帮助支持</div>
                <Link className={styles.ele} to="/">
                  新手入门
                </Link>
                <Link className={styles.ele} to="/">
                  常见问题
                </Link>
              </div>
            */}
            <div className={styles.item}>
              <div className={styles.title}>微信服务号</div>
              <div className={styles.eleImg}>
                <img
                  src="https://cdn.youlianyc.com/image/static/3462247bd9fc80e155274995e8085d4b953bf968.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_below}>
          Copyright © 2018<span className={styles.comp}> 极单信息科技有限公司 </span>
          沪ICP备17028167号-6 版权所有
        </div>
      </div>
    );
  }
}

export default Footer;
