import React, { Component } from 'react';
import { Button, Modal } from 'antd';

import styles from './AboutUs.less';
import Footer from './components/Footer';
import HeadNav from './components/HeadNav';
import NavOfficial from './components/NavOfficial';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#2F54EB',
      opacity: 0.85,
    };
  }

  info = () => {
    Modal.info({
      content: (
        <div>
          <p>咨询请加客服qq：1140453425</p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const { bgColor, opacity } = this.state;

    return (
      <div className={styles.main}>
        <HeadNav />

        <NavOfficial bgColor={bgColor} opacity={opacity} />

        {/* {con0} */}
        <div className={styles.au_banner}>
          <div className={styles.mask} />
          <p className={styles.au_title}>关于我们</p>
          <p className={styles.au_desc}>
            超多客作为电子商务服务提供商,致力于为商家提供移动营销的解决方案,通过“一站式导购服务”的模式，提供拼多多等大型电商平台的流量变现等电商一体化服务。
          </p>
          <p className={styles.au_desc}>
            公司总部位于上海，目前已为数十万的商家提供导购服务，我们已经建立起电商内容导购的生态系统，涵盖消费者、商家、第三方流量主及战略联盟伙伴。超多客旨在为商家创造更多价值，得到您100%的信任。
          </p>
        </div>

        <div className={styles.qq_block}>
          <div className={styles.qq_item}>
            <img
              className={styles.qq_img}
              src="https://cdn.youlianyc.com/image/static/e87b2051050016b10b71035f4302f551894ca632.jpg"
              alt=""
            />
            <p className={styles.qq_title}>商务合作</p>
            <Button className={styles.btn_QQ} type="primary" onClick={this.info}>
              QQ交谈
            </Button>
          </div>
          <div className={`${styles.qq_item} ${styles.ml64}`}>
            <img
              className={styles.qq_img}
              src="https://cdn.youlianyc.com/image/static/a1039e37e6d206c3d2d7facc42c7c545cdfcc1bc.jpg"
              alt=""
            />
            <p className={styles.qq_title}>商家咨询</p>
            <Button className={styles.btn_QQ} type="primary" onClick={this.info}>
              QQ交谈
            </Button>
          </div>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
