import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Row, Col, Icon } from 'antd';
import { getShState, setInviteCode } from '@/utils/authority';
import styles from './Register.less';

const FormItem = Form.Item;

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
    captchaImg: '',
  };

  componentWillMount() {
    const state = getShState();
    console.log('reigister -> componentWillMount -> sh_state -> ', state, typeof state);
    // if (state === '0') {
    //   router.push('/user/settlein');
    // }

    // 保存地址参数中的邀请码
    const {
      location: { query },
    } = this.props;
    if (query.s) {
      setInviteCode(query.s);
    }
  }

  componentDidMount() {
    this.onGetCaptchaImg();
  }

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mobile');
    if (register.status === 'ok') {
      router.push({
        pathname: '/work/user/register-result',
        state: {
          mobile: account,
          payload: register.payload,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptchaImg = () => {
    const {
      setting: { configs },
    } = this.props;
    const rand = (Math.random() * 10000).toString();
    this.captcha_rand = rand;
    const url = `${configs[process.env.API_ENV].API_SERVER}/cdk/work/v1/phrase?_version=${rand}`;
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
          type: 'zslogin/getCaptcha',
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

  render() {
    const { form, submitting, codeGetting } = this.props;
    const { getFieldDecorator } = form;
    const { count, captchaImg } = this.state;
    return (
      <div className={styles.main}>
        <h2 style={{ textAlign: 'center', fontWeight: 600 }}>超多客代理系统</h2>
        <p className={styles.desc}>为您提供运营解决方案，提升公司业务</p>
        <h3>申请代理</h3>
        <Form
          ref={eform => {
            this.loginForm = eform;
          }}
          onSubmit={this.handleSubmit}
        >
          <FormItem>
            {getFieldDecorator('name', {
              defaultValue: '',
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
              ],
            })(<Input size="large" placeholder="输入公司名称" />)}
          </FormItem>
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
            })(<Input size="large" placeholder="11位手机号" />)}
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
                })(<Input size="large" placeholder="输入验证码" />)}
              </Col>
              <Col span={8}>
                <Button
                  style={{ padding: 0 }}
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
                })(<Input size="large" placeholder="输入右侧验证码" />)}
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
          <Row type="flex" align="middle" gutter={8}>
            <Col span={12}>
              <FormItem>
                <Button
                  style={{ width: '100%', fontSize: '14px' }}
                  size="large"
                  loading={submitting}
                  type="primary"
                  htmlType="submit"
                >
                  立即申请
                </Button>
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem style={{ textAlign: 'right' }}>
                <Link to="/work/User/login">使用已有账户登录</Link>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Register;
