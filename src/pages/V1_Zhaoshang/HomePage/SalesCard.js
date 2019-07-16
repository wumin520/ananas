import React, { memo } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { Bar } from '@/components/Charts';

const { TabPane } = Tabs;
const SalesCard = memo(({ salesData, loading }) => {
  const len = salesData.length;
  if (len < 7) {
    return '';
  }
  const rankingListData = [];
  for (let i = len - 1; i >= 0; i -= 1) {
    const item = salesData[i];
    let title = '';
    if (i === len - 1) {
      title = '今天';
    } else {
      title = moment(item.x).format('MM.DD');
    }
    if (i > len - 8) {
      rankingListData.push({
        title,
        total: item.y,
      });
    }
    item.x = title;
  }

  const Info = ({ title, value, bordered }) => (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
          <TabPane tab="收入概况" key="sales">
            <div className={styles.salesBar}>
              <Row style={{ marginBottom: 40 }}>
                <Col sm={12} xs={24}>
                  <Info title="今日预计分成(元)" value="111" bordered />
                </Col>
                <Col sm={12} xs={24}>
                  <Info title="累计预计分成(元)" value="111" />
                </Col>
              </Row>
              <Bar height={295} title="收入趋势" data={salesData} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
});

export default SalesCard;
