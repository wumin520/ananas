import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Select, Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

const { Option } = Select;

const content = <div />;

@connect(({ loading }) => ({
  loading: loading.models.recharge,
}))
@Form.create()
class Recharge extends PureComponent {
  state = {};

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
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="充值金额">
              {getFieldDecorator('rechargeMoney', {
                initialValue: '1000',
                rules: [
                  {
                    required: true,
                    message: '请输入充值金额!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input style={{ width: 200 }} type="number" />)}{' '}
              元
            </Form.Item>
            <Form.Item label="支付类型">
              <Select defaultValue="1" style={{ width: 200 }}>
                <Option value="1">充值</Option>
              </Select>
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
