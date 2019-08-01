import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Statistic } from 'antd';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

const { Countdown } = Statistic;
const content = <div />;

@connect(({ recharge, loading }) => ({
  qrcodeInfo: recharge.qrcodeInfo,
  loading: loading.models.recharge,
}))
@Form.create()
class RechargePay extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch, location } = this.props;
    const { paymentId } = location.query;

    dispatch({
      type: 'recharge/rechargeGetQrcode',
      payload: {
        payment_id: paymentId,
      },
    }).then(res => {
      if (res.payload.left_time === 0) {
        router.push(`/CapitalManage/RechargePayError`);
      } else {
        this.timeTemp = Date.now() + res.payload.left_time;
      }
    });

    this.si = setInterval(() => {
      dispatch({
        type: 'recharge/rechargeCheck',
        payload: {
          payment_id: paymentId,
          backTo: location.query.backTo,
        },
      });
    }, 2000);
  }

  componentWillUnmount() {
    /* eslint-disable */
    this.si && clearInterval(this.si);
  }

  onFinish = () => {
    // console.log('finished!');
    router.push(`/CapitalManage/RechargePayError`);
  };

  render() {
    const { qrcodeInfo } = this.props;
    const time = this.timeTemp || 0;

    return (
      <PageHeaderWrapper title="我要充值" content={content}>
        <Card>
          <div className={styles.payBlock}>
            <div className={styles.payBlock_center}>
              <div className={styles.payBlock_top}>
                费用：<span className={styles.money}>{qrcodeInfo.money}</span>元，请在{' '}
                <Countdown
                  value={time}
                  onFinish={this.onFinish}
                  valueStyle={{ color: '#F5222D', fontSize: 14 }}
                />{' '}
                内完成支付
              </div>
              <div className={styles.payInfo}>
                <p>
                  请认准账户名称：
                  <span style={{ color: '#fa8c16' }}>极单信息科技（上海）有限公司</span>
                </p>
                <img src={qrcodeInfo.imgCode} alt="" />
                <p className={styles.code_desc}>打开手机微信 扫一扫完成支付</p>
              </div>
              <p style={{ color: '#1890FF', fontSize: 14 }}>
                支付遇到问题？请联系您的招商经理为您解决
              </p>
            </div>
            <div className={styles.payBlock_bottom}>
              <ul>
                <li style={{ marginBottom: '12px' }}>说明</li>
                <li>目前仅支持转账到微信账户</li>
                <li>1.请勿在备注中填写任何关于刷单、刷销量、领商品之类的备注；</li>
                <li>2.充值成功后不支持退款；</li>
              </ul>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RechargePay;
