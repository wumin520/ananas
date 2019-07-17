import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Row, Col } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;
@connect(({ promotion, loading }) => ({
  detailData: promotion.detailData,
  loading: loading.effects['promotion/detailData'],
}))
class PromotionDetail extends Component {
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
    const progressColumns = [
      {
        title: '排期时间',
        dataIndex: 'plan_time',
        key: 'plan_time',
      },
      {
        title: '推广份数',
        render: item => {
          return <span>{item.total_amount}</span>;
        },
      },
      {
        title: '排期状态',
        key: 'state',
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '备注',
        render: item => {
          return <span>{item.beizhu ? item.beizhu : ''}</span>;
        },
      },
    ];
    const { data } = detailData;
    const planInfo = detailData.plan_info;
    const content = <div />;
    const taskId = `推广编号: ${data.task_id}`;
    return (
      <PageHeaderWrapper title="推广详情" loading={loading} content={content}>
        <Card bordered={false} style={{ marginBottom: 26 }}>
          <DescriptionList size="large" title={taskId} style={{ marginBottom: 32 }}>
            <Description term="推广状态">
              <Badge status={data.state_color} text={data.state_desc} />
            </Description>
            <Description term="投放方式">{data.type_name}</Description>
            <Description term="推广份数">{data.total_amount}</Description>
            <Description term="申请时间">{data.created_at}</Description>
            <Description term="返现金额">￥{data.rebate_price}</Description>
          </DescriptionList>
          <Card title="商品信息">
            <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
              <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                <Col md={3} sm={24}>
                  <div>
                    <img
                      src={data.img}
                      alt="img"
                      style={{ width: 120, heigth: 120, marginLeft: 10 }}
                    />
                  </div>
                </Col>
                <Col md={18} sm={24} style={{ marginBottom: 32 }}>
                  <Description term="">
                    <a style={{ fontSize: 16 }}>{data.title}</a>
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
        <Card title="推广排期" bordered={false}>
          <Table
            rowKey={item => item.id}
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={planInfo}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PromotionDetail;
