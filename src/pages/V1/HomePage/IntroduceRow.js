import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
// import styles from './index.less';
import { ChartCard } from '@/components/Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 8,
  md: 8,
  lg: 8,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(function chart({ loading, visitData }) {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="今日推广数"
          action={
            <Tooltip title={<p>今日推广数：今日进行中的推广个数，实时变动</p>}>
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={() => <p>{visitData.order_info.day_order_num}</p>}
          contentHeight={46}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="今日订单数"
          action={
            <Tooltip title={<p>今日订单数：今日下单的试用+高佣订单综合，实时变动</p>}>
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(visitData.comment_info.good_comment_rate).format('0,0')}
          contentHeight={46}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="今日收藏数"
          action={
            <Tooltip title={<p>今日收藏数：今日收藏推广店铺+商品的人数综合，实时变动</p>}>
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(visitData.fans_info.day_order_num).format('0,0')}
          contentHeight={46}
        />
      </Col>
      {/* <Col {...topColResponsiveProps}>
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
      </Col> */}
    </Row>
  );
});

export default IntroduceRow;
