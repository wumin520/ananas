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
            src="https://cdn.youlianyc.com/image/static/a1039e37e6d206c3d2d7facc42c7c545cdfcc1bc.jpg"
            alt=""
          />
          <p className={styles.select_title}>我是推手</p>
          <Button disabled className={styles.btn_select}>
            暂未开放
          </Button>
        </div>
        <div className={`${styles.select_item} ${styles.ml64}`}>
          <img
            className={styles.select_img}
            src="https://cdn.youlianyc.com/image/static/e87b2051050016b10b71035f4302f551894ca632.jpg"
            alt=""
          />
          <p className={styles.select_title}>我是商家</p>
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
