import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './index.less';
import { ChartCard, MiniProgress, Field, MiniArea, MiniBar } from '@/components/Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(function chart({ loading, visitData }) {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={<FormattedMessage id="app.homePage.chart.fangdanAmount" defaultMessage="Visits" />}
          action={
            <Tooltip
              title={
                <div className={styles.toolP}>
                  <p>1.今日放单量：今日内所有推广的实时放单量</p>
                  <p>2.总放单量：所有推广的累计放单量</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(visitData.task_info.day_task_amount).format('0,0')}
          footer={<Field label={<span>总放单量 </span>} value={visitData.task_info.total_amount} />}
          contentHeight={46}
        >
          <MiniArea
            color="#975FE4"
            data={visitData.task_info.statistics_info.map(k => {
              return {
                x: k.day,
                y: k.amount,
              };
            })}
          />
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage id="app.homePage.chart.orderAmount" defaultMessage="Total Sales" />
          }
          action={
            <Tooltip
              title={
                <div className={styles.toolP}>
                  <p>1.今日订单数：今日内所有推广产生的实时订单数</p>
                  <p>2.总订单数：所有推广产生的订单总和</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={() => <p>{visitData.order_info.day_order_num}</p>}
          footer={
            <Field
              label={<span>总订单数</span>}
              value={`${numeral(visitData.order_info.total_order_num).format('0,0')}`}
            />
          }
          contentHeight={46}
        >
          <MiniArea
            animate={false}
            line
            borderWidth={2}
            data={visitData.order_info.statistics_info.map(k => {
              return {
                x: k.day,
                y: k.number,
              };
            })}
          />
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={
            <FormattedMessage id="app.homePage.chart.commentAmount" defaultMessage="Payments" />
          }
          action={
            <Tooltip
              title={
                <div className={styles.toolP}>
                  <p>1.好评率：推广订单产生的好评率</p>
                  <p>2.总好评数：所有订单产生的好评数总和</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={visitData.comment_info.good_comment_rate}
          footer={
            <Field label={<span>总好评数</span>} value={visitData.comment_info.good_comment_num} />
          }
          contentHeight={46}
        >
          <MiniBar
            data={visitData.comment_info.statistics_info.map(k => {
              return {
                x: k.day.toString(),
                y: k.number,
              };
            })}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title={
            <FormattedMessage
              id="app.homePage.chart.creditPoint"
              defaultMessage="Operational Effect"
            />
          }
          action={
            <Tooltip
              title={
                <div className={styles.toolP}>
                  <p>当前的信用情况，请保证信用良好，以防影响您的正常使用</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={visitData.credit_info.credit_score}
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span className={styles.trendT0 + visitData.credit_info.credit_level}>
                {visitData.credit_info.limit_info}
              </span>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress
            percent={visitData.credit_info.credit_score}
            strokeWidth={8}
            target={100}
            targetLabel={`${formatMessage({ id: 'component.miniProgress.tooltipDefault' }).concat(
              ': '
            )}100%`}
            color="#3490ff"
          />
        </ChartCard>
      </Col>
    </Row>
  );
});

export default IntroduceRow;
