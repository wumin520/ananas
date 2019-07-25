import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Divider } from 'antd';

import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const { Description } = DescriptionList;
const content = (
  <div className={styles.top_header}>
    <div>111</div>
    <div>222</div>
  </div>
);

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
    console.log('id: ', id);
    dispatch({
      type: 'complaint/getOrderComplainDetail',
      payload: {
        id,
      },
    });
  }

  render() {
    const { complaintDetail } = this.props;
    console.log('complaintDetail: ', complaintDetail);

    return (
      <PageHeaderWrapper title="我的申诉" content={content}>
        <Card title="订单信息">
          {/** 相关信息 */}
          <DescriptionList size="large" title="相关信息" style={{ marginBottom: 32 }}>
            <Description term="订单编号">111</Description>
            <Description term="订单状态">
              {/* <Badge status={data.state_color} text={data.state_desc} /> */}
            </Description>
            <Description term="订单金额">2222</Description>
            <Description term="下单时间">333</Description>
            <Description term="试用报告">444</Description>
            <Description term="评价图片">3333</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          {/** 订单来源 */}
          <DescriptionList size="large" title="订单来源" style={{ marginBottom: 32 }}>
            <Description term="推广编号">111</Description>
            <Description term="推广类型">
              {/* <Badge status={data.state_color} text={data.state_desc} /> */}
            </Description>
            <Description term="推广份数">2222</Description>
            <Description term="返现金额">333</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          {/** 商品信息 */}
          <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
            <Description term="商品名称">111</Description>
            <Description term="商品图片">
              {/* <Badge status={data.state_color} text={data.state_desc} /> */}
            </Description>
            <Description term="优惠券">2222</Description>
            <Description term="商品价格">333</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ComplaintDetail;
