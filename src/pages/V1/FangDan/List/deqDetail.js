import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './GeneralizeDetail.less';

const { Description } = DescriptionList;
const { confirm } = Modal;
@connect(({ task, user, loading }) => ({
  detailData: task.detailData,
  currentUser: user.currentUser,
  loading: loading.effects['task/detailData'],
}))
class GeneralizeDetail extends Component {
  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    dispatch({
      type: 'task/detailData',
      payload: {
        task_id: query.task_id,
      },
    });
  };

  // 下架
  planDown = item => {
    const { dispatch } = this.props;
    const thises = this;
    confirm({
      title: '确认要下架吗？',
      content: '下架后排期将暂停，暂停当天商品不会展示，确认要下架吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'task/planDownData',
          payload: {
            task_plan_id: item.task_plan_id,
          },
        }).then(() => {
          thises.getDetailData();
        });
      },
    });
  };

  // 上架
  planUp = item => {
    const { dispatch } = this.props;
    const thises = this;
    confirm({
      title: '确认要上架吗？',
      content: '请确保您的佣金/价格或商品状态符合《商品上架规则》',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'task/planUpData',
          payload: {
            task_plan_id: item.task_plan_id,
          },
        }).then(() => {
          thises.getDetailData();
        });
      },
    });
  };

  render() {
    const { loading, detailData, currentUser } = this.props;
    const { data } = detailData;
    const content = <div />;
    return (
      <PageHeaderWrapper title="推广详情" loading={loading} content={content}>
        <Card bordered={false}>
          <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
            <Description term="商品id">{data.goods_id}</Description>
            <Description term="商品名称" className={styles.pro_name}>
              {data.title}
            </Description>
            <Description term="">
              <div className={styles.pro_img}>
                <p>商品主图: </p>
                <img src={data.img} alt="img" style={{ width: 65, heigth: 65, marginLeft: 10 }} />
              </div>
            </Description>
            <Description term="优惠券">
              {data.coupon_price ? `￥ ${data.coupon_price}` : '无'}{' '}
            </Description>
            <Description term="优惠券数量">{data.coupon_info.coupon_total_quantity}</Description>
            {currentUser.sh_type === 1 ? (
              <Description term="招商ID">{data.zs_duo_id}</Description>
            ) : (
              ''
            )}
            <Description term="商品价格">￥{data.price}</Description>
            <Description term="佣金">{data.commission_rate}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="推广信息" style={{ marginBottom: 32 }}>
            <Description term="推广编号">{data.task_id}</Description>
            <Description term="推广状态">
              <Badge status={data.state_color} text={data.state_desc} />
            </Description>
            <Description term="申请时间">{data.created_at}</Description>
            <Description term="推广开始时间">{data.start_time}</Description>
            <Description term="推荐理由">{data.recommend_reason}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default GeneralizeDetail;
