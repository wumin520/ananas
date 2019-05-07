import React, { Component } from 'react';
import { Form, Input, Button, Alert, Icon, Tooltip } from 'antd';
import { connect } from 'dva';
import FormItem from 'antd/es/form/FormItem';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { getInviteCode } from '@/utils/authority';

import styles from './Register.less';

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/settleIn'],
}))
@Form.create()
class settleIn extends Component {
  state = {
    inviteCode: '',
  };

  componentWillMount() {
    let inviteS = getInviteCode();
    if (!inviteS || inviteS === '') {
      // console.log('settleln getInviteCode() --> inviteS', inviteS);
      inviteS = '91b9c8ddc0';
    }
    this.setState({
      inviteCode: inviteS,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'register/settleIn',
          payload: {
            ...values,
          },
        });
      }
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { inviteCode } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Alert
          message="以下资料必须真实有效，不得盗用他人信息，若引起法律问题，平台概不负责！"
          type="info"
          showIcon
        />
        <h3 style={{ marginTop: '40px' }}>
          <FormattedMessage id="app.register.settlein" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('shop_name', {
              rules: [
                {
                  required: true,
                  message: '请输入您的拼多多店铺名称',
                },
              ],
            })(<Input size="large" placeholder="您的拼多多店铺名称" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('shop_code', {
              rules: [
                {
                  required: true,
                  message: '仅能输入数字',
                  pattern: /^[0-9]*$/,
                },
              ],
            })(
              <div style={{ position: 'relative' }}>
                <Input size="large" placeholder="拼多多后台店铺编号" />
                <Tooltip
                  title={
                    <div>
                      <p>如何查看拼多多店铺编号：</p>
                      <p>
                        首先打开拼多多管理后台，在店铺管理下，点击商家/店铺信息，即可查看自己的店铺编号。
                      </p>
                    </div>
                  }
                >
                  <Icon
                    style={{ position: 'absolute', top: '12px', right: '10px' }}
                    type="info-circle-o"
                  />
                </Tooltip>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('qq', {
              rules: [
                {
                  required: true,
                  message: '请输入您的QQ号码',
                },
              ],
            })(<Input size="large" placeholder="您的QQ号码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('invitation_code', {
              initialValue: inviteCode.trim(),
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入邀请码',
                  transform: value => {
                    return value.trim();
                  },
                },
              ],
            })(<Input size="large" placeholder="邀请码" />)}
          </FormItem>
          <FormItem>
            <Button
              style={{ width: '100%' }}
              size="large"
              loading={submitting}
              type="primary"
              htmlType="submit"
            >
              立即提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default settleIn;
