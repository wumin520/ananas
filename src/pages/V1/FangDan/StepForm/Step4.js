import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Table, Alert, message } from 'antd';
import router from 'umi/router';
import { Link } from 'umi';
// import styles from './style.less';
let toPayIsClick = true;

@connect(({ form }) => ({
  data: form.step,
  taskPayInfo: form.taskPayInfo,
  taskId: form.taskId,
}))
class Step4 extends React.PureComponent {
  componentWillUnmount() {
    toPayIsClick = true;
  }

  toPay = () => {
    if (!toPayIsClick) {
      return;
    }
    toPayIsClick = false;
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
    const { location } = this.props;
    let path = `/fangdan/step-form/schedule`;
    if (location.query.qf !== undefined) {
      path = `/fangdan/qf/schedule?qf=${location.query.qf}`;
    }
    router.push(path);
  };

  componentDidMount = () => {
    /* eslint-disable */
    const { dispatch, taskId, location } = this.props;
    const { query } = location;
    const { task_id, goods_id, need_fetch } = query;
    this.taskId = taskId || task_id;
    let backTo = location.pathname + location.search;
    this.chargeUrl = `/CapitalManage/Recharge?backTo=${encodeURIComponent(backTo)}`;
    dispatch({
      type: 'form/queryPayInfoByTaskId',
      payload: {
        task_id: this.taskId,
      },
    }).then(() => {
      const { taskPayInfo } = this.props;
      const { can_pay, pay_notice } = taskPayInfo;
      if (can_pay === 0) {
        message.error(pay_notice);
      }
    });

    if (need_fetch) {
      // task_id &&
      //   dispatch({
      //     type: 'form/queryTaskDetail',
      //     payload: {
      //       task_id,
      //     },
      //   });
      // goods_id &&
      //   dispatch({
      //     type: 'form/queryGoodsDetail',
      //     payload: { goods_id, auto_redirect: 0 },
      //   });
      this.actionType = 'pay';
    }
  };

  render() {
    const { taskPayInfo, location } = this.props;
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
        reward_type: location.query.qf === undefined ? '用户返款' : '平台服务费',
        ...taskPayInfo,
      },
    ];
    const chargeUrl = this.chargeUrl || '';
    return (
      <Fragment>
        {taskPayInfo.can_pay == 1 ? (
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
        ) : (
          ''
        )}
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
              <Link to={chargeUrl} style={{ marginLeft: 10 }}>
                {'余额不足,去充值>'}
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <Col offset={10}>
            {taskPayInfo.can_pay == 1 ? (
              <Button onClick={this.toPay} size="default" type="primary">
                确认支付
              </Button>
            ) : (
              <Button disabled type="primary">
                确认支付
              </Button>
            )}
            {this.actionType === 'pay' ? (
              ''
            ) : (
              <Button onClick={this.goBack} style={{ marginLeft: 20 }} size="default">
                上一步
              </Button>
            )}
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Step4;
