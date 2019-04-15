import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

const content = <div />;

@connect(({ list, loading }) => ({
  recharge: list.recharge,
  loading: loading.models.list,
}))
@Form.create()
class RechargePay extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    // console.log('loaction', loaction);
    dispatch({
      type: 'capital/frozenTaskList',
      payload: {
        payment_id: 1,
      },
    });
  }

  render() {
    const { recharge } = this.props;

    return (
      <PageHeaderWrapper title="我要充值" content={content}>
        <Card>
          <p className={styles.title}>充值</p>
          <div className={styles.payBlock}>
            <div className={styles.payBlock_top}>
              <span>费用名称：活动费用100元</span>
              <span>￥{recharge.money}元</span>
            </div>
            <div className={styles.payBlock_center}>
              <p>
                请在<span>03:46</span>内完成支付
              </p>
              <div className={styles.payInfo}>
                <p>
                  请认准账户名称：<span style={{ color: '#fa8c16' }}>极单信息科技有限公司</span>
                </p>
                <img src="{recharge.imgCode}" alt="" />
                <p>打开手机微信</p>
                <p>扫一扫完成支付</p>
              </div>
              <p>支付遇到问题？请联系您的招商经理为您解决</p>
            </div>
            <div className={styles.payBlock_bottom}>
              <ul>
                <li style={{ marginBottom: '20px' }}>说明</li>
                <li>目前仅支持转账到微信账户</li>
                <li>1.请勿在备注中填写任何关于刷单、刷销量、领商品之类的备注；</li>
                <li>2.充值成功后不支持退款；放一些关于产品的常见问题说明。</li>
              </ul>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RechargePay;
