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
              <Link className={styles.ele} to="/public/aboutUs">
                公司简介
              </Link>
              <Link className={styles.ele} to="/public/aboutUs">
                企业文化
              </Link>
              <Link className={styles.ele} to="/public/aboutUs">
                合作联系
              </Link>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>产品服务</div>
              <Link className={styles.ele} to="/public/matrix">
                微信小程序
              </Link>
              <div className={styles.ele}>CMS网站</div>
              <div className={styles.ele}>精品单页</div>
              <div className={styles.ele}>开放API</div>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>帮助支持</div>
              <a className={styles.ele} href="/public/helpDetail?SelectedKeys=1&OpenKeys=sub1">
                新手入门
              </a>
              <a className={styles.ele} href="/public/helpDetail?SelectedKeys=4&OpenKeys=sub2">
                常见问题
              </a>
            </div>

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
          <a
            style={{ marginLeft: 10 }}
            target="cyxyv"
            href="https://v.yunaq.com/certificate?domain=www.chaoduoke.com&from=label&code=90020"
          >
            <img alt="" src="https://aqyzmedia.yunaq.com/labels/label_sm_90020.png" />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
