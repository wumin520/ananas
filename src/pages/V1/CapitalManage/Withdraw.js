import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Input, Alert, Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

const { Option } = Select;
const content = <div />;

@connect(({ list, loading }) => ({
  withdrawData: list.withdrawData,
  loading: loading.models.list,
}))
@Form.create()
class Withdraw extends PureComponent {
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

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'withdraw/exchange',
          payload: values,
        });
      }
    });
  };

  render() {
    // const { form, withdrawData } = this.props;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.state;

    const withdrawData = {
      balance: 2000,
      bank_list: [
        {
          id: 20,
          name: '中国银行',
        },
        {
          id: 20,
          name: '中国农业银行',
        },
      ],
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 1,
        },
      },
    };

    return (
      <PageHeaderWrapper title="我要提现" content={content}>
        <Card>
          <p className={styles.title}>提现</p>
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
          <div className={styles.formBlock}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="账户余额">￥{withdrawData.balance}</Form.Item>
              <Form.Item label="提现金额">
                {getFieldDecorator('money', {
                  rules: [
                    {
                      required: true,
                      message: '请输入提现金额!',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入提现金额" />)}
              </Form.Item>
              <Form.Item label="真实姓名">
                {getFieldDecorator('realname', {
                  rules: [
                    {
                      required: true,
                      message: '请输入真实姓名',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入真实姓名" />)}
              </Form.Item>
              <Form.Item label="银行卡号">
                {getFieldDecorator('bank_id', {
                  rules: [
                    {
                      required: true,
                      message: '请输入银行卡号!',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入银行卡号" />)}
              </Form.Item>
              <Form.Item label="开户行">
                {Option.initialValue('card_number', {
                  rules: [
                    {
                      required: true,
                      message: '请输入银行卡号!',
                    },
                  ],
                })(
                  <Select
                    style={{ width: 120 }}
                    defaultValue="全部"
                    onChange={this.selectTypeChange}
                  >
                    {withdrawData.bank_list.length &&
                      withdrawData.bank_list.map(e => (
                        <Option key={e.value} value={e.value}>
                          {e.name}
                        </Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  申请提现
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <ul>
              <li style={{ marginBottom: '10px', 'font-weight': 'bold' }}>说明</li>
              <li style={{ 'font-weight': 'bold' }}>申请提现需满足以下条件：</li>
              <li>1.账户余额≥100</li>
              <li>2.账号信息填写完整并已通过认证</li>
              <li>3.申请时间为每月1-20号</li>
              <li>4.上笔提现申请已审核</li>
              <li style={{ marginTop: '10px', 'font-weight': 'bold' }}>
                请如实填写银行卡信息，打款失败将退回余额中，若因信息不正确导致无法提现，超多客不承担由此产生的一切责任和费用。
              </li>
            </ul>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Withdraw;
