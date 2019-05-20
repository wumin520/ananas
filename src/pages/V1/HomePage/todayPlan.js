import React, { memo, Fragment } from 'react';
import { Card, Table, Badge, Divider, Radio } from 'antd';
import Link from 'umi/link';

import styles from './index.less';

const statusMap = ['default', 'success'];
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const defaultColumns = [
  {
    key: '1',
    title: '推广编号',
    width: 100,
    dataIndex: 'task_plan_id',
  },
  {
    key: 'goods_id',
    title: '商品id',
    width: 120,
    dataIndex: 'goods_id',
  },
  {
    key: '2',
    title: '商品',
    className: styles.resultColumns,
    render: val => (
      <a
        className={styles.resultColumnsDiv}
        href={val.goods_url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
        <span> {val.title}</span>
      </a>
    ),
  },
  {
    key: '3',
    title: '券后价',
    dataIndex: 'after_coupon_price',
    render: val => `￥ ${val}`,
  },
  {
    key: '4',
    title: '优惠券',
    dataIndex: 'coupon_price',
    render: val => {
      return <span>{val ? `￥ ${val}` : '无'}</span>;
    },
  },
  {
    key: '5',
    title: '排期状态',
    render: val => <Badge status={statusMap[val.state]} text={val.state_desc} />,
  },
  {
    key: '6',
    title: '今日完成情况',
    dataIndex: 'task_info',
    render: val => (
      <div className={styles.taskInfo}>
        <p>发放份数 {val.total_amount}</p>
        <p>下单人数 {val.order_num}</p>
        <p>评价人数 {val.comment_num}</p>
      </div>
    ),
  },
  {
    key: '7',
    title: '操作',
    render: record => (
      <Fragment>
        <Link to={`/fangdan/list/generalizeDetail?&task_id=${record.task_id}`}>查看</Link>
        <Divider type="vertical" />
        <Link to={`/order/Index?task_id=${record.task_id}`}>订单明细</Link>
      </Fragment>
    ),
  },
];

const qfColumns = [
  {
    key: '1',
    title: '推广编号',
    width: 100,
    dataIndex: 'task_plan_id',
  },
  {
    key: 'goods_id',
    title: '商品/店铺id',
    width: 120,
    dataIndex: 'goods_id',
  },
  {
    key: '2',
    title: '商品/店铺名称',
    className: styles.resultColumns,
    render: val => (
      <a
        className={styles.resultColumnsDiv}
        href={val.goods_url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
        <span> {val.title}</span>
      </a>
    ),
  },
  {
    key: '5',
    title: '状态',
    render: val => <Badge status={statusMap[val.state]} text={val.state_desc} />,
  },
  {
    key: '6',
    title: '推广份数',
    render: val => (
      <div className={styles.taskInfo}>
        <p>发放份数 {val.total_amount}</p>
        <p>下单人数 {val.order_num}</p>
      </div>
    ),
  },
  {
    key: '7',
    title: '操作',
    render: record => (
      <Fragment>
        <Link to={`/fangdan/qfDetail?&task_id=${record.task_id}`}>查看</Link>
        <Divider type="vertical" />
        <Link to={`/order/qf?task_id=${record.task_id}`}>推广效果</Link>
      </Fragment>
    ),
  },
];

const todayPlan = memo(({ data, loading, radioOnChange, tableType }) => {
  const extraContent = (
    <div style={{ marginBottom: 20 }} className={styles.extraContent}>
      <RadioGroup onChange={radioOnChange} defaultValue="10">
        <RadioButton value="10">好评试用</RadioButton>
        <RadioButton value="30,31">圈粉引流</RadioButton>
      </RadioGroup>
    </div>
  );
  let columns = defaultColumns;
  if (tableType === 1) {
    columns = qfColumns;
  }
  return (
    <Card
      loading={loading}
      bordered={false}
      title="今日推广中"
      extra={<Link to="/fangdan/plan">{'排期列表>'}</Link>}
      style={{ marginTop: 24 }}
    >
      {extraContent}
      <Table
        rowKey={record => record.id}
        size="small"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  );
});

export default todayPlan;
