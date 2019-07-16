/* eslint-disable no-undef */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button, Form, Input, Alert, Upload, Icon, message } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';
import { configs } from '@/defaultSettings';

const content = <div />;

@connect(({ capital, loading }) => ({
  payeeInfo: capital.payeeInfo,
  loading: loading.models.capital,
}))
@Form.create()
class PayeeAdd extends PureComponent {
  state = {
    visible: true,
    imageUrl: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/withdrawAccount',
    });
  }

  handleClose = () => {
    this.setState({
      visible: false,
      imageUrl: '',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    const { imageUrl } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const param = { ...values, blis_img: imageUrl };
        dispatch({
          type: 'capital/withdrawAccountUpdate',
          payload: param,
        });
      }
    });
  };

  render() {
    const { form, payeeInfo } = this.props;
    const { getFieldDecorator } = form;
    const { visible, imageUrl } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
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
          offset: 4,
        },
      },
    };

    const alertText = (
      <Fragment>
        <div>1.为确保您的资金安全，一旦打款成功，暂不支持更换收款信息. </div>
        <div>
          2.请如实填写银行卡信息，打款失败将退回余额中，若因信息不正确导致无法提现，超多客不承担由此产生的一切责任和费用。
        </div>
      </Fragment>
    );

    const uploadButton = (
      <Button>
        <Icon type="upload" />
        上传图片
      </Button>
    );

    // 展示收款账户
    const payeeHtml = (
      <Card style={{ overflow: 'hidden', height: '100%' }}>
        {visible && payeeInfo.name === '' ? (
          <div style={{ display: 'inline-block' }}>
            <Alert
              message={alertText}
              type="info"
              showIcon
              closable
              afterClose={this.handleClose}
            />
          </div>
        ) : null}
        <Row className={styles.list_h} type="flex" justify="start">
          <Col span={6}>收款公司名称：</Col>
          <Col span={10}>{payeeInfo.name}</Col>
        </Row>
        <Row className={styles.list_h} type="flex" justify="start">
          <Col span={6}>开户银行：</Col>
          <Col span={10}>{payeeInfo.bank_name}</Col>
        </Row>
        <Row className={styles.list_h} type="flex" justify="start">
          <Col span={6}>开户银行所在地：</Col>
          <Col span={10}>{payeeInfo.bank_address}</Col>
        </Row>
        <Row className={styles.list_h} type="flex" justify="start">
          <Col span={6}>银行账号：</Col>
          <Col span={10}>{payeeInfo.bank_card}</Col>
        </Row>
        <Row className={styles.list_h} type="flex" justify="start">
          <Col span={6}>营业执照号：</Col>
          <Col span={10}>{payeeInfo.blis_no}</Col>
        </Row>
        <Row className={styles.list_h} type="flex" justify="start">
          <Col span={6}>营业执照扫描件：</Col>
          <Col span={10}>
            <img style={{ width: '120px', height: '120px' }} alt="" src={payeeInfo.blis_img} />
          </Col>
        </Row>
      </Card>
    );

    const uploadProps = {
      name: 'file',
      action: `${configs[process.env.API_ENV].API_SERVER}/cdk/v1/web/upload`,
      headers: {
        authorization: 'authorization-text',
      },
      data: file => {
        return {
          image: file,
          type: 'static',
        };
      },
      onChange: info => {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          this.setState({ imageUrl: info.file.response.payload.url });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    // 设置收款账户
    const payeeAddHtml = (
      <Card>
        <p className={styles.title}>提现</p>
        <div style={{ display: 'inline-block' }}>
          {visible ? (
            <Alert
              message={alertText}
              type="info"
              showIcon
              closable
              afterClose={this.handleClose}
            />
          ) : null}
        </div>
        <div className={styles.formBlock}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="收款公司名称：">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入收款公司名称!',
                  },
                ],
              })(<Input style={{ width: 200 }} type="text" placeholder="请输入收款公司名称" />)}
            </Form.Item>
            <Form.Item label="开户银行">
              {getFieldDecorator('bank_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入开户银行!',
                  },
                ],
              })(
                <div>
                  <Input style={{ width: 200 }} type="text" placeholder="请输入开户银行" />
                  <div>格式：XX银行</div>
                </div>
              )}
            </Form.Item>
            <Form.Item label="开户银行所在地：">
              {getFieldDecorator('bank_address', {
                rules: [
                  {
                    required: true,
                    message: '请输入开户银行所在地',
                  },
                ],
              })(<Input style={{ width: 200 }} type="text" placeholder="请输入开户银行所在地" />)}
            </Form.Item>
            <Form.Item label="银行账号">
              {getFieldDecorator('bank_card', {
                rules: [
                  {
                    required: true,
                    message: '请输入银行账号!',
                  },
                ],
              })(
                <div>
                  <Input style={{ width: 200 }} type="text" placeholder="请输入银行账号" />
                  <div>务必确保银行账号和开户名称对应无误</div>
                </div>
              )}
            </Form.Item>
            <Form.Item label="营业执照号：">
              {getFieldDecorator('blis_no', {
                rules: [
                  {
                    required: true,
                    message: '请输入营业执照号!',
                  },
                ],
              })(
                <div>
                  <Input style={{ width: 200 }} type="text" placeholder="请输入营业执照号" />
                  <div>请填写统一社会信用代码</div>
                </div>
              )}
            </Form.Item>
            <Form.Item label="营业执照扫描件：">
              {getFieldDecorator('blis_img', {
                rules: [
                  {
                    required: true,
                    message: '请选择!',
                  },
                ],
              })(
                <div className="clearfix">
                  <div>
                    请上传营业执照扫描件(其他组织请上传《单位法人证书》)，支持bmp,png,jpeg格式，文件大小不超过2M。
                  </div>
                  <Upload {...uploadProps} listType="picture">
                    {imageUrl ? null : uploadButton}
                  </Upload>
                </div>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <ul>
            <li style={{ marginBottom: '10px', fontWeight: 'bold' }}>说明</li>
            <li style={{ fontWeight: 'bold' }}>申请提现需满足以下条件：</li>
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
    );

    return (
      <PageHeaderWrapper title="设置收款账户" content={content}>
        {payeeInfo.name === '' ? payeeAddHtml : payeeHtml}
      </PageHeaderWrapper>
    );
  }
}

export default PayeeAdd;
