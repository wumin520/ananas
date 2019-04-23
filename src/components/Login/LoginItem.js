import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Icon } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class WrapFormItem extends Component {
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      imgCaptcha: '',
    };
  }

  componentDidMount() {
    const { updateActive, name, imgCaptchaUrl, onCaptchaChange } = this.props;
    this.imgCaptchaUrl = imgCaptchaUrl;
    // this.setState({
    //   imgCaptcha: imgCaptchaUrl
    // })
    if (onCaptchaChange) {
      this.changeImgCaptcha();
    }
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  changeImgCaptcha = () => {
    const { onCaptchaChange } = this.props;
    const rand = `${Math.random() * 10000}`;
    this.setState({
      imgCaptcha: `${this.imgCaptchaUrl}${rand}`,
    });
    onCaptchaChange(rand);
  };

  render() {
    const { count, imgCaptcha } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      imgCaptchaUrl,
      ...restProps
    } = this.props;
    // console.log('changeImgCaptcha -> ', imgCaptcha, this.props);
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    if (type === 'ImgCaptcha') {
      const inputProps = omit(otherProps, ['onCaptchaChange']);
      return (
        <FormItem>
          <Row type="flex" justify="space-around" align="middle" gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
            </Col>
            <Col span={6}>
              <img
                style={{ width: '100%', height: 'auto', display: 'block' }}
                alt=""
                src={imgCaptcha}
              />
            </Col>
            <Col span={2}>
              <Icon onClick={this.changeImgCaptcha} type="sync" />
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;
