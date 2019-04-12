import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Table, Alert } from 'antd';
import router from 'umi/router';
// import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
}))
class Step4 extends React.PureComponent {
  toPay = () => {
    router.push('/fangdan/step-form/result');
  };

  goBack = () => {
    router.push('/fangdan/step-form/schedule');
  };

  render() {
    // const { data } = this.props;
    // const onFinish = () => {
    //   router.push('/form/step-form/info');
    // };
    const columns = [
      {
        title: '分类',
        dataIndex: 'name',
        key: 'reward_type',
      },
      {
        title: '金额',
        dataIndex: 'age',
        key: 'reward',
      },
      {
        title: '数量',
        dataIndex: 'address',
        key: 'count',
      },
      {
        title: '合计',
        key: 'sum',
        dataIndex: 'tags',
      },
    ];

    const data = [
      {
        key: '1',
        name: '用户返款',
        age: 32,
        address: '11111',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: '11111',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: '11111',
        tags: ['cool', 'teacher'],
      },
    ];
    return (
      <Fragment>
        <Row>
          <Col push={6} span={12}>
            <Alert
              closable
              showIcon
              message="请先支付推广费用，推广费用将通过平台自动返款给用户。"
              style={{ marginBottom: 24, marginTop: 20 }}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'left', marginBottom: 10 }} push={6} span={12}>
            推广费用明细：
          </Col>
        </Row>
        <Row>
          <Col push={6} span={12}>
            <Table bordered pagination={false} columns={columns} dataSource={data} />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'right', marginTop: 10 }} push={6} span={12}>
            费用总计：￥10340.00元{' '}
          </Col>
        </Row>
        <Row style={{ margin: '40px 0' }}>
          <Col offset={6} span={3}>
            需支付：￥10000
          </Col>
          <Col push={4} span={6}>
            余额：￥20000.00 <a style={{ marginLeft: 10 }}>{'余额不足,去充值>'}</a>
          </Col>
        </Row>
        <Row>
          <Col offset={10}>
            <Button onClick={this.toPay} disabled={false} size="default" type="primary">
              确认支付
            </Button>
            <Button onClick={this.goBack} style={{ marginLeft: 20 }} size="default">
              上一步
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Step4;
