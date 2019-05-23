import React, { memo } from 'react';
import { Table, Card, Badge } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import styles from './index.less';

const columns = [
  {
    title: <FormattedMessage id="app.homePage.table.orderCode" defaultMessage="Rank" />,
    dataIndex: 'p_order_id',
    key: 'index',
    width: 230,
  },
  {
    title: '推广编号',
    dataIndex: 'task_id',
    key: 'task_id',
    width: 90,
  },
  {
    key: 'goods_id',
    title: '商品id',
    width: 120,
    dataIndex: 'goods_id',
  },
  {
    title: <FormattedMessage id="app.homePage.table.product" defaultMessage="Search keyword" />,
    key: 'keyword',
    className: styles.resultColumns,
    render: val => (
      <a className={styles.pro} href={val.goods_url} rel="noopener noreferrer" target="_blank">
        <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
        <span className={styles.goodsName}> {val.title}</span>
      </a>
    ),
  },
  {
    title: '购买价格',
    width: 100,
    render(item) {
      return <span>￥{item.order_price}</span>;
    },
  },
  {
    title: '状态',
    width: 100,
    render(item) {
      return <Badge status={item.state_color} text={item.state_desc} />;
    },
  },
  {
    title: '时间',
    width: 250,
    render(val) {
      /* eslint-disable */
      const time = (
        <span>
          <span>{val.paid_datetime ? '付款: ' + val.paid_datetime : ''}</span>
          <br />
          <span> {val.harvest_time ? '收货: ' + val.harvest_time : ''}</span>
          <br />
          {/**<span>{val.proof_time ? '免单: ' + val.proof_time : ''}</span> */}
        </span>
      );
      return (
        <span>
          <span>下单:{val.ordered_datetime}</span>
          <br />
          {time}
        </span>
      );
    },
  },
];

const OrderDetail = memo(({ loading, data, pageInfo }) => (
  <Card
    loading={loading}
    bordered={false}
    title={<FormattedMessage id="app.homePage.todayOrder" defaultMessage="" />}
    extra={<Link to="/order/Index">{'查看更多>'}</Link>}
    style={{ marginTop: 24 }}
  >
    <Table
      rowKey={record => record.index}
      size="small"
      columns={columns}
      dataSource={data}
      pagination={pageInfo}
    />
  </Card>
));

export default OrderDetail;
