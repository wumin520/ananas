import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Select, Input } from 'antd';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './styles.less';

const { Option } = Select;

let money = 0;

function handleChange() {}

const content = <div />;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class Recharge extends PureComponent {
  state = {};

  handleChange = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        money = values.rechargeMoney;
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'capital/rechargeSubmit',
          payload: values.rechargeMoney,
        });
        dispatch(
          router.push({
            pathname: '/CapitalManage/RechargePay',
            params: {
              payment_id: 1,
            },
          })
        );
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
                    message: '请输入充值金额!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input style={{ width: 200 }} type="number" onChange={this.handleChange} />)}{' '}
              元
            </Form.Item>
            <Form.Item label="支付类型">
              <Select defaultValue="1" style={{ width: 200 }} onChange={handleChange}>
                <Option value="1">充值</Option>
              </Select>
            </Form.Item>
            <Form.Item label="应付">
              <span className={styles.payMoney}>{money}</span>&nbsp;
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
