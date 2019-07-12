/* eslint-disable no-undef */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Input, Alert, Upload, Icon, Modal } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const content = <div />;

@connect(({ withdraw, loading }) => ({
  withdrawData: withdraw.withdrawData,
  loading: loading.models.withdraw,
}))
@Form.create()
class PayeeAdd extends PureComponent {
  state = {
    visible: true,
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'withdraw/exchangePage',
    });
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  selectTypeChange = value => {
    this.triggerChange({ value });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        dispatch({
          type: 'withdraw/exchange',
          payload: values,
        });
      }
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.state;

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

    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    return (
      <PageHeaderWrapper title="设置收款账户" content={content}>
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
                  <Fragment>
                    <Input style={{ width: 200 }} type="text" placeholder="请输入开户银行" />
                    <div>格式：XX银行</div>
                  </Fragment>
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
                  <Fragment>
                    <Input style={{ width: 200 }} type="text" placeholder="请输入银行账号" />
                    <div>务必确保银行账号和开户名称对应无误</div>
                  </Fragment>
                )}
              </Form.Item>
              <Form.Item label="营业执照号：">
                {getFieldDecorator('blis_no', {
                  rules: [
                    {
                      required: true,
                      message: '请选择营业执照号!',
                    },
                  ],
                })(
                  <Fragment>
                    <Input style={{ width: 200 }} type="text" placeholder="请输入营业执照号" />
                    <div>请填写统一社会信用代码</div>
                  </Fragment>
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
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
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
      </PageHeaderWrapper>
    );
  }
}

export default PayeeAdd;
