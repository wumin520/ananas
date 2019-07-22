import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit, ImgCaptcha } = Login;

@connect(({ zslogin, setting, loading }) => ({
  zslogin,
  setting,
  submitting: loading.effects['zslogin/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  componentWillMount() {
    const {
      location: { query },
      dispatch,
    } = this.props;
    if (query.mobile && query.password) {
      dispatch({
        type: 'zslogin/autoLogin',
        payload: {
          ...query,
        },
      });
    }
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onCaptchaChange = rand => {
    this.rand = rand;
    console.log('onCaptchaChange -> rand', rand);
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'zslogin/getCaptcha',
            payload: {
              mobile: values.mobile,
            },
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    console.log(values, '1');
    const { type } = this.state;
    const typeValue = type === 'account' ? 0 : 1;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'zslogin/login',
        payload: {
          ...values,
          type: typeValue,
          _version: this.rand,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { zslogin, submitting, setting } = this.props;
    const { type } = this.state;

    const imgCaptchaUrl = `${
      setting.configs[process.env.API_ENV].API_SERVER
    }/cdk/work/v1/phrase?_version=`;
    return (
      <div className={styles.page}>
        <div className={styles.main}>
          <h2 style={{ textAlign: 'center', fontWeight: 600 }}>超多客代理系统</h2>
          <p className={styles.desc}>为您提供运营解决方案，提升公司业务</p>
          <Login
            defaultActiveKey={type}
            onTabChange={this.onTabChange}
            onSubmit={this.handleSubmit}
            ref={form => {
              this.loginForm = form;
            }}
          >
            <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
              {zslogin.status === 'error' &&
                zslogin.type === 'account' &&
                !submitting &&
                this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
              <UserName
                name="mobile"
                placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.userName.required' }),
                  },
                ]}
              />
              <Password
                name="password"
                placeholder={`${formatMessage({ id: 'app.login.password' })}`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.password.required' }),
                  },
                ]}
              />
              <ImgCaptcha
                name="phrase"
                placeholder={`${formatMessage({ id: 'app.login.phrase' })}`}
                imgCaptchaUrl={imgCaptchaUrl}
                onCaptchaChange={this.onCaptchaChange}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.phrase.required' }),
                  },
                ]}
                onPressEnter={e => {
                  e.preventDefault();
                  this.loginForm.validateFields(this.handleSubmit);
                }}
              />
            </Tab>
            <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
              {zslogin.status === 'error' &&
                zslogin.type === 'mobile' &&
                !submitting &&
                this.renderMessage(
                  formatMessage({ id: 'app.login.message-invalid-verification-code' })
                )}
              <Mobile
                name="mobile"
                placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.phone-number.required' }),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                  },
                ]}
              />
              <Captcha
                name="verification_code"
                placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                countDown={60}
                onGetCaptcha={this.onGetCaptcha}
                getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
                getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.verification-code.required' }),
                  },
                ]}
              />
              <ImgCaptcha
                name="phrase"
                placeholder={`${formatMessage({ id: 'app.login.phrase' })}`}
                imgCaptchaUrl={imgCaptchaUrl}
                onCaptchaChange={this.onCaptchaChange}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.phrase.required' }),
                  },
                ]}
              />
            </Tab>
            {/* <div>
              <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                <FormattedMessage id="app.login.remember-me" />
              </Checkbox>
              <a style={{ float: 'right' }} href="">
                <FormattedMessage id="app.login.forgot-password" />
              </a>
            </div> */}
            <Submit loading={submitting}>
              <FormattedMessage id="app.login.login" />
            </Submit>
            <div className={styles.other}>
              <Link to="/work/user/register">{'立即申请成为代理 >'}</Link>
            </div>
          </Login>
        </div>
      </div>
    );
  }
}

export default LoginPage;
