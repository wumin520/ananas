import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Icon, Dropdown, Menu, Alert } from 'antd';
import styles from './index.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const TodayOrder = React.lazy(() => import('./todayOrder'));
const SalesCard = React.lazy(() => import('./SalesCard'));
const TodayPlan = React.lazy(() => import('./todayPlan'));

const time = moment().format('YYYY-MM-DD');
/* eslint-disable */
const start_time = `${time} 00:00:00`;
const end_time = `${time} 23:59:59`;

@connect(({ loading, homedata }) => ({
  homedata,
  loading: loading.effects['homedata/fetch'],
}))
class Index extends Component {
  state = {
    dataType: 'great_review',
  };

  tableType = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'homedata/fetch',
      });
    });
    this.getListData();
    this.getOrderData();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  reportRadioOnChange = e => {
    console.log('reportRadioOnChange -> ', e);
    const val = e.target.value;
    const dataType = val === '0' ? 'great_review' : 'fans';
    this.setState({
      dataType,
    });
  };

  // 接口
  getListData = (type = 10) => {
    const params = {
      page: 1,
      task_id: 0,
      goods_id: 0,
      state: -1,
      type,
      start_time,
      end_time,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'homedata/planList',
      payload: params,
    });
  };

  getOrderData = () => {
    const params = {
      page: 1,
      state: -1,
      ordered_time_for: start_time,
      ordered_time_to: end_time,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'homedata/orderData',
      payload: params,
    });
  };

  todayPlanRadioOnChange = e => {
    this.getListData(e.target.value);
    this.tableType = e.target.value === '10' ? 0 : 1;
  };

  render() {
    const { loading } = this.props;
    const { homedata } = this.props;

    const headInfo = homedata.head_info;
    const taskList = homedata.planData.list;
    const taskReportInfo = homedata.task_report_info;
    // const hotRank = homedata.hot_rank;
    const dayOrderInfo = homedata.orderData;
    const noticeInfo = homedata.notice_info;
    console.log('taskReportInfo -> ', taskReportInfo, homedata);
    /* eslint-disable */
    const salesData = taskReportInfo[this.state.dataType];
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
        <Suspense fallback={null}>
          <SalesCard
            radioGroupOnChange={this.reportRadioOnChange}
            loading={loading}
            dataType={this.state.dataType}
            salesData={salesData.map(item => {
              return {
                x: item.day,
                y: item.amount,
              };
            })}
          />
        </Suspense>
        <Suspense fallback={null}>
          <TodayPlan
            loading={loading}
            data={taskList}
            tableType={this.tableType}
            radioOnChange={this.todayPlanRadioOnChange}
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
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
