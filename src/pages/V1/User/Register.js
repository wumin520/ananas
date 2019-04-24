import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Row, Col, Popover, Progress, Icon } from 'antd';
import { getShState } from '@/utils/authority';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading, setting }) => ({
  register,
  setting,
  submitting: loading.effects['register/submit'],
  codeGetting: loading.effects['login/getCaptcha'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    captchaImg: '',
  };

  componentWillMount() {
    const state = getShState();
    console.log('reigister -> componentWillMount -> sh_state -> ', state, typeof state);
    if (state === '0') {
      router.push('/user/settlein');
    }
  }

  componentDidMount() {
    this.onGetCaptchaImg();
  }

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    if (register.status === 'ok') {
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptchaImg = () => {
    const {
      setting: { backend },
    } = this.props;
    console.log(backend, 'backend');
    const rand = (Math.random() * 10000).toString();
    this.captcha_rand = rand;
    const url = `${backend}/cdk/phrase?_version=${rand}`;
    this.setState({
      captchaImg: url,
    });
  };

  onGetCaptcha = () => {
    console.log(this.loginForm.validateFields, 'loginForm');
    const { form } = this.props;
    form.validateFields(['mobile'], {}, (err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'login/getCaptcha',
          payload: {
            mobile: values.mobile,
          },
        }).then(() => {
          this.startCountDown();
        });
      }
    });
  };

  startCountDown = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            _version: this.captcha_rand,
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting, codeGetting } = this.props;
    const { getFieldDecorator } = form;
    const { count, help, visible, captchaImg } = this.state;
    return (
      <div className={styles.main}>
        <h3 style={{ textAlign: 'center' }}>注册超多客账号</h3>
        <Form
          ref={eform => {
            this.loginForm = eform;
          }}
          onSubmit={this.handleSubmit}
        >
          <FormItem>
            {getFieldDecorator('mobile', {
              defaultValue: '',
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^\d{11}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
              />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('verification_code', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.verification-code.required' }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                  loading={codeGetting}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({ id: 'app.register.get-verification-code' })}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row type="flex" align="middle" gutter={8}>
              <Col span={16}>
                {getFieldDecorator('phrase', {
                  defaultValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入图片验证码',
                    },
                  ],
                })(<Input size="large" placeholder="图片验证码" />)}
              </Col>
              <Col span={6}>
                <img
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  alt=""
                  src={captchaImg}
                />
              </Col>
              <Col span={2}>
                <Icon onClick={this.onGetCaptchaImg} type="sync" />
              </Col>
            </Row>
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="validation.password.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'form.password.placeholder' })}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.confirm-password.required' }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              style={{ width: '100%', fontSize: '14px' }}
              size="large"
              loading={submitting}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>
          </FormItem>
          <FormItem style={{ textAlign: 'center' }}>
            已有超多客账号？
            <Link to="/User/Login">直接登录</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
