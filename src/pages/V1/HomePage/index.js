import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Alert } from 'antd';
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
  orderType = 0;

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
    const dataType = val === '0' ? 'great_review' : val === '2' ? 'large_coupon' : 'fans';
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
    if (type === '20') {
      params.state = 4;
      delete params.start_time;
      delete params.end_time;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'homedata/planList',
      payload: params,
    });
  };

  getOrderData = (type = 10) => {
    const params = {
      page: 1,
      state: -1,
      ordered_time_for: start_time,
      ordered_time_to: end_time,
      type,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'homedata/orderData',
      payload: params,
    });
  };

  todayPlanRadioOnChange = e => {
    const { value } = e.target;
    this.getListData(value);
    this.tableType = value === '10' ? 0 : value === '20' ? 2 : 1;
  };

  todayOrderRadioOnChange = e => {
    const { value } = e.target;
    this.getOrderData(value);
    this.orderType = value === '10' ? 0 : 1;
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
                  orderType={this.orderType}
                  pageInfo={dayOrderInfo.page_info}
                  radioOnChange={this.todayOrderRadioOnChange}
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
