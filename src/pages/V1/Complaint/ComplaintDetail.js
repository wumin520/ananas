import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Divider, Steps, Badge, Icon } from 'antd';

import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const { Description } = DescriptionList;
const { Step } = Steps;

@connect(({ complaint, loading }) => ({
  complaintDetail: complaint.complaintDetail,
  loading: loading.models.complaint,
}))
@Form.create()
class ComplaintDetail extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch, location } = this.props;
    const { id } = location.query;
    dispatch({
      type: 'complaint/getOrderComplainDetail',
      payload: {
        id,
      },
    });
  }

  render() {
    const { complaintDetail } = this.props;
    const compainData = complaintDetail.compain_data;
    const orderData = complaintDetail.order_data;
    const taskData = complaintDetail.task_data;

    const contentTitle = <div>申诉编号：{compainData.id}</div>;

    const process = compainData.state === 0 ? 1 : 2;

    const content = (
      <div className={styles.top_header}>
        <div>
          <p>创建时间：{compainData.created_at}</p>
          <p>
            <span style={{ marginRight: '50px', display: 'inline-block' }}>
              申诉原因：{compainData.reason}{' '}
            </span>
            申诉要求：{compainData.ask}
          </p>
          <p>申诉说明：{compainData.content}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p>状态</p>
          <p style={{ fontSize: '20px', color: '#000' }}>{compainData.state_desc}</p>
        </div>
      </div>
    );

    const stepOne = (
      <div>
        <p>{taskData.type_name}</p>
        <p>{compainData.created_at}</p>
      </div>
    );

    const stepTwo = (
      <div>
        <p>超多客</p>
        {process === 1 ? <p style={{ color: '#1890FF' }}>等待审核</p> : <p>审核完成</p>}
      </div>
    );

    const stepThree = (
      <div>
        <p>
          {compainData.state === 1 ? (
            <Fragment>
              <Icon type="check-circle" style={{ color: 'green' }} /> 审核通过
            </Fragment>
          ) : (
            <Fragment>
              <Icon type="close-circle" style={{ color: 'red' }} /> 审核不通过
            </Fragment>
          )}
        </p>
        <p style={{ color: '#1890FF' }}>{compainData.verify_content}</p>
      </div>
    );

    return (
      <PageHeaderWrapper title={contentTitle} content={content}>
        <Card title="流程进度" style={{ marginBottom: '20px' }}>
          <Steps progressDot current={process}>
            <Step title="提交申诉" description={stepOne} />
            <Step title="平台审核" description={stepTwo} />
            <Step title="完成" description={stepThree} />
          </Steps>
        </Card>
        <Card title="订单信息">
          {/** 相关信息 */}
          <Card type="inner" title="相关信息">
            {/** 订单信息 */}
            <p className={styles.complaintDetailTitle}>订单信息</p>
            <DescriptionList size="large" style={{ marginBottom: 32 }}>
              <Description term="订单编号">{orderData.p_order_id}</Description>
              <Description term="订单状态">
                <Badge status={orderData.state_color} text={orderData.state_desc} />
              </Description>
              <Description term="订单金额">{orderData.order_price}</Description>
              <Description term="下单时间">{orderData.ordered_datetime}</Description>
              <Description term="试用报告">
                {orderData.real_images && orderData.real_images.length === 0 ? (
                  '未上传'
                ) : (
                  <span style={{ verticalAlign: 'top', display: 'inline-block' }}>
                    {orderData.real_images &&
                      orderData.real_images.length > 0 &&
                      orderData.real_images.map(e => (
                        <img
                          src={e}
                          style={{
                            width: 100,
                            height: 100,
                            margin: '10px 10px 20px 0',
                            display: 'inline-block',
                          }}
                          alt=""
                        />
                      ))}
                  </span>
                )}
              </Description>
              <Description term="评价图片">
                {orderData.proof_images && orderData.proof_images.length === 0 ? (
                  '未上传'
                ) : (
                  <span style={{ verticalAlign: 'top', display: 'inline-block' }}>
                    {orderData.proof_images &&
                      orderData.proof_images.length > 0 &&
                      orderData.proof_images.map(e => (
                        <img
                          key={e}
                          src={e}
                          style={{
                            width: 100,
                            height: 100,
                            margin: '10px 10px 20px 0',
                            display: 'inline-block',
                          }}
                          alt=""
                        />
                      ))}
                  </span>
                )}
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            {/** 订单来源 */}
            <p className={styles.complaintDetailTitle}>订单来源</p>
            <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
              <Description term="推广编号">{taskData.task_id}</Description>
              <Description term="推广类型">{taskData.type_name}</Description>
              <Description term="推广份数">{taskData.total_amount}</Description>
              <Description term="返现金额">{taskData.fanli_price}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            {/** 商品信息 */}
            <p className={styles.complaintDetailTitle}>商品信息</p>
            <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
              <Description term="商品名称">{taskData.title}</Description>
              <Description term="商品图片">
                <span style={{ verticalAlign: 'top', display: 'inline-block' }}>
                  <img
                    src={taskData.img}
                    style={{
                      width: 100,
                      height: 100,
                      margin: '10px 10px 20px 0',
                      display: 'inline-block',
                    }}
                    alt=""
                  />
                </span>
              </Description>
              <Description term="优惠券">{taskData.coupon_price}</Description>
              <Description term="商品价格">{taskData.price}</Description>
            </DescriptionList>
          </Card>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ComplaintDetail;
