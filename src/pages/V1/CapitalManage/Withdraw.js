import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Input, Alert } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './Withdraw.less';

const content = <div />;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class Withdraw extends PureComponent {
  state = {
    visible: true,
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.state;

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
              <Form.Item label="账户余额">￥200.00</Form.Item>
              <Form.Item label="提现金额">
                {getFieldDecorator('rechargeMoney', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your rechargeMoney!',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入" />)}
              </Form.Item>
              <Form.Item label="真实姓名">
                {getFieldDecorator('rechargeMoney', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your rechargeMoney!',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入" />)}
              </Form.Item>
              <Form.Item label="银行卡号">
                {getFieldDecorator('rechargeMoney', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your rechargeMoney!',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入" />)}
              </Form.Item>
              <Form.Item label="开户行">输入卡号后自动识别</Form.Item>
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
