import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, List, Select } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';

// const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
  goodsDetail: form.goodsDetail,
  category_list: form.category_list,
  category_id: form.category_id,
}))
@Form.create()
class Step2 extends React.PureComponent {
  setMainImage = (item, index) => {
    // console.log(item, index, this.props);
    const { dispatch, goodsDetail } = this.props;
    const arr = goodsDetail.detailImgRecordUrl;
    const firstImage = arr[0];
    arr[0] = item;
    arr[index] = firstImage;
    dispatch({
      type: 'form/updateState',
      payload: {
        goodsDetail: {
          ...goodsDetail,
          detailImgRecordUrl: arr,
        },
      },
    });
  };

  componentDidMount = () => {
    /* eslint-disable */
    const { dispatch, location } = this.props;
    const { goods_id, task_id, action } = location.query;
    this.actionType = action;
    if (action === 'edit') {
      task_id &&
        dispatch({
          type: 'form/queryTaskDetail',
          payload: {
            task_id,
          },
        });
      goods_id &&
        dispatch({
          type: 'form/queryGoodsDetail',
          payload: { goods_id, auto_redirect: 0 },
        });
    }
    dispatch({
      type: 'form/queryCategoryList',
    });
    console.log(window, 'window -> ');
  };

  render() {
    /* eslint-disable */
    const {
      form,
      dispatch,
      submitting,
      goodsDetail,
      category_list,
      category_id,
      location,
    } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { Option } = Select;

    const onPrev = () => {
      router.push('/fangdan/step-form/info');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/updateState',
            payload: {
              goodsDetail: {
                ...goodsDetail,
                ...values,
              },
              category_id: values.category_id,
            },
          });
          let path = `/fangdan/step-form/schedule`;
          if (location.query.qf !== undefined) {
            path = `/fangdan/qf/schedule?qf=${location.query.qf}`;
          }
          router.push(path);
        }
      });
    };
    /* eslint-disable */
    const {
      goods_id,
      cate_name,
      title,
      detailImgRecordUrl,
      coupon_info,
      commission,
      coupon_price,
      comment_limit,
      comment_keyword,
    } = goodsDetail;

    const qf = location.query.qf !== undefined;

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="注意：活动期间请勿随意修改佣金比例和购买价格，否则任务会立即终止，并影响您的信用分"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="商品id">
          {goods_id}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="商品分类">
          {getFieldDecorator('category_id', {
            initialValue: category_id,
            rules: [
              {
                required: true,
                message: '请选择商品分类',
              },
            ],
          })(
            <Select placeholder="请选择商品分类" style={{ maxWidth: 200, width: '100%' }}>
              {category_list.map((item, index) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.cate_name}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品标题">
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [
              {
                required: true,
                message: '请输入商品标题',
              },
            ],
          })(<Input placeholder="请输入商品标题" style={{ width: '80%' }} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品主图">
          <List
            rowKey="id"
            loading={false}
            grid={{ gutter: 24, xl: 3, xxl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={detailImgRecordUrl}
            renderItem={(item, index) => {
              return (
                <List.Item>
                  <img
                    style={{ width: '100%', height: 'auto', marginBottom: 16 }}
                    alt=""
                    src={item}
                  />
                  <Button
                    onClick={() => {
                      this.setMainImage(item, index);
                    }}
                    style={{ display: 'block', margin: '0 auto' }}
                    size="small"
                  >
                    {index === 0 ? '当前主图' : '设为主图'}
                  </Button>
                </List.Item>
              );
            }}
          />
        </Form.Item>

        {/**
          <Divider style={{ margin: '24px 0' }} />
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="评价限制">
          {getFieldDecorator('comment_limit', {
            initialValue: 0,
          })(
            <RadioGroup>
              <Radio value={1}>纯文字免单</Radio>
              <Radio value={0}>文字或图文免单</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="评价关键字">
          {getFieldDecorator('comment_keyword', {
            rules: [{ message: '不得超过15个字符！', max: 15 }],
          })(
            <div style={{ position: 'relative', top: '-3px' }}>
              <Input placeholder="请输入关键字，用逗号“，”隔开(选填)" style={{ width: '80%' }} />{' '}
              <div style={{ color: 'orange' }}>
                不超过15个字，突出宝贝亮点，例如商品描述、物流、正品等
              </div>
            </div>
          )}
          </Form.Item> **/}
        {qf ?  '' : (
        <React.Fragment>
          <Divider style={{ margin: '24px 0' }} />
          {coupon_info.coupon_discount ? (
            <Form.Item {...formItemLayout} className={styles.stepFormText} label="优惠券">
              {coupon_info.coupon_discount}元
            </Form.Item>
          ) : (
            ''
          )}
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="券后价">
            <span className={styles.money}>{coupon_price}</span>
            <span className={styles.uppercase}>（{digitUppercase(coupon_price)}）</span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="单笔返现金额" required={false}>
            {getFieldDecorator('commission', {
              initialValue: coupon_price,
              rules: [
                {
                  required: false,
                  message: '',
                },
              ],
            })(<Input disabled type="number" autoComplete="off" style={{ width: '80%' }} />)}
          </Form.Item>
        </React.Fragment>
        )}
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            下一步
          </Button>
          {this.actionType === 'edit' ? (
            ''
          ) : (
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              上一步
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
