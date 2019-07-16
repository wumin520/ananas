import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip, Tabs, Card } from 'antd';
import styles from './index.less';
import { ChartCard } from '@/components/Charts';

const { TabPane } = Tabs;
const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const IntroduceRow = memo(function chart({ loading, visitData }) {
  return (
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
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              contentHeight={80}
            >
              <Row>
                <Col sm={12} xs={24}>
                  <Info title="新商家入驻" value={visitData.new_sh_num} bordered />
                </Col>
                <Col sm={12} xs={24}>
                  <Info title="今日商家充值" value={visitData.sh_recharge} />
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
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              contentHeight={80}
            >
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="试用推广" value={visitData.great_review_num} bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="高佣推广" value={visitData.large_coupon_num} bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="收藏推广" value={visitData.fans_num} />
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
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              contentHeight={80}
            >
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="试用订单数" value={visitData.sy_order_num} bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="高佣订单数" value={visitData.large_coupon_order_num} bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="收藏数" value={visitData.sc_order_num} />
                </Col>
              </Row>
            </ChartCard>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
});

export default IntroduceRow;
