import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Table, Alert } from 'antd';
import router from 'umi/router';
import { Link } from 'umi';
// import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
  taskPayInfo: form.taskPayInfo,
}))
class Step4 extends React.PureComponent {
  toPay = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'form/pay',
      payload: {
        task_id: this.taskId,
      },
    });
    // router.push('/fangdan/step-form/result');
  };

  goBack = () => {
    router.push('/fangdan/step-form/schedule');
  };

  componentDidMount = () => {
    const { dispatch, taskPayInfo, location } = this.props;
    const { query } = location;
    this.taskId = taskPayInfo.task_id || query.task_id || 3;
    dispatch({
      type: 'form/queryPayInfoByTaskId',
      payload: {
        task_id: this.taskId,
      },
    });
  };

  render() {
    const { taskPayInfo } = this.props;
    // const onFinish = () => {
    //   router.push('/form/step-form/info');
    // };
    const columns = [
      {
        title: '分类',
        dataIndex: 'reward_type',
        key: 'reward_type',
      },
      {
        title: '金额',
        dataIndex: 'rebate_money',
        key: 'rebate_money',
      },
      {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '合计',
        key: 'total_money',
        dataIndex: 'total_money',
      },
    ];

    const data = [
      {
        id: 1,
        reward_type: '用户返款',
        ...taskPayInfo,
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
            <Table
              rowKey={item => item.id}
              bordered
              pagination={false}
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'right', marginTop: 10 }} push={6} span={12}>
            费用总计：￥{taskPayInfo.total_money}元
          </Col>
        </Row>
        <Row style={{ margin: '40px 0' }}>
          <Col offset={6} span={3}>
            需支付：￥{taskPayInfo.wait_pay}
          </Col>
          <Col push={4} span={6}>
            余额：￥{taskPayInfo.balance}{' '}
            {taskPayInfo.can_pay ? (
              ''
            ) : (
              <Link to="/CapitalManage/Recharge" style={{ marginLeft: 10 }}>
                {'余额不足,去充值>'}
              </Link>
            )}
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
