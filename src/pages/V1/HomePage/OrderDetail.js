import React, { memo } from 'react';
import { Table, Card, Badge } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const status = ['失效', '已下单', '待评价', '已完成'];
const statusMap = ['error', 'processing', 'warning', 'success'];

const columns = [
  {
    title: <FormattedMessage id="app.homePage.table.orderCode" defaultMessage="Rank" />,
    dataIndex: 'p_order_id',
    key: 'index',
  },
  {
    title: <FormattedMessage id="app.homePage.table.product" defaultMessage="Search keyword" />,
    dataIndex: 'title',
    key: 'keyword',
    render: text => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="app.homePage.table.orderTime" defaultMessage="Users" />,
    dataIndex: 'ordered_datetime',
    key: 'count',
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="app.homePage.table.status" defaultMessage="Weekly Range" />,
    dataIndex: 'state',
    key: 'range',
    render: text => <Badge status={statusMap[text]} text={status[text]} />,
    align: 'right',
  },
];

const OrderDetail = memo(({ loading, data }) => (
  <Card
    loading={loading}
    bordered={false}
    title={<FormattedMessage id="app.homePage.orderDetail" defaultMessage="" />}
    extra={<FormattedMessage id="app.homePage.findMore" defaultMessage="" />}
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
