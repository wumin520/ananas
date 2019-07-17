import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider, Row, Col } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;
@connect(({ promotion, loading }) => ({
  proDetailData: promotion.proDetailData,
  loading: loading.effects['promotion/proDetailData'],
}))
class OrderDetail extends Component {
  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    dispatch({
      type: 'promotion/proDetailData',
      payload: {
        order_id: query.order_id,
      },
    });
  };

  render() {
    const { loading, proDetailData } = this.props;
    const orderInfo = proDetailData.order_info;
    const productInfo = proDetailData.product_info;
    const shopInfo = proDetailData.shop_info;
    const content = <div />;
    const orderId = `订单编号： ${orderInfo.p_order_id}`;
    return (
      <PageHeaderWrapper title="订单详情" loading={loading} content={content}>
        <Card bordered={false} style={{ marginBottom: 26 }}>
          <DescriptionList size="large" title={orderId} style={{ marginBottom: 32 }}>
            <Description term="订单状态">
              <Badge status={orderInfo.state_color} text={orderInfo.state_desc} />
            </Description>
            <Description term="订单来源">推广编号{orderInfo.task_id}</Description>
            <Description term="订单价格">{orderInfo.price}</Description>
            <Description term="返现金额">￥{orderInfo.rebate_money}</Description>
          </DescriptionList>
          <Card title="商品信息">
            <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
              <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                <Col md={3} sm={24}>
                  <div>
                    <img
                      src={productInfo.img}
                      alt="img"
                      style={{ width: 120, heigth: 120, marginLeft: 10 }}
                    />
                  </div>
                </Col>
                <Col md={18} sm={24} style={{ marginBottom: 32 }}>
                  <Description term="">
                    <a style={{ fontSize: 16 }}>{productInfo.title}</a>
                  </Description>
                  <Description term="商品id">{productInfo.goods_id}</Description>
                  <Description term="优惠券">
                    {productInfo.coupon_price ? `￥ ${productInfo.coupon_price}` : '无'}{' '}
                  </Description>
                  <Description term="券后价">￥{productInfo.after_coupon_price}</Description>
                </Col>
              </Row>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="所属店铺信息" style={{ marginBottom: 32 }}>
              <Description term="店铺名称">{shopInfo.shop_name}</Description>
              <Description term="店铺编号">{shopInfo.shop_id}</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card title="订单进度" bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="下单时间">{orderInfo.ordered_datetime}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OrderDetail;
