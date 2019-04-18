import React, { Component, Suspense, Fragment } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Card, Icon, Dropdown, Menu, Badge, Divider, Table, Tabs, Alert } from 'antd';
import styles from './index.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const OrderDetail = React.lazy(() => import('./OrderDetail'));
const HotRankList = React.lazy(() => import('./HotRankList'));

const { TabPane } = Tabs;

const statusMap = ['error', 'success'];

@connect(({ loading, homedata }) => ({
  homedata,
  loading: loading.models.homedata,
}))
class Index extends Component {
  columns = [
    {
      key: '1',
      title: '推广编号',
      dataIndex: 'task_plan_id',
    },
    {
      key: '2',
      title: '商品',
      render: val => (
        <p>
          <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
          <span> {val.title}</span>
        </p>
      ),
    },
    {
      key: '3',
      title: '价格',
      dataIndex: 'price',
      render: val => `￥ ${val}`,
    },
    {
      key: '4',
      title: '优惠券',
      dataIndex: 'coupon',
      render: val => `￥ ${val}`,
    },
    {
      key: '5',
      title: '状态',
      render: val => <Badge status={statusMap[val.state]} text={val.state_desc} />,
    },
    {
      key: '6',
      title: '推广份数',
      dataIndex: 'task_info',
      render: val => (
        <div className={styles.taskInfo}>
          <p>
            发放份数 {val.task_amount} 评价人数 {val.comment_num}
          </p>
          <p>
            下单人数 {val.order_num} 售后人数 {val.sale_back_num}
          </p>
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
    router.push(`/fangdan/list/ProductDetail?order_id=${item.order_id}`);
  };

  render() {
    const { loading } = this.props;
    const { homedata } = this.props;

    const headInfo = homedata.head_info;
    const taskList = homedata.task_plan_list;
    const hotRank = homedata.hot_rank;
    const orderList = homedata.order_list;
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
        <Card fallback={null}>
          <Tabs
            tabBarExtraContent={
              <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                  <a href="/fangdan/schedule-list">{'排期列表>'}</a>
                </div>
              </div>
            }
            size="large"
            defaultActiveKey="sales"
          >
            <TabPane
              tab={<FormattedMessage id="app.homePage.todayPromotion" defaultMessage="Sales" />}
              key="sales"
            >
              <Table
                rowKey={record => record.id}
                loading={loading}
                dataSource={taskList}
                columns={this.columns}
              />
            </TabPane>
          </Tabs>
        </Card>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <HotRankList loading={loading} data={hotRank} />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <OrderDetail loading={loading} data={orderList} dropdownGroup={dropdownGroup} />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default Index;
