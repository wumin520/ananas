import React, { Component, Suspense, Fragment } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Card, Icon, Dropdown, Menu, Badge, Divider, Table, Tabs } from 'antd';
import styles from './index.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const OrderDetail = React.lazy(() => import('./OrderDetail'));
const HotRankList = React.lazy(() => import('./HotRankList'));

const { TabPane } = Tabs;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['success', 'error'];
const status = ['进行中', '已下架'];

@connect(({ chart, loading, homedata }) => ({
  homedata,
  chart,
  loading: loading.models.homedata,
}))
class Index extends Component {
  columns = [
    {
      key: '1',
      title: '推广编号',
      dataIndex: 'task_id',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      key: '2',
      title: '商品',
      dataIndex: 'title',
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
      render: () => (
        <Fragment>
          <a>查看</a>
          <Divider type="vertical" />
          <a href="">订单明细</a>
          <Divider type="vertical" />
          <a href="">下架/上架</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
    dispatch({
      type: 'homedata/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  };

  render() {
    const { loading } = this.props;
    const { homedata } = this.props;

    const headInfo = homedata.head_info;
    const taskList = homedata.task_list;
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
                loading={loading}
                dataSource={taskList}
                columns={this.columns}
                onChange={this.handleStandardTableChange}
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
