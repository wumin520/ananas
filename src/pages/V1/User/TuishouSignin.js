import React, { Component } from 'react';
import { Card, Alert, Form, Input, Button, Upload, Icon, Row, Col, message, Modal } from 'antd';
import { connect } from 'dva';
import constants from '@/utils/apiConstants';

import styles from './TuishouSignin.less';

@connect(({ login, loading }) => ({
  login,
  loading: loading.effects['login/tuishouSettleIn'],
}))
@Form.create()
class TuishouSignin extends Component {
  state = {
    imageUrlArr: ['', ''],
    previewImage: '',
    previewVisible: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { imageUrlArr } = this.state;
        const arr = imageUrlArr.find(item => {
          return item === '';
        });
        console.log(arr, '');
        if (arr && arr.length > 0) {
          message.error('请先上传身份证正反面');
          return;
        }
        dispatch({
          type: 'login/tuishouSettleIn',
          payload: {
            ...values,
            front: imageUrlArr[0],
            back: imageUrlArr[1],
          },
        });
      }
    });
  };

  handleChange = (info, index) => {
    const { imageUrlArr } = this.state;
    console.log('info -> ', info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const imageUrl = info.file.response.payload.url;
      imageUrlArr[index] = imageUrl;
      console.log('imageUrlArr -> ', imageUrlArr);
      this.setState({
        imageUrlArr,
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = previewImage => {
    this.setState({
      previewImage,
      previewVisible: true,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { imageUrlArr, previewImage, previewVisible } = this.state;
    console.log(constants, 'constants -> ');
    const UploadButton = ({ btnText }) => (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{btnText}</div>
      </div>
    );
    const uploadProps = {
      name: 'avatar',
      listType: 'picture-card',
      className: 'avatar-uploader',
      showUploadList: false,
      action: constants.uploadURL,
      headers: {
        authorization: 'authorization-text',
      },
      data: file => {
        return {
          image: file,
          type: 'avatar',
        };
      },
    };
    const props = {
      name: 'file',
      action: constants.uploadURL,
      headers: {
        authorization: 'authorization-text',
      },
      data: file => {
        return {
          image: file,
          type: 'avatar',
        };
      },
    };
    return (
      <div style={{ width: 544, margin: '0 auto' }}>
        <Alert
          message="以下资料必须真实有效，不得盗用他人信息，若引起法律问题，平台概不负责！"
          type="info"
          showIcon
        />
        <Card
          className={styles.card}
          style={{ width: 504, margin: '40px auto 0' }}
          title="推手认证"
          bordered={false}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('real_name', {
                rules: [{ required: true, message: '请输入正确的姓名', min: 2, max: 7 }],
              })(<Input placeholder="请输入您的真实姓名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('id_card', {
                rules: [
                  {
                    required: true,
                    message: '请填写姓名所对应的身份证号',
                    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                  },
                ],
              })(<Input placeholder="请填写姓名所对应的身份证号" />)}
            </Form.Item>
            <Form.Item>
              <Row gutter={16}>
                {imageUrlArr.map((item, index) => {
                  return (
                    <Col key={Math.random()} span={12}>
                      {item ? (
                        <div className={styles.imgWrap}>
                          <img
                            onClick={() => {
                              this.handlePreview(item);
                            }}
                            className={styles.imgAuto}
                            alt=""
                            src={item}
                          />
                          <Upload
                            {...props}
                            onChange={info => {
                              this.handleChange(info, index);
                            }}
                            className={styles.uploadCustomStyle}
                          >
                            <div className={styles.uploadAgainBtn}>重新上传</div>
                          </Upload>
                        </div>
                      ) : (
                        <Upload
                          {...uploadProps}
                          onChange={info => {
                            this.handleChange(info, index);
                          }}
                        >
                          <UploadButton btnText={index === 0 ? '身份证正面' : '身份证反面'} />
                        </Upload>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </Form.Item>
            <Form.Item>
              <p className={styles.tips}>
                1. 需上传清晰的身份证正面、反面共2张照片。 <br /> 2.
                照片不超过5MB，支持格式jpg，jpeg，png。
              </p>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" block>
                立即提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default TuishouSignin;
