import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, Form, Input, Upload, Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';
import { configs } from '@/defaultSettings';

const content = <div />;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  loading: loading.models.complaint,
}))
@Form.create()
class MyComplaint extends PureComponent {
  state = {
    fileList: [],
    reason: ['恶意退款', '同个地址重复下单', '需要追评', '盗图', '私聊商家'],
    ask: ['处罚用户', '私聊用户'],
  };

  // handleCancel = () => this.setState({ previewVisible: false });

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      console.log('values: ', values);
      if (!err) {
        const { dispatch } = this.props;
        const param = { ...values };
        console.log('param: ', param);
        dispatch({
          type: 'complaint/orderComplain',
          payload: param,
        });
      }
    });
  };

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { fileList, reason, ask } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const uploadButton = (
      <Button>
        <Icon type="upload" /> 上传图片
      </Button>
    );

    const uploadProps = {
      name: 'file',
      action: `${configs[process.env.API_ENV].API_SERVER}/cdk/v1/web/upload`,
      headers: {
        authorization: 'authorization-text',
      },
      listType: 'picture',
      multiple: true,
      data: file => {
        return {
          image: file,
          type: 'static',
        };
      },
      fileList,
      onChange: info => {
        // eslint-disable-next-line no-shadow
        let fileList = [...info.fileList];
        fileList = fileList.slice(-3);

        fileList = fileList.map(file => {
          if (file.response) {
            // eslint-disable-next-line no-param-reassign
            file.url = file.response.url;
          }
          return file;
        });

        this.setState({ fileList });
      },
      // onPreview: file => {
      //   console.log('onPreview file: ', file);
      //   // if (!file.url && !file.preview) {
      //   //   // eslint-disable-next-line no-param-reassign
      //   //   file.preview = await this.getBase64(file.originFileObj);
      //   // }

      //   this.setState({
      //     previewImage: file.response.payload.url,
      //     previewVisible: true,
      //   });
      // },
    };

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

    return (
      <PageHeaderWrapper title="提交申诉" content={content}>
        <Card>
          {/** <Alert message="文案内容由后端返回，没有则不显示" type="info" showIcon closable /> */}
          <div className={styles.formBlock}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="申诉订单">
                {getFieldDecorator('p_order_id', {
                  rules: [
                    {
                      required: true,
                      message: '请输入申诉订单号!',
                    },
                  ],
                })(<Input style={{ width: 200 }} type="text" placeholder="请输入申诉订单号" />)}
              </Form.Item>
              <Form.Item label="申诉原因">
                {getFieldDecorator('reason_type', {
                  rules: [
                    {
                      required: true,
                      message: '请选择申诉原因!',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择申诉原因"
                    style={{ width: 200 }}
                    onChange={this.selectTypeChange}
                  >
                    {reason.length &&
                      reason.map((e, index) => (
                        <Option key={escape} value={index + 1}>
                          {e}
                        </Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="申诉要求">
                {getFieldDecorator('ask_type', {
                  rules: [
                    {
                      required: true,
                      message: '请输入申诉要求',
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择申诉原因"
                    style={{ width: 200 }}
                    onChange={this.selectTypeChange}
                  >
                    {ask.length &&
                      ask.map((e, index) => (
                        <Option key={escape} value={index + 1}>
                          {e}
                        </Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="申诉内容">
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: '请输入申诉内容!',
                    },
                  ],
                })(
                  <TextArea
                    style={{ width: 300 }}
                    placeholder="请输入申诉内容"
                    autosize={{ minRows: 2, maxRows: 6 }}
                  />
                )}
              </Form.Item>
              <Form.Item label="上传凭证">
                {getFieldDecorator('images', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Fragment>
                    <Upload {...uploadProps}>{fileList.length >= 3 ? null : uploadButton}</Upload>
                    {/**
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal> */}
                  </Fragment>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  提交申诉
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MyComplaint;
