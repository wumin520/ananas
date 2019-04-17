import React, { Component, Suspense, Fragment } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Card, Icon, Dropdown, Menu, Badge, Divider, Table, Tabs, Modal } from 'antd';
import styles from './index.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const OrderDetail = React.lazy(() => import('./OrderDetail'));
const HotRankList = React.lazy(() => import('./HotRankList'));

const { TabPane } = Tabs;
const { confirm } = Modal;

const statusMap = ['error', 'success'];
const status = ['已下架', '进行中'];

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
      dataIndex: 'state',
      render: val => <Badge status={statusMap[val]} text={status[val]} />,
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
      render: (val, record) => (
        <Fragment>
          <a>查看</a>
          <Divider type="vertical" />
          <a href="">订单明细</a>
          <Divider type="vertical" />
          {val === 0 ? (
            <a onClick={() => this.planUp(record.task_plan_id)}>上架</a>
          ) : (
            <a onClick={() => this.planDown(record.task_plan_id)}>下架</a>
          )}
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

  planUp = s => {
    const { dispatch } = this.props;
    confirm({
      title: '确定上架此商品？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'homedata/toPlanUp',
          payload: {
            task_plan_id: s,
          },
        });
      },
    });
  };

  planDown = s => {
    const { dispatch } = this.props;
    confirm({
      title: '确定下架此商品？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'homedata/toPlanDown',
          payload: {
            task_plan_id: s,
          },
        });
      },
    });
  };

  render() {
    const { loading } = this.props;
    const { homedata } = this.props;

    const headInfo = homedata.head_info;
    const taskList = homedata.task_plan_list;
    const hotRank = homedata.hot_rank;
    const orderList = homedata.order_list;

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
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={headInfo} />
        </Suspense>
        <Card fallback={null}>
          <Tabs
            tabBarExtraContent={
              <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                  <a>
                    <FormattedMessage id="app.homePage.fangdanList" defaultMessage="All Day" />
                  </a>
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
