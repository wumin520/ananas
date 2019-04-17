import React, { memo } from 'react';
import { Table, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Trend from '@/components/Trend';
import styles from './index.less';

const columns = [
  {
    title: <FormattedMessage id="app.homePage.table.rank" defaultMessage="Rank" />,
    dataIndex: 'rank',
    key: 'index',
  },
  {
    title: <FormattedMessage id="app.homePage.table.productName" defaultMessage="Search keyword" />,
    dataIndex: 'shop_name',
    key: 'keyword',
    render: text => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="app.homePage.table.orderNum" defaultMessage="Users" />,
    dataIndex: 'order_num',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="app.homePage.table.dayly-range" defaultMessage="Weekly Range" />,
    dataIndex: 'day_up',
    key: 'range',
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
    align: 'right',
  },
];

const hotRankList = memo(({ loading, data, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title={<FormattedMessage id="app.homePage.hotRankList" defaultMessage="Online Top Search" />}
    extra={dropdownGroup}
    style={{ marginTop: 24 }}
  >
    <Table rowKey={record => record.index} size="small" columns={columns} dataSource={data} />
  </Card>
));

export default hotRankList;
