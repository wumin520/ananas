import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider, Row, Col } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './PromotionDetail.less';

const { Description } = DescriptionList;
@connect(({ promotion, loading }) => ({
  detailData: promotion.detailData,
  loading: loading.effects['promotion/detailData'],
}))
class OrderDetail extends Component {
  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    dispatch({
      type: 'promotion/detailData',
      payload: {
        task_plan_id: query.task_plan_id,
      },
    });
  };

  render() {
    const { loading, detailData } = this.props;
    const { data } = detailData;
    const content = <div />;
    return (
      <PageHeaderWrapper title="订单详情" loading={loading} content={content}>
        <Card bordered={false} style={{ marginBottom: 26 }}>
          <DescriptionList size="large" title="订单编号：" style={{ marginBottom: 32 }}>
            <Description term="订单状态">
              <Badge status={data.state_color} text={data.state_desc} />
            </Description>
            <Description term="订单来源">{data.type_name}</Description>
            <Description term="订单价格">{data.created_at}</Description>
            <Description term="返现金额">￥{data.rebate_price}</Description>
          </DescriptionList>
          <Card title="商品信息">
            <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
              <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                <Col md={5} sm={24}>
                  <div>
                    <img
                      src={data.img}
                      alt="img"
                      style={{ width: 65, heigth: 65, marginLeft: 10 }}
                    />
                  </div>
                </Col>
                <Col md={18} sm={24} style={{ marginBottom: 32 }}>
                  <Description term="">
                    <p>{data.title}</p>
                  </Description>
                  <Description term="商品id">{data.goods_id}</Description>
                  <Description term="优惠券">
                    {data.coupon_price ? `￥ ${data.coupon_price}` : '无'}{' '}
                  </Description>
                  <Description term="券后价">￥{data.price}</Description>
                </Col>
              </Row>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="所属店铺信息" style={{ marginBottom: 32 }}>
              <Description term="店铺名称">{data.title}</Description>
              <Description term="店铺编号">{data.mall_id}</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card title="订单进度" bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="下单时间">{data.mall_id}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OrderDetail;
