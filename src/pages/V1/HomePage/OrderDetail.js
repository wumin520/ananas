import React, { memo } from 'react';
import { Table, Card, Badge } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const statusMap = ['error', 'processing', 'warning', 'success'];

const columns = [
  {
    title: <FormattedMessage id="app.homePage.table.orderCode" defaultMessage="Rank" />,
    dataIndex: 'p_order_id',
    key: 'index',
  },
  {
    title: <FormattedMessage id="app.homePage.table.product" defaultMessage="Search keyword" />,
    key: 'keyword',
    className: styles.resultColumns,
    render: val => (
      <p className={styles.resultColumnsDiv}>
        <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
        <span> {val.title}</span>
      </p>
    ),
  },
  {
    title: <FormattedMessage id="app.homePage.table.orderTime" defaultMessage="Users" />,
    dataIndex: 'ordered_datetime',
    key: 'count',
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="app.homePage.table.status" defaultMessage="Weekly Range" />,
    key: 'range',
    render: text => <Badge status={statusMap[text.state]} text={text.state_desc} />,
    align: 'right',
  },
];

const OrderDetail = memo(({ loading, data }) => (
  <Card
    loading={loading}
    bordered={false}
    title={<FormattedMessage id="app.homePage.orderDetail" defaultMessage="" />}
    extra={<a href="/order/Index">{'查看更多>'}</a>}
    style={{ marginTop: 24 }}
  >
    <Table
      rowKey={record => record.index}
      size="small"
      columns={columns}
      dataSource={data}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
));

export default OrderDetail;
