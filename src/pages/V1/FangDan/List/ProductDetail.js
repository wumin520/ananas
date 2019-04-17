import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './GeneralizeDetail.less';

const { Description } = DescriptionList;
const statusMap1 = ['warning', 'processing', 'success', 'error', 'warning', 'default'];
const status1 = ['待支付', '审核中', '进行中', '审核驳回', '清算中', '已完成'];

@connect(({ task, loading }) => ({
  orderDetail: task.orderDetail,
  loading: loading.effects['task/orderDetail'],
}))
class ProductDetail extends Component {
  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    console.log('this.props:', query.task_id);
    dispatch({
      type: 'task/orderDetail',
      payload: {
        order_id: query.order_id,
      },
    });
  };

  render() {
    const { loading, orderDetail } = this.props;
    console.log('orderDetail', orderDetail);
    const { data } = orderDetail;
    const content = <div />;
    return (
      /* eslint-disable */
      <PageHeaderWrapper title="订单详情" loading={loading} content={content}>
        <Card bordered={false}>
          <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
            <Description term="商品id">{data.goods_id}</Description>
            <Description term="商品名称" className={styles.pro_name}>
              {data.title}
            </Description>
            <Description term="商品主图">
              <img src={data.img} alt="img" style={{ width: 65, heigth: 65 }} />
            </Description>
            <Description term="优惠券">￥{data.coupon}</Description>
            <Description term="商品价格">￥{data.price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="订单编号">{data.p_order_id}</Description>
            <Description term="订单状态">
              <Badge status={statusMap1[data.state]} text={status1[data.state]} />
            </Description>
            <Description term="来源">推广编号{data.task_id}</Description>
            <Description term="订单价格">{data.order_price}</Description>
            <Description term="返现金额">￥{data.rebate_price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <DescriptionList size="large" title="订单进度" style={{ marginBottom: 32 }}>
            <div style={{ paddingLeft: 16 }}>
              <p>{data.paid_datetime ? '下单时间:' + data.paid_datetime : ''}</p>
              <p>{data.ordered_datetime ? '支付时间:' + data.ordered_datetime : ''}</p>
              <p>{data.harvest_time ? '收货时间:' + data.harvest_time : ''}</p>
              <p>{data.harvest_time ? '好评时间:' + data.harvest_time : ''}</p>
            </div>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProductDetail;
