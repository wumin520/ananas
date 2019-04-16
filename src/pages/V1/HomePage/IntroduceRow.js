import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
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
              title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(1231).format('0,0')}
          footer={<Field label={<span>总推广费用 ¥</span>} value={numeral(5341).format('0,0')} />}
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData} />
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
              title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={() => <Yuan>126560</Yuan>}
          footer={
            <Field label={<span>日均订单数</span>} value={`￥${numeral(12423).format('0,0')}`} />
          }
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>11%</span>
          </Trend>
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
              title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          footer={<Field label={<span>好评率</span>} value="60%" />}
          contentHeight={46}
        >
          <MiniBar data={visitData} />
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
              title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="78%"
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span className={styles.trendText}>信用良好，无限制</span>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress
            percent={78}
            strokeWidth={8}
            target={80}
            targetLabel={`${formatMessage({ id: 'component.miniProgress.tooltipDefault' }).concat(
              ': '
            )}80%`}
            color="#3490ff"
          />
        </ChartCard>
      </Col>
    </Row>
  );
});

export default IntroduceRow;
