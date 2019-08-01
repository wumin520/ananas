import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Modal, Row, Col, Tooltip, Icon } from 'antd';
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
    const { loading, detailData } = this.props;
    const progressColumns = [
      {
        title: '推广排期时间',
        dataIndex: 'plan_time',
        key: 'plan_time',
      },
      {
        title: '投放份数',
        render: item => {
          return <span>{item.total_amount}</span>;
          // let operation;
          // if (item.state === 0) {
          //   operation = <span>--</span>;
          // } else {
          //   operation = (
          //     <span>
          //       <span>{item.total_amount}</span>
          //       <span>&nbsp;&nbsp;评价人数 {item.proof_num}</span>
          //       <br />
          //       <span>下单人数 {item.order_num}</span>
          //       <span>&nbsp;&nbsp;售后人数 {item.sale_back_num}</span>
          //     </span>
          //   );
          // }
          // return <span>{operation}</span>;
        },
      },
      {
        title: '状态',
        key: 'state',
        render(item) {
          let option = '';
          if (item.state !== 4) {
            option = <Badge status={item.state_color} text={item.state_desc} />;
          }
          return option;
        },
      },
      // {
      //   title: '操作',
      //   render: item => {
      //     let operation;
      //     if (item.state === 0) {
      //       operation = <a onClick={this.planDown.bind(this, item)}>下架</a>;
      //     }
      //     if (item.state === 3) {
      //       operation = <a onClick={this.planUp.bind(this, item)}>上架</a>;
      //     }
      //     return <span>{operation}</span>;
      //   },
      // },
    ];
    const planList = detailData.plan_list;
    const { data } = detailData;
    const content = <div />;
    const taskId = `推广编号: ${data.task_id}`;
    return (
      <PageHeaderWrapper title="推广详情" loading={loading} content={content}>
        <Card bordered={false} style={{ marginBottom: 26 }}>
          <DescriptionList size="large" title={taskId} style={{ marginBottom: 32 }}>
            <Description term="推广类型">{data.type_name}</Description>
            <Description term="申请时间">{data.created_at}</Description>
            <Description term="推广状态">
              <Badge status={data.state_color} text={data.state_desc} />
              {data.state === 6 ? (
                <p>
                  <Tooltip
                    title={
                      <div className={styles.toolP}>
                        <p>手动终止：主动终止推广</p>
                        <p>系统终止：因券或佣金等变更下架终止</p>
                        <p>自然终止：推广结束后自动终止</p>
                      </div>
                    }
                  >
                    <Icon type="question-circle" style={{ marginRight: 8 }} />
                  </Tooltip>
                  {data.finsh_desc}：{data.finish_time}
                </p>
              ) : (
                ''
              )}
            </Description>
            <Description term="推广份数">{data.total_amount}</Description>
            <Description term="返款总额">￥{data.frozen_money}</Description>
            <Description term="平台服务费">￥{data.service_money}</Description>
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
                    <a href={data.goods_url} style={{ fontSize: 16 }}>
                      {data.title}
                    </a>
                  </Description>
                  <Description term="商品id">{data.goods_id}</Description>
                  <Description term="优惠券">
                    {data.coupon_price ? `￥ ${data.coupon_price}` : '无'}{' '}
                  </Description>
                  <Description term="券后价">￥{data.after_coupon_price}</Description>
                </Col>
              </Row>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="所属店铺信息" style={{ marginBottom: 32 }}>
              <Description term="店铺名称">{data.mall_name}</Description>
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
            dataSource={planList}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default GeneralizeDetail;
