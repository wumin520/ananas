import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, notification } from 'antd';
import { router } from 'umi';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './H5.less';

@connect(({ platform, loading, setting }) => ({
  platform,
  loading: loading.models.platform,
  setting,
}))
class Index extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'platform/queryH5OpenState',
    }).then(res => {
      console.log(res, '1');
      if (res.status === 'ok') {
        this.openNotification(res.payload);
      }
    });
  }

  jumpToAuthorize = () => {
    router.push('/tuishou-account/pid');
  };

  openNotification = result => {
    /* eslint-disable */
    //开通状态 1-正常 2-未授权获取已过期 3-未绑定pid
    const message = result.state === 1 ? '已成功！' : result.state === 2 ? '请注意！' : '出错了！';
    const type = result.state === 1 ? 'success' : result.state === 2 ? 'warn' : 'error';
    notification[type]({
      duration: 10,
      message: result.title,
      description: (
        <React.Fragment>
          <div>{result.message}</div>
          <a onClick={this.jumpToAuthorize} href="javascript:;">
            {result.state === 1 ? '更换授权' : '立即前往'}
          </a>
        </React.Fragment>
      ),
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  forwardToQF = index => {
    const val = index === 0 ? 1 : 0;
    router.push(`/fangdan/qf/info?qf=${val}`);
  };

  render() {
    /* eslint-disable */
    // const {
    //   platform: { qr_code },
    // } = this.props;
    const qr_code = `https://cdn.youlianyc.com/image/static/b7e6993c2c60b18b2e0150914b9b45b458a05987.jpg`;
    const url = `http://www.test.chaoduoke.com?sh_id=1393&type=20`;
    console.log(qr_code);

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          打造全网精品集合。可以应用于任何有流量的网站、APP、公众号等，帮助你将流量变现，收益翻N倍！
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            提升转化率
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            快速聚集人气
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            提高商品流量
          </a>
        </div>
      </div>
    );

    const extraContent = qr_code ? (
      <div className={styles.extraImg}>
        <div>你的移动网页二维码</div>
        <img alt="这是一个标题" src={qr_code} />
        <div>网页地址：{url}</div>
      </div>
    ) : (
      ''
    );

    return (
      <div>
        <PageHeaderWrapper title="移动端网页" content={content} extraContent={extraContent}>
          <div className={styles.cardList}>
            <Card title="服务介绍">
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {`【亮点】

使用方便，操作简单，海量商品收益净收囊中

专业团队运营并进行商品审核维护

每日更新，为用户每天带去新鲜感

优质版块分类深度挖掘用户需求


【界面预览】`}
              </div>
              <div style={{ marginTop: 20 }}>
                <img src="https://cdn.youlianyc.com/image/static/b82761ba5231af27f1ffb79cb393ce8cc7bcf70a.jpg" />
              </div>
            </Card>
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default Index;
