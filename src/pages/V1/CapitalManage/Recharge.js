import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Input, Alert, Icon } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

// const { Option } = Select;

const content = <div />;

@connect(({ recharge, loading }) => ({
  rechargeActivity: recharge.rechargeActivity,
  loading: loading.models.recharge,
}))
@Form.create()
class Recharge extends PureComponent {
  state = {
    curIndex: 0,
    rechargeMoney: 0,
    isInput: true, // 是否可自定义金额
    visible: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'recharge/rechargeActivity',
    }).then(() => {
      this.selectedAct(0);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, location } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'recharge/rechargeSubmit',
          payload: {
            money: values.rechargeMoney,
            backTo: location.query.backTo,
          },
        });
      }
    });
  };

  // 充值活动
  selectedAct = index => {
    const { rechargeActivity } = this.props;
    if (!rechargeActivity || !rechargeActivity.reward_list) {
      this.setState({
        isInput: false,
      });
      return;
    }
    const rechargeMoney =
      index === rechargeActivity.reward_list.length
        ? ''
        : rechargeActivity.reward_list[index].recharge;
    const isInput = index !== rechargeActivity.reward_list.length;
    this.setState({
      curIndex: index,
      rechargeMoney,
      isInput,
    });
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { form, rechargeActivity } = this.props;
    const { curIndex, rechargeMoney, isInput, visible } = this.state;
    const rewardList = rechargeActivity.reward_list;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <PageHeaderWrapper title="我要充值" content={content}>
        <Card>
          <p className={styles.title}>充值</p>
          {rechargeActivity.recharge_tip && visible ? (
            <Alert
              message={rechargeActivity.recharge_tip}
              type="warning"
              showIcon
              closable
              afterClose={this.handleClose}
            />
          ) : (
            ''
          )}
          {/* 充值活动 */}
          <div className={styles.recharge_actBlock}>
            {rewardList &&
              rewardList.length &&
              rewardList.map((e, index) => (
                <div
                  className={`${styles.re_act_item} ${
                    curIndex === index ? styles.selectedItem : ''
                  }`}
                  onClick={this.selectedAct.bind(this, index)}
                  key={e.reward}
                >
                  <p>充{e.recharge}</p>
                  <p className={styles.reward}>送￥{e.reward}奖励金</p>
                  {curIndex === index ? (
                    <Fragment>
                      <span className={styles.triangle_topRight} />
                      <Icon className={styles.triangle_icon} type="check" />
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            {rewardList && rewardList.length ? (
              <div
                className={`${styles.re_act_item} ${
                  curIndex === rewardList.length ? styles.selectedItem : ''
                }`}
                onClick={this.selectedAct.bind(this, rewardList.length)}
              >
                <p className={styles.autoMoney}>自定义金额</p>
                {curIndex === rewardList.length ? (
                  <Fragment>
                    <span className={styles.triangle_topRight} />
                    <Icon className={styles.triangle_icon} type="check" />
                  </Fragment>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="充值金额">
              {getFieldDecorator('rechargeMoney', {
                initialValue: rechargeMoney,
                rules: [
                  {
                    required: true,
                    message: '请输入充值金额!',
                  },
                ],
              })(
                <Input
                  style={{ width: 200 }}
                  type="number"
                  placeholder="请输入充值金额"
                  disabled={isInput}
                />
              )}{' '}
              元
            </Form.Item>
            {/* <Form.Item label="支付类型">
              <Select defaultValue="1" style={{ width: 200 }}>
                <Option value="1">充值</Option>
              </Select>
            </Form.Item> */}
            <Form.Item label="应付">
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'orange' }}>
                {rechargeMoney === '' ? 0 : rechargeMoney}
              </span>{' '}
              元
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                充值
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Recharge;
