import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Alert, Card, Avatar, Icon } from 'antd';

const { Meta } = Card;
const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
// const SalesCard = React.lazy(() => import('./SalesCard'));
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
  // state = {
  //   dataType: 'great_review',
  // };

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
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  // reportRadioOnChange = e => {
  //   console.log('reportRadioOnChange -> ', e);
  //   const val = e.target.value;
  // };

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

  todayPlanRadioOnChange = e => {
    const { value } = e.target;
    this.getListData(value);
    this.tableType = value === '10' ? 0 : value === '20' ? 2 : 1;
  };

  render() {
    const { loading } = this.props;
    const { homedata } = this.props;
    const { homeInfo, listData } = homedata;
    const todayInfo = homeInfo.today_info;
    const taskList = listData.list;
    const noticeInfo = homeInfo.notice_info;
    const salesData = homeInfo.income_info.week_expect_income_list;
    console.log('shusshusushu', listData, salesData);
    return (
      <div>
        <Alert message={noticeInfo} type="info" showIcon style={{ marginBottom: 20 }} />
        <Card style={{ marginBottom: 20 }}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="代理商名称"
            description={
              <div>
                <p>
                  <Icon type="user" /> 邀请码:
                </p>
                <p>
                  <Icon type="cluster" /> 商家邀请链接:
                </p>
              </div>
            }
          />
        </Card>
        <Row>
          <Col xl={13} lg={12} md={12} sm={26} xs={26} style={{ marginRight: 20 }}>
            <Suspense fallback={null}>
              {/* <SalesCard
                // radioGroupOnChange={this.reportRadioOnChange}
                loading={loading}
                salesData={salesData.map(item => {
                  return {
                    x: item.day,
                    y: item.expect_income,
                  };
                })}
              /> */}
            </Suspense>
          </Col>
          <Col xl={10} lg={12} md={12} sm={26} xs={26}>
            <Suspense fallback={<PageLoading />}>
              <IntroduceRow loading={loading} visitData={todayInfo} />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <TodayPlan
            loading={loading}
            data={taskList}
            tableType={this.tableType}
            radioOnChange={this.todayPlanRadioOnChange}
          />
        </Suspense>
      </div>
    );
  }
}

export default Index;
