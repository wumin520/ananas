import React, { PureComponent } from 'react';
import styles from './MerchantsSettled.less';

import MarketNav from './components/MarketNav';
import Footer from './components/Footer';

class MerchantsSettled extends PureComponent {
  state = {};

  render() {
    return (
      <div className={styles.merchantsSettled}>
        <MarketNav />

        {/* banner */}
        <div className={styles.ms_top}>
          <div className={styles.ms_banner}>pic</div>
          <div className={styles.ms_word}>
            <p className={styles.title}>招募拼多多商家认证</p>
            <p className={styles.subtitle}>连接商业 共创未来</p>
          </div>
        </div>

        <div className={styles.effect_block}>
          <div className={styles.title}>三大成效</div>
          <div className={styles.eb_list}>
            <div className={styles.eb_item}>
              <img
                className={styles.md_img}
                src="https://cdn.youlianyc.com/image/static/c48ea0eb7bfa486206b3dc620243f098b341ea30.jpg"
                alt=""
              />
              <div className={styles.mb_word}>提高店铺DSR</div>
            </div>
            <div className={styles.eb_item}>
              <img
                className={styles.md_img}
                src="https://cdn.youlianyc.com/image/static/2e95041bb3f3941711493cb5cc3725005c996b2a.jpg"
                alt=""
              />
              <div className={styles.mb_word}>快速提升销量</div>
            </div>
            <div className={styles.eb_item}>
              <img
                className={styles.md_img}
                src="https://cdn.youlianyc.com/image/static/3c47320e92e7b9872eaa03181f5fc373bd71c3fb.jpg"
                alt=""
              />
              <div className={styles.mb_word}>增强购物体验</div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default MerchantsSettled;
