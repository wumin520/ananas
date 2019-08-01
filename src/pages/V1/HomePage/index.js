import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { Row, Col, Alert, Icon, Avatar, Card, Tag, Button, Tooltip, Popover } from 'antd';
import { ChartCard } from '@/components/Charts';
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

@connect(({ loading, homedata, user }) => ({
  homedata,
  currentUser: user.currentUser,
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

    this.showPop();
    this.getListData();
    this.getOrderData();
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

  showPop = () => {
    // storage -> storageDate   弹框一天只弹一次
    const today = moment(new Date()).format('YYYY-MM-DD');
    const isShowPop = today === getStorage('storageDate') ? '0' : '1';
    if (today !== getStorage('storageDate')) {
      setStorage('storageDate', today);
    }
    this.setState({
      isShowPop,
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
  };

  render() {
    const { loading, homedata, currentUser } = this.props;
    const { isShowPop } = this.state;

    const headInfo = homedata.head_info;
    const creditInfo = headInfo.credit_info;
    const taskList = homedata.planData.list;
    const taskReportInfo = homedata.task_report_info;
    // 余额
    const assetInfo = headInfo.asset_info;
    // const hotRank = homedata.hot_rank;
    const dayOrderInfo = homedata.orderData;
    let noticeInfo = homedata.notice_info;
    const rechargeActivityState = homedata.recharge_activity_state;
    const { greetings, avatar } = currentUser;
    const memberInfo = currentUser.member_info;
    const bdInfo = currentUser.bd_info;
    // rechargeActivityState === 1  活动有效期内
    const actShow = isShowPop === '1' && rechargeActivityState === 1;

    if (rechargeActivityState === 1) {
      noticeInfo = (
        <div>
          {/* {noticeInfo} */}
          有关于超多客试用推广活动收取服务费通知
          <Link
            style={{ marginLeft: '20px', color: '#2F54EB' }}
            to="public/helpDetail?SelectedKeys=9&OpenKeys=sub4"
          >
            查看详情>
          </Link>
        </div>
      );
    }

    /* eslint-disable */
    const salesData = taskReportInfo[this.state.dataType];
    // console.log('creditInfo.credit_level====>>>', creditInfo.credit_level);
    let href_jump = '';
    if (memberInfo[0].level === 10) {
      // 开通会员
      href_jump = '/public/VIP';
    } else {
      // 续费会员
      href_jump = '/CapitalManage/CheckoutVip';
    }

    const memberPop = (
      <div className={styles.memberPop}>
        <div className={styles.pop_title}>我的会员</div>
        <div className={styles.content}>
          {memberInfo &&
            memberInfo.map(val => {
              return (
                <p key={val.level}>
                  {val.name}：{val.level > 10 ? `${val.end_at}到期` : val.end_at}
                </p>
              );
            })}
        </div>
        <p className={styles.member_desc}>购买多重会员套餐时，采用累加延长制优先享受高一级服务</p>
      </div>
    );
    const pageHeaderContent = (
      <div>
        <Row gutter={{ md: 6, lg: 12, xl: 24 }} className={styles.borderLine}>
          <Col md={16} sm={24}>
            <div className={styles.pageHeaderContent}>
              <div className={styles.avatar}>
                <Avatar size="large" src={avatar} />
              </div>
              <div className={styles.content}>
                <div className={styles.titleTags}>
                  <div className={styles.contentTitle}>{greetings}</div>
                  {memberInfo && memberInfo[0].level !== 0 ? (
                    <Popover placement="right" content={memberPop}>
                      {memberInfo[0].level === 10 ? (
                        <Tag>{memberInfo[0].name}</Tag>
                      ) : memberInfo[0].level === 20 ? (
                        <Tag className={styles.tag20}>{memberInfo[0].name}</Tag>
                      ) : memberInfo[0].level === 30 ? (
                        <Tag className={styles.tag30}>{memberInfo[0].name}</Tag>
                      ) : memberInfo[0].level === 40 ? (
                        <Tag className={styles.tag40}>{memberInfo[0].name}</Tag>
                      ) : (
                        ''
                      )}
                    </Popover>
                  ) : (
                    ''
                  )}
                </div>
                {memberInfo[0].level !== 0 ? (
                  <div className={styles.member}>
                    <p style={{ marginRight: 10 }}>会员到期时间：{memberInfo[0].end_at}</p>
                    <a href={href_jump} style={{ marginLeft: 10, borderColor: 'red' }}>
                      {memberInfo[0].level === 10 ? '开通会员>' : '续费会员>'}
                    </a>
                  </div>
                ) : (
                  <div className={styles.member}>
                    <p style={{ marginRight: 10 }}>我的账号：{currentUser.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col md={8} sm={24}>
            <ChartCard
              loading={loading}
              bordered={false}
              title="当前信用分"
              action={
                <Tooltip
                  title={
                    <div>
                      <p>当前的信用情况，请保证信用良好，以防影响您的正常使用</p>
                    </div>
                  }
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={creditInfo.credit_score}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <span className={styles.trendT0 + creditInfo.credit_level}>
                    {creditInfo.limit_info}
                  </span>
                </div>
              }
              contentHeight={46}
              className={styles.score}
            />
          </Col>
        </Row>
        <Row className={styles.flex_}>
          <Col className={styles.auto_}>
            <div className={styles.yue}>
              账户余额
              <div className={styles.price_}>
                <p className={styles.money}>￥{assetInfo.balance}</p>
                <Button
                  href="/CapitalManage/Recharge"
                  type="primary"
                  size="small"
                  style={{ marginLeft: 15, marginRight: 20 }}
                >
                  充值
                </Button>
              </div>
            </div>
            <p className={styles.desc_}>余额可用于发布所有推广活动</p>
          </Col>
          <Col className={styles.auto_}>
            <div className={styles.yue}>
              奖励金
              <div className={styles.price_}>
                <p className={styles.money}>￥{assetInfo.reward_balance}</p>
              </div>
            </div>
            <p className={styles.desc_}>奖励金可用于收藏推广</p>
          </Col>
          <Col className={styles.auto_none}>
            <div className={styles.yue}>
              冻结余额
              <div className={styles.price_}>
                <p className={styles.money}>￥{assetInfo.frozen_balance}</p>
              </div>
            </div>
            <p className={styles.desc_}>冻结余额用于推广担保</p>
          </Col>
        </Row>
      </div>
    );

    return (
      <GridContent>
        {noticeInfo ? (
          <Alert message={noticeInfo} type="warning" showIcon style={{ marginBottom: 20 }} />
        ) : (
          ''
        )}
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
        <Row className={styles.header}>
          <Col md={17} sm={24} style={{ flex: 'auto', marginRight: 20 }}>
            <Card style={{ marginBottom: 10 }}>
              <div className={styles.content}>{pageHeaderContent}</div>
            </Card>
            <Suspense fallback={<PageLoading />}>
              <IntroduceRow loading={loading} visitData={headInfo} />
            </Suspense>
          </Col>
          <Col md={6} sm={24}>
            <Card>
              <div className={styles.textAlign}>
                <div className={styles.bdInfo_avatar}>
                  <Avatar size="large" src={bdInfo.avatar} />
                  <div className={styles.message}>
                    <p className={styles.bdInfoname}>{bdInfo.name}</p>
                    <Tag color="gold">{bdInfo.label}</Tag>
                  </div>
                </div>
                <img className={styles.qrcode} src={bdInfo.qrcode} />
              </div>
            </Card>
          </Col>
        </Row>
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
