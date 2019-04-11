import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form } from 'antd';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import styles from './RechargePay.less';

const content = <div />;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class RechargePayError extends PureComponent {
  state = {};

  render() {
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
            type="error"
            title="充值失败"
            description="请在规定时间内完成充值"
            actions={actions}
            className={styles.result}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RechargePayError;
