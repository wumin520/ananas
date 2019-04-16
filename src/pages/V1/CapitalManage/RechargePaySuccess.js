import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form } from 'antd';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import styles from './styles.less';

const content = <div />;

@connect(({ recharge, loading }) => ({
  recharge,
  loading: loading.models.recharge,
}))
@Form.create()
class RechargePaySuccess extends PureComponent {
  state = {};

  render() {
    const { location } = this.props;
    const { money } = location.query;

    const desc = `推广费用${money}元已到账`;

    const onFinish = () => {
      router.push('/CapitalManage/CapitalDetail');
    };

    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          返回资产列表
        </Button>
      </Fragment>
    );

    return (
      <PageHeaderWrapper title="我要充值" content={content}>
        <Card style={{ padding: '100px 0 50px 0' }}>
          <Result
            type="success"
            title="充值成功"
            description={desc}
            actions={actions}
            className={styles.result}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RechargePaySuccess;
