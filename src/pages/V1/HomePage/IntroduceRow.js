import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { ChartCard, MiniProgress, Field, MiniArea, MiniBar } from '@/components/Charts';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

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
                  <p>1.总放单量：推广数量之和</p>
                  <p>2.总推广费用：推广费用之和</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(visitData.task_info.task_amount).format('0,0')}
          footer={
            <Field
              label={<span>总推广费用 ¥</span>}
              value={numeral(visitData.task_info.total_money).format('0,0')}
            />
          }
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
                  <p>1.总订单数：推广订单之和</p>
                  <p>2.日均订单数：总订单数/推广排期总天数</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={() => <Yuan>{visitData.order_info.total_order_num}</Yuan>}
          footer={
            <Field
              label={<span>日均订单数</span>}
              value={`￥${numeral(visitData.order_info.daily_order_num).format('0,0')}`}
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
                  <p>1.总好评数：所有推广产生的好评数</p>
                  <p>2.好评率总评价数/总订单数</p>
                </div>
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(visitData.comment_info.good_comment_num).format('0,0')}
          footer={
            <Field label={<span>好评率</span>} value={visitData.comment_info.good_comment_rate} />
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
              <span className={styles.trendText}>{visitData.credit_info.limit_info}</span>
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
