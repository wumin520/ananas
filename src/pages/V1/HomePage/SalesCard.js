import React, { memo } from 'react';
import { Row, Col, Card, Tabs, Radio } from 'antd';
import Link from 'umi/link';
import numeral from 'numeral';
import moment from 'moment';
import styles from './index.less';
import { Bar } from '@/components/Charts';

const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const SalesCard = memo(({ salesData, loading, radioGroupOnChange, dataType }) => {
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
  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup onChange={radioGroupOnChange} defaultValue="0">
        <RadioButton value="0">试用推广</RadioButton>
        <RadioButton value="2">高佣推广</RadioButton>
        <RadioButton value="1">收藏推广</RadioButton>
      </RadioGroup>
    </div>
  );
  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              {dataType === 'fans' ? (
                <Link to="/fangdan/list?qf=fans">{'放单列表>'}</Link>
              ) : (
                <Link to="/fangdan/list">{'放单列表>'}</Link>
              )}
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane tab="放单概况" key="sales">
            <Card bordered={false} className={styles.customStyleCard} extra={extraContent}>
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar height={295} title="" data={salesData} />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>最近7日数据</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                          >
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.title}>
                            {item.title}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {numeral(item.total).format('0,0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
});

export default SalesCard;
