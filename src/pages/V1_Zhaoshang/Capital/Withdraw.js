import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Input, Alert } from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

const content = <div />;

@connect(({ capital, loading }) => ({
  assetInfo: capital.assetInfo,
  payeeInfo: capital.payeeInfo,
  loading: loading.models.capital,
}))
@Form.create()
class Withdraw extends PureComponent {
  state = {
    visible: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/withdrawAccount',
    });
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  selectTypeChange = value => {
    this.triggerChange({ value });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'capital/withdrawApply',
          payload: values,
        });
      }
    });
  };

  render() {
    const { form, assetInfo, payeeInfo } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.state;

    const alertText = (
      <Fragment>
        <div>
          <span style={{ marginRight: '20px' }}>请设置收款账户</span>
          <Link to="/zhaoshang-capital/payee">去设置</Link>
        </div>
      </Fragment>
    );

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
            {visible && payeeInfo.name === '' ? (
              <Alert message={alertText} showIcon closable afterClose={this.handleClose} />
            ) : null}
          </div>
          <div className={styles.formBlock}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="账户余额">￥{assetInfo.balance}</Form.Item>
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
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  申请提现
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            {payeeInfo.name !== '' ? (
              <ul>
                <li style={{ marginBottom: '10px', fontWeight: 'bold' }}>提现说明</li>
                <li>提现账户名：{payeeInfo.name}</li>
                <li>
                  提现银行卡：{payeeInfo.bank_name} {payeeInfo.bank_card}
                </li>
              </ul>
            ) : (
              ''
            )}
            <ul>
              <li style={{ marginBottom: '10px', fontWeight: 'bold' }}>申请提现需满足以下条件：</li>
              <li>1.账户余额≥100</li>
              <li>2.账号信息填写完整并已通过认证</li>
              <li>3.申请时间为每月1-20号</li>
              <li>4.上笔提现申请已审核</li>
              <li style={{ marginTop: '10px', fontWeight: 'bold' }}>
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
