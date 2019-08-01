/* eslint-disable react/prefer-stateless-function */
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import React, { Component, Suspense } from 'react';
import { Alert, Avatar, Col, Card, Row, Tooltip, Icon, Button, Tabs, message, Popover } from 'antd';
import { connect } from 'dva';
import * as clipboard from 'clipboard-polyfill';
import moment from 'moment';

import { MiniArea, ChartCard } from '@/components/Charts';
import PageLoading from '@/components/PageLoading';
import styles from './Dashboard.less';

const { TabPane } = Tabs;
const TodayPlan = React.lazy(() => import('./todayPlan'));

@connect(({ user, dashboard, loading }) => ({
  dashboard,
  currentUser: user.currentUser,
  loading: loading.effects['dashboard/queryHomeData'],
}))
class Dashboard extends Component {
  constructor(options) {
    super(options);
    this.tableType = 0;
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/queryHomeData',
    });
    this.getListData();
  }

  getListData = (type = 10) => {
    const time = moment().format('YYYY-MM-DD');
    /* eslint-disable */
    const start_time = `${time} 00:00:00`;
    const end_time = `${time} 23:59:59`;
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
      type: 'dashboard/planlist',
      payload: params,
    });
  };

  todayPlanRadioOnChange = e => {
    /* eslint-disable */
    const { value } = e.target;
    this.getListData(value);
    this.tableType = value === '10' ? 0 : value === '20' ? 2 : 1;
  };

  copyToClipboard = text => {
    try {
      clipboard.writeText(text).then(() => {
        message.success('复制成功');
      });
    } catch (error) {}
  };

  render() {
    const {
      currentUser,
      dashboard,
      loading,
      dashboard: {
        bd_info,
        sh_info,
        income_info,
        sharing_rules,
        notice_info,
        today_info,
        list,
        page_info,
      },
    } = this.props;
    const noticeInfo = '通知';
    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar
              style={{
                backgroundColor: '#1890FF',
                verticalAlign: 'middle',
                fontSize: 28,
                fontWeight: 'bold',
                lineHeight: '72px',
              }}
              size="large"
              src={currentUser.avatar}
            >
              {currentUser.info &&
                currentUser.info.name &&
                currentUser.info.name.substr(0, 1).toUpperCase()}
            </Avatar>
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>{sh_info.name}</div>
            <div>
              <Icon type="user" />
              邀请码：{sh_info.invitation_code}{' '}
              <Button
                onClick={() => {
                  this.copyToClipboard(sh_info.invitation_code);
                }}
                size="small"
              >
                复制
              </Button>
            </div>
            <div>
              <Icon type="global" />
              商家邀请链接：<a href={sh_info.invitation_url}>{sh_info.invitation_url}</a>
            </div>
          </div>
        </div>
      ) : null;

    const qrcodePop = (
      <div className={styles.qrcodePop}>
        <div>扫一扫添加运营企业微信</div>
        <img src={bd_info.qrcode} />
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <div>
            <Avatar size="large" src={bd_info.avatar} />
          </div>
          <div>{bd_info.label}</div>
          <Popover placement="left" content={qrcodePop}>
            <div>
              <Button>联系TA</Button>
            </div>
          </Popover>
        </div>
      </div>
    );
    const visitData = [];
    const beginDay = new Date().getTime();
    const cdata = income_info.week_expect_income_list;
    for (let i = 0; i < cdata.length; i += 1) {
      const item = cdata[i];
      visitData.push({
        x: item.day,
        y: item.expect_income,
      });
    }
    console.log('cdata -> ', cdata, visitData);
    /* eslint-disable */
    const xAxis = {
      label: {
        formatter: val => {
          return val.substr(-6);
        },
        rotate: 0,
        offset: 20,
      },
      line: {
        lineWidth: 1,
      },
    };
    const yAxis = {
      line: {
        lineWidth: 1,
      },
      label: {
        formatter: val => {
          console.log('yAxis -> ', val);
          return parseInt(val, 10);
        },
      },
      grid: {
        align: 'center', // 网格顶点从两个刻度中间开始
        type: 'line', // 网格的类型
        lineStyle: {
          stroke: '#d9d9d9', // 网格线的颜色
          lineWidth: 1, // 网格线的宽度复制代码
          lineDash: [4, 4], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
        }, // 网格线的样式配置，原有属性为 line
      },
    };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const incomes = `￥${today_info.sh_recharge}`;
    /* eslint-disable */
    return (
      <div className={styles.zsDashboard}>
        <GridContent>
          {notice_info ? (
            <Alert message={notice_info} type="info" showIcon style={{ marginBottom: 20 }} />
          ) : (
            ''
          )}
          <div className={styles.row}>
            <div className={styles.content}>{pageHeaderContent}</div>
            <div className={styles.extraContent}>{extraContent}</div>
          </div>
          <Row gutter={10}>
            <Col span={14}>
              <Card bordered={false} bodyStyle={{ paddingTop: 0 }}>
                <div className={styles.incomeMessage}>
                  <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                    <TabPane tab="收入概况" key="sales">
                      <div className={styles.income_} style={{ display: 'flex' }}>
                        <div style={{ flex: 'auto' }}>
                          <div>今日预计订单分成(元)</div>
                          <div className={styles.todayEarn}>
                            ￥{income_info.today_expect_income}
                          </div>
                        </div>
                        {income_info.show_member_income === 1 ? (
                          <div style={{ flex: 'auto' }}>
                            <div>今日预计会员分成(元)</div>
                            <div className={styles.todayEarn}>
                              ￥{income_info.today_member_income}
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                        <div style={{ flex: 'auto' }}>
                          <div>累计预计总分成(元)</div>
                          <div className={styles.totalEarn}>
                            ￥{income_info.total_expect_income}
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 30, paddingBottom: 28 }}>收入趋势</div>
                      <div style={{ marginTop: 30, paddingBottom: 20 }}>
                        <MiniArea
                          line={true}
                          height={180}
                          data={visitData}
                          chartPadding={[15, 30, 40, 30]}
                          xAxis={xAxis}
                          yAxis={yAxis}
                        />
                      </div>
                    </TabPane>
                  </Tabs>
                  <div className={styles.rules}>
                    <Tooltip title={<div style={{ whiteSpace: 'pre-wrap' }}>{sharing_rules}</div>}>
                      <Icon type="question-circle" className={styles.icon} />
                    </Tooltip>
                    分成规则
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={10}>
              <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
                <div className={styles.salesCard}>
                  <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                    <TabPane tab="商家推广概况" key="sales">
                      <ChartCard
                        bordered={false}
                        title="商家数据"
                        action={
                          <Tooltip
                            title={
                              <div className={styles.toolP}>
                                <p>1.新商家入驻：今日商家入驻人数</p>
                                <p>2.今日商家充值：今日内商家充值总金额</p>
                              </div>
                            }
                          >
                            <Icon type="question-circle" />
                          </Tooltip>
                        }
                        loading={loading}
                        contentHeight={80}
                      >
                        <Row>
                          <Col sm={12} xs={24}>
                            <Info title="新商家入驻" value={today_info.new_sh_num} bordered />
                          </Col>
                          <Col sm={12} xs={24}>
                            <Info title="今日商家充值" value={incomes} />
                          </Col>
                        </Row>
                      </ChartCard>
                      <ChartCard
                        bordered={false}
                        title="商家推广情况"
                        action={
                          <Tooltip
                            title={
                              <div className={styles.toolP}>
                                <p>
                                  1.试用推广：今日进行中的试用推广数，0点下架的不计算在内，其余时间下架的仍计算在内
                                </p>
                                <p>
                                  2.高佣推广：今日进行中的高佣推广数，0点下架的不计算在内，其余时间下架的仍计算在内
                                </p>
                                <p>3.收藏推广：今日进行中的收藏推广数</p>
                              </div>
                            }
                          >
                            <Icon type="question-circle" />
                          </Tooltip>
                        }
                        loading={loading}
                        contentHeight={80}
                      >
                        <Row>
                          <Col sm={8} xs={24}>
                            <Info title="试用推广" value={today_info.great_review_num} bordered />
                          </Col>
                          <Col sm={8} xs={24}>
                            <Info title="高佣推广" value={today_info.large_coupon_num} bordered />
                          </Col>
                          <Col sm={8} xs={24}>
                            <Info title="收藏推广" value={today_info.fans_num} />
                          </Col>
                        </Row>
                      </ChartCard>
                      <ChartCard
                        bordered={false}
                        title="商家推广效果"
                        action={
                          <Tooltip
                            title={
                              <div className={styles.toolP}>
                                <p>1.试用订单数：包含无效订单</p>
                                <p>2.高佣订单数：包含无效订单</p>
                                <p>3.收藏数：上传截图的人数</p>
                              </div>
                            }
                          >
                            <Icon type="question-circle" />
                          </Tooltip>
                        }
                        loading={loading}
                        contentHeight={80}
                      >
                        <Row>
                          <Col sm={8} xs={24}>
                            <Info title="试用订单数" value={today_info.sy_order_num} bordered />
                          </Col>
                          <Col sm={8} xs={24}>
                            <Info
                              title="高佣订单数"
                              value={today_info.large_coupon_order_num}
                              bordered
                            />
                          </Col>
                          <Col sm={8} xs={24}>
                            <Info title="收藏数" value={today_info.sc_order_num} />
                          </Col>
                        </Row>
                      </ChartCard>
                    </TabPane>
                  </Tabs>
                </div>
              </Card>
            </Col>
          </Row>
          <Suspense fallback={<PageLoading />}>
            <TodayPlan
              loading={loading}
              data={list}
              tableType={this.tableType}
              radioOnChange={this.todayPlanRadioOnChange}
            />
          </Suspense>
        </GridContent>
      </div>
    );
  }
}

export default Dashboard;
