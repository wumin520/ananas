import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Select, Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './Recharge.less';

const { Option } = Select;

function handleChange() {}

const content = <div />;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class Recharge extends PureComponent {
  state = {};

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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
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
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <PageHeaderWrapper title="我要充值" content={content}>
        <Card>
          <p className={styles.title}>充值</p>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="充值账号">1234567890</Form.Item>
            <Form.Item label="充值金额">
              {getFieldDecorator('rechargeMoney', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your rechargeMoney!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input style={{ width: 200 }} type=" number" />)}{' '}
              元
            </Form.Item>
            <Form.Item label="支付类型">
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                ],
              })(
                <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="应付">
              <span className={styles.payMoney}>123</span>&nbsp;
              <span className={styles.unit}>元</span>
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
