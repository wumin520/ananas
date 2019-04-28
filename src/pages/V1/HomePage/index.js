import React, { Component, Suspense, Fragment } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Card, Icon, Dropdown, Menu, Badge, Divider, Table, Alert } from 'antd';
import styles from './index.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const TodayOrder = React.lazy(() => import('./todayOrder'));
// const HotRankList = React.lazy(() => import('./HotRankList'));

const statusMap = ['default', 'success'];

@connect(({ loading, homedata }) => ({
  homedata,
  loading: loading.models.homedata,
}))
class Index extends Component {
  columns = [
    {
      key: '1',
      title: '推广编号',
      width: 100,
      dataIndex: 'task_plan_id',
    },
    {
      key: 'goods_id',
      title: '商品id',
      width: 120,
      dataIndex: 'goods_id',
    },
    {
      key: '2',
      title: '商品',
      className: styles.resultColumns,
      render: val => (
        <a
          className={styles.resultColumnsDiv}
          href={val.goods_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
          <span> {val.title}</span>
        </a>
      ),
    },
    {
      key: '3',
      title: '券后价',
      dataIndex: 'after_coupon_price',
      render: val => `￥ ${val}`,
    },
    {
      key: '4',
      title: '优惠券',
      dataIndex: 'coupon_price',
      render: val => {
        return <span>{val ? `￥ ${val}` : '无'}</span>;
      },
    },
    {
      key: '5',
      title: '排期状态',
      render: val => <Badge status={statusMap[val.state]} text={val.state_desc} />,
    },
    {
      key: '6',
      title: '今日完成情况',
      dataIndex: 'task_info',
      render: val => (
        <div className={styles.taskInfo}>
          <p>发放份数 {val.task_amount}</p>
          <p>下单人数 {val.order_num}</p>
          <p>评价人数 {val.comment_num}</p>
        </div>
      ),
    },
    {
      key: '7',
      title: '操作',
      render: record => (
        <Fragment>
          <a onClick={this.goFangdanDetail.bind(this, record)}>查看</a>
          <Divider type="vertical" />
          <a onClick={this.goOrderDetail.bind(this, record)}>订单明细</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'homedata/fetch',
      });
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  goFangdanDetail = item => {
    router.push(`/fangdan/list/generalizeDetail?&task_id=${item.task_id}`);
  };

  goOrderDetail = item => {
    router.push(`/order/Index?task_id=${item.task_id}`);
  };

  render() {
    const { loading } = this.props;
    const { homedata } = this.props;

    const headInfo = homedata.head_info;
    const taskList = homedata.task_plan_list;
    // const hotRank = homedata.hot_rank;
    const dayOrderInfo = homedata.day_order_info;
    const noticeInfo = homedata.notice_info;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    return (
      <GridContent>
        <Alert message={noticeInfo} type="info" showIcon style={{ marginBottom: 20 }} />
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={headInfo} />
        </Suspense>
        <Card
          loading={loading}
          bordered={false}
          title={<FormattedMessage id="app.homePage.todayPromotion" defaultMessage="" />}
          extra={<a href="/fangdan/plan">{'排期列表>'}</a>}
          style={{ marginTop: 24 }}
        >
          <Table
            rowKey={record => record.id}
            size="small"
            loading={loading}
            dataSource={taskList}
            columns={this.columns}
            pagination={{
              style: { marginBottom: 0 },
              pageSize: 5,
            }}
          />
        </Card>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            {/*
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <HotRankList loading={loading} data={hotRank} />
                </Suspense>
              </Col>
            */}
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TodayOrder
                  loading={loading}
                  data={dayOrderInfo.list}
                  pageInfo={dayOrderInfo.page_info}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default Index;
