import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Table, Alert, message, Radio } from 'antd';
import router from 'umi/router';

// import styles from './style.less';
let toPayIsClick = true;

@connect(({ form }) => ({
  data: form.step,
  taskPayInfo: form.taskPayInfo,
  taskId: form.taskId,
  goodsDetail: form.goodsDetail,
}))
class Step4 extends React.PureComponent {
  state = {
    payType: 0,
  };

  componentWillUnmount() {
    toPayIsClick = true;
  }

  onChange = e => {
    const { taskPayInfo, dispatch } = this.props;
    const val = e.target.value;
    console.log('radio checked', e.target.value);
    this.setState({
      payType: val,
    });
    /* eslint-disable */
    let can_pay = 0;
    const wait_pay = parseFloat(taskPayInfo.wait_pay);
    const reward_balance = parseFloat(taskPayInfo.reward_balance || 0);
    const balance = parseFloat(taskPayInfo.balance);
    if ((val === 1 && wait_pay > reward_balance) || (val === 0 && wait_pay > balance)) {
      can_pay = 0;
    } else {
      can_pay = 1;
    }
    console.log(can_pay, 'can_pay -> ', taskPayInfo, wait_pay, reward_balance, balance);
    if (taskPayInfo.can_pay !== can_pay) {
      dispatch({
        type: 'form/updateState',
        payload: {
          taskPayInfo: {
            ...taskPayInfo,
            can_pay,
            reward_balance: 0,
          },
        },
      });
    }
  };

  toPay = () => {
    if (!toPayIsClick) {
      return;
    }
    toPayIsClick = false;
    const { dispatch, taskPayInfo } = this.props;
    const { payType } = this.state;

    dispatch({
      type: 'form/pay',
      payload: {
        task_id: this.taskId,
        type: taskPayInfo.type,
        pay_type: payType,
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
    const { taskPayInfo, location, goodsDetail } = this.props;
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
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
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
          <Col push={5} span={9}>
            {location.query.qf !== undefined ? (
              <Radio.Group onChange={this.onChange} value={this.state.payType}>
                <Radio style={radioStyle} value={0}>
                  余额：￥{taskPayInfo.balance}{' '}
                </Radio>
                <Radio style={radioStyle} value={1}>
                  奖励余额：￥{taskPayInfo.reward_balance || 0}{' '}
                </Radio>
              </Radio.Group>
            ) : (
              `余额：￥${taskPayInfo.balance} `
            )}
            {taskPayInfo.can_pay ? (
              ''
            ) : (
              <a href={chargeUrl} target="_blank" style={{ marginLeft: 10 }}>
                {'余额不足,去充值>'}
              </a>
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
            {this.actionType === 'pay' || !goodsDetail.goods_id ? (
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
