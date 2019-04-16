import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './GeneralizeDetail.less';

const { Description } = DescriptionList;
const statusMap = ['processing', 'success', 'default', 'error'];
const status = ['排期中', '进行中', '已结束', '已暂停'];

@connect(({ task, loading }) => ({
  detailData: task.detailData,
  loading: loading.effects['task/detailData'],
}))
class GeneralizeDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/detailData',
      payload: {
        task_id: 2,
      },
    });
  }

  render() {
    const { loading, detailData } = this.props;
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
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '完成情况',
        render: item => {
          let operation;
          if (item.state === 0) {
            operation = <span>--</span>;
          } else {
            operation = (
              <span>
                <span>发放份数 {item.total_amount}</span>
                <span>&nbsp;&nbsp;评价人数 {item.proof_num}</span>
                <br />
                <span>下单人数 {item.order_num}</span>
                <span>&nbsp;&nbsp;售后人数 {item.sale_back_num}</span>
              </span>
            );
          }
          return <span>{operation}</span>;
        },
      },
      {
        title: '操作',
        render(item) {
          let operation;
          if (item.state === 0 || item.state === 1) {
            operation = <a href="">下架</a>;
          }
          return <span>{operation}</span>;
        },
      },
    ];
    const planList = [
      {
        key: 1,
        plan_time: '2019-03-01',
        state: 0, // 0 排期中 1 进行中 2 已结束 3已暂停
        total_amount: 2000, // 排期份数
        proof_num: 1000, // 评价人数
        order_num: 1500, // 下单人数
        sale_back_num: 400, // 售后人数
      },
      {
        key: 2,
        plan_time: '2019-03-01',
        state: 1,
        total_amount: 2000,
        comment_num: 1000,
        order_num: 1500,
        sale_back_num: 400,
      },
      {
        key: 3,
        plan_time: '2019-03-01',
        state: 2,
        total_amount: 2000,
        comment_num: 1000,
        order_num: 1500,
        sale_back_num: 400,
      },
    ];
    const { data } = detailData;
    // const planList = detailData.plan_list;
    const content = <div />;
    return (
      <PageHeaderWrapper title="推广详情" loading={loading} content={content}>
        <Card bordered={false}>
          <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
            <Description term="商品id">{data.goods_id}</Description>
            <Description term="商品名称" className={styles.pro_name}>
              {data.title}
            </Description>
            <Description term="商品主图">
              <img src={data.img} alt="img" style={{ width: 65, heigth: 65 }} />
            </Description>
            <Description term="优惠券">￥{data.coupon_price}</Description>
            <Description term="商品价格">￥{data.price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="推广信息" style={{ marginBottom: 32 }}>
            <Description term="推广编号">{data.task_id}</Description>
            <Description term="推广状态">
              <Badge status={statusMap[data.state]} text={status[data.state]} />
              {/* <Badge status="processing" text="审核中" /> */}
            </Description>
            <Description term="申请时间">{data.created_at}</Description>
            <Description term="推广份数">{data.total_amount}</Description>
            <Description term="返现金额">￥{data.rebate_price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32, fontWeight: 600 }} />
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

export default GeneralizeDetail;
