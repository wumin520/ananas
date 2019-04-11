import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Col, Row } from 'antd';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import styles from './WithdrawSuccess.less';

const content = <div />;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
  data: list,
}))
@Form.create()
class RechargePaySuccess extends PureComponent {
  state = {};

  render() {
    const { data } = this.props;
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

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );

    return (
      <PageHeaderWrapper title="我要充值" content={content}>
        <Card style={{ padding: '100px 0 50px 0' }}>
          <Result
            type="success"
            title="提现成功"
            description="提现申请审核中，请耐心等待审核通知"
            extra={information}
            actions={actions}
            className={styles.result}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RechargePaySuccess;
