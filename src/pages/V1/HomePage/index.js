import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Alert, Icon } from 'antd';
import { Link } from 'umi';
import styles from './index.less';
import { getStorage, setStorage } from '@/utils/authority';

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
    isShowPop: 0, // 活动弹框 0 不显示 1 显示
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

    // storage -> isShowPop -> false 不显示充值活动弹框
    const isShowPop = getStorage('isShowPop') || '1';
    this.setState({
      isShowPop,
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  reportRadioOnChange = e => {
    // console.log('reportRadioOnChange -> ', e);
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

  closePop = () => {
    this.setState({
      isShowPop: 0,
    });
    setStorage('isShowPop', 0);
  };

  render() {
    const { loading, homedata } = this.props;
    const { isShowPop } = this.state;

    const headInfo = homedata.head_info;
    const taskList = homedata.planData.list;
    const taskReportInfo = homedata.task_report_info;
    // const hotRank = homedata.hot_rank;
    const dayOrderInfo = homedata.orderData;
    const noticeInfo = homedata.notice_info;
    const rechargeActivityState = homedata.recharge_activity_state;
    const actShow = isShowPop === '1' && rechargeActivityState === 1;
    /* eslint-disable */
    const salesData = taskReportInfo[this.state.dataType];

    return (
      <GridContent>
        <Alert message={noticeInfo} type="warning" showIcon style={{ marginBottom: 20 }} />
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            zIndex: '1000',
            display: actShow ? 'block' : 'none',
          }}
        >
          <Link to="/public/rechargeActivity">
            <img
              src="https://cdn.youlianyc.com/image/static/69012a2bdb29abab0cf42a5800000e3728d39447.jpg"
              alt=""
            />
          </Link>
          <Icon
            type="close"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              zIndex: 1001,
              fontSize: '20px',
              color: '#fff',
            }}
            onClick={this.closePop}
          />
        </div>
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
