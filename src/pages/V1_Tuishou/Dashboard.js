import React, { Component } from 'react';
import { ChartCard, MiniArea, yuan, Field } from '@/components/Charts';

import { Row, Col, Tooltip, Icon, Card, Table, Badge } from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import { connect } from 'dva';

import styles from './Dashboard.less';

@connect(({ loading, dashboard, order }) => ({
  loading: loading.models.dashboard,
  dashboard,
  orderData: order.orderData,
}))
class Dashboard extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/queryHomeData',
    });
    dispatch({
      type: 'order/queryOrder',
    });
  }

  render() {
    /* eslint-disable */
    const { loading, dashboard, orderData } = this.props;
    const { list } = orderData;
    console.log('list==>', list);
    const {
      head_info: { visitor_info, order_info },
      today_rebate,
      month_rebate,
      last_month_rebate,
      total_rebate,
    } = dashboard;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_id',
        key: 'order_id',
        width: 150,
      },
      {
        title: '商品名称',
        width: 143,
        render: val => {
          return (
            <a
              className={styles.pro}
              href={val.goods_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.title}</span>
            </a>
          );
        },
      },
      {
        title: '购买价格',
        width: 90,
        render(item) {
          return <span>￥{item.order_price}</span>;
        },
      },
      {
        title: '预估佣金',
        width: 90,
        render(item) {
          return <span>￥{item.commission_amount}</span>;
        },
      },
      {
        title: '下单时间',
        width: 200,
        dataIndex: 'ordered_datetime',
      },
      {
        title: '来源',
        width: 90,
        dataIndex: 'terminal_desc',
      },
      {
        title: '状态',
        width: 90,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
    ];
    const colsData = [
      {
        title: '今日预估佣金',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        tooltip: '今日客户完成下单您预计可赚取的金额',
        number: today_rebate,
      },
      {
        title: '本月预估佣金',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        tooltip: '本月客户完成下单您预计可赚取的金额',
        number: month_rebate,
      },
      {
        title: '上月预估佣金',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        tooltip: '上月客户完成下单您预计可赚取的金额',
        number: last_month_rebate,
      },
      {
        title: '累计预估佣金',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        tooltip: '所有客户完成下单您预计可赚取的金额',
        number: total_rebate,
      },
    ];
    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    const data = [];
    return (
      <div>
        <Row gutter={20}>
          {colsData.map((item, index) => {
            item.number = 0.01;
            return (
              <Col key={`key${index}`} xs={24} sm={12} xl={6} style={{ marginTop: 24 }}>
                <ChartCard
                  title={item.title}
                  action={
                    <Tooltip title={item.tooltip}>
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total={() => <span dangerouslySetInnerHTML={{ __html: yuan(item.number) }} />}
                />
              </Col>
            );
          })}
        </Row>
        <Row style={{ marginTop: 20 }} gutter={20}>
          <Col span={12}>
            <ChartCard
              title="今日访客数"
              action={
                <Tooltip title="当日移动版网页和选品库单品推广的uv总计 曲线展示近30日uv ">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(visitor_info.day_visitor_amount).format('0,0')}
              footer={
                <Field
                  label="日均访客数"
                  value={numeral(visitor_info.aver_visitor_amount).format('0,0')}
                />
              }
              contentHeight={46}
            >
              <MiniArea
                line
                height={46}
                data={visitor_info.statistics_info.map(item => {
                  return {
                    x: item.day,
                    y: item.number,
                  };
                })}
              />
            </ChartCard>
          </Col>
          <Col span={12}>
            <ChartCard
              title="今日订单数"
              action={
                <Tooltip title="当日移动版网页和选品库单品推广的订单数 不包含无效状态订单 曲线展示近30日数据">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(order_info.day_order_num).format('0,0')}
              footer={
                <Field
                  label="日均订单数"
                  value={numeral(order_info.aver_order_num).format('0,0')}
                />
              }
              contentHeight={46}
            >
              <MiniArea
                line
                height={46}
                data={order_info.statistics_info.map(item => {
                  return {
                    x: item.day,
                    y: item.number,
                  };
                })}
              />
            </ChartCard>
          </Col>
        </Row>
        <Card
          loading={loading}
          bordered={false}
          title="今日订单"
          extra={
            <a href="/tuishou-order/index" target="_blank">
              {'查看更多>'}
            </a>
          }
          style={{ marginTop: 24 }}
        >
          <Table
            rowKey={record => record.index}
            size="small"
            columns={columns}
            dataSource={list}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}

export default Dashboard;
