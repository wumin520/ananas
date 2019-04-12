import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './GeneralizeDetail.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: '推广排期时间',
    dataIndex: 'plan_time',
    key: 'plan_time',
  },

  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '完成情况',
    dataIndex: 'planList',
    key: 'planList',
    render: val => {
      return (
        <p>
          {val.map(item => {
            return (
              <p>
                <span>发放份数 {item.total_amount}</span>
                <span>&nbsp;&nbsp;评价人数 {item.proof_num}</span>
                <br />
                <span>下单人数 {item.order_num}</span>
                <span>&nbsp;&nbsp;售后人数 {item.sale_back_num}</span>
              </p>
            );
          })}
        </p>
      );
    },
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class generalizeDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    dispatch({
      type: 'profile/fetchBasic',
      payload: params.task_id || '1',
    });
  }

  render() {
    const { profile = {}, loading } = this.props;
    const { planList, data = {} } = profile;
    const content = <div />;
    return (
      <PageHeaderWrapper title="推广详情" loading={loading} content={content}>
        <Card bordered={false}>
          <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
            <Description term="商品id">{data.goods_id}</Description>
            <Description term="商品名称">{data.goods_name}</Description>
            <Description term="商品主图">
              <img src="" alt="img" style={{ width: 70, heigth: 70 }} />
            </Description>
            <Description term="优惠券">￥{data.coupon_price}</Description>
            <Description term="商品价格">￥{data.price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="推广信息" style={{ marginBottom: 32 }}>
            <Description term="推广编号">{data.task_id}</Description>
            <Description term="推广状态">
              {/* <Badge status={statusMap[val]} text={status[val]} /> */}
              <Badge status="processing" text="审核中" />
            </Description>
            <Description term="申请时间">{data.created_at}</Description>
            <Description term="推广份数">{data.addr}</Description>
            <Description term="返现金额">￥{data.rebate_price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>推广排期进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={planList}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default generalizeDetail;
