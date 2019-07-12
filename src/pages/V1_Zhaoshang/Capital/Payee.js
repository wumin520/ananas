import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Alert } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const content = <div />;

@connect(({ withdraw, loading }) => ({
  withdrawData: withdraw.withdrawData,
  loading: loading.models.withdraw,
}))
class PayeeAdd extends PureComponent {
  state = {
    visible: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'withdraw/exchangePage',
    });
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <PageHeaderWrapper title="收款账户" content={content}>
        <Card style={{ overflow: 'hidden', height: '100%' }}>
          <div style={{ display: 'inline-block' }}>
            {visible ? (
              <Alert
                message="为确保您的资金安全，一旦打款成功，暂不支持更换银行卡。"
                type="info"
                showIcon
                closable
                afterClose={this.handleClose}
              />
            ) : null}
          </div>
          <Row className={styles.list_h} type="flex" justify="start">
            <Col span={6}>收款公司名称：</Col>
            <Col span={10}>col-4</Col>
          </Row>
          <Row className={styles.list_h} type="flex" justify="start">
            <Col span={6}>开户银行：</Col>
            <Col span={10}>col-4</Col>
          </Row>
          <Row className={styles.list_h} type="flex" justify="start">
            <Col span={6}>开户银行所在地：</Col>
            <Col span={10}>col-4</Col>
          </Row>
          <Row className={styles.list_h} type="flex" justify="start">
            <Col span={6}>银行账号：</Col>
            <Col span={10}>col-4</Col>
          </Row>
          <Row className={styles.list_h} type="flex" justify="start">
            <Col span={6}>营业执照号：</Col>
            <Col span={10}>col-4</Col>
          </Row>
          <Row className={styles.list_h} type="flex" justify="start">
            <Col span={6}>营业执照扫描件：</Col>
            <Col span={10}>
              <img
                style={{ width: '120px', height: '120px' }}
                alt=""
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PayeeAdd;
