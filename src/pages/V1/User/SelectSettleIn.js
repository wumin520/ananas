import React, { Component } from 'react';
import { Form, Button } from 'antd';
import router from 'umi/router';
import styles from './Register.less';

@Form.create()
class SelectSettleIn extends Component {
  toGo = path => {
    router.push(path);
  };

  render() {
    return (
      <div className={styles.select_block}>
        {/** <div className={styles.title}>请选择下列身份进行入驻</div> */}
        <div className={`${styles.select_item}`}>
          <img
            className={styles.select_img}
            src="https://cdn.youlianyc.com/image/static/2399a4ab4b7d3343e2318e440a7afd3be2a127f3.jpg"
            alt=""
          />
          <p className={styles.select_title}>我是推手</p>
          <p className={styles.select_desc}>适合有流量的个人或团队推广，流量变现</p>
          <p className={`${styles.select_desc} ${styles.select_limit}`}>需实名认证</p>
          <Button disabled className={styles.btn_select}>
            暂未开放
          </Button>
        </div>
        <div className={`${styles.select_item} ${styles.ml64}`}>
          <img
            className={styles.select_img}
            src="https://cdn.youlianyc.com/image/static/898c54bef29cf5a9127f71c0398f533b22f1cc3e.jpg"
            alt=""
          />
          <p className={styles.select_title}>我是商家</p>
          <p className={styles.select_desc}>适合有放单需求的招商/商家放单，目前仅支持拼多多</p>
          <p className={`${styles.select_desc} ${styles.select_limit}`}>
            提供店铺/合作店铺相关资料
          </p>
          <Button
            className={styles.btn_select}
            type="primary"
            // eslint-disable-next-line
            onClick={this.toGo.bind(this, '/user/settlein')}
          >
            立即入驻
          </Button>
        </div>
      </div>
    );
  }
}
export default SelectSettleIn;
