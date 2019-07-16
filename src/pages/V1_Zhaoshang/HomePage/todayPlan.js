import React, { memo } from 'react';
import { Card, Table, Badge, Radio } from 'antd';
import Link from 'umi/link';
import styles from './index.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const columns = [
  {
    title: '投放时间',
    dataIndex: 'plan_time',
    key: 'plan_time',
    width: 150,
  },
  {
    key: 'mall_name',
    title: '店铺名称',
    width: 120,
    dataIndex: 'mall_name',
  },
  {
    title: '推广编号',
    dataIndex: 'task_id',
    key: 'task_id',
    width: 90,
  },
  {
    title: '商品',
    width: 143,
    render: val => {
      return (
        <a className={styles.pro} href={val.goods_url} rel="noopener noreferrer" target="_blank">
          <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
          <span className={styles.goodsName}> {val.title}</span>
        </a>
      );
    },
  },
  {
    title: '券后价',
    dataIndex: 'after_coupon_price',
    key: 'after_coupon_price',
    width: 100,
    render: item => {
      return <span>￥{item}</span>;
    },
  },
  {
    title: '排期状态',
    width: 100,
    render(item) {
      return <Badge status={item.state_color} text={item.state_desc} />;
    },
  },
  {
    title: '推广情况',
    width: 150,
    render: item => {
      return (
        <p style={{ textAlign: 'left' }}>
          <span>发放份数 {item.total_amount}</span>
          <br />
          <span>下单人数 {item.order_num}</span>
          <br />
        </p>
      );
    },
  },
  // {
  //   title: '操作',
  //   width: 120,
  //   render: item => {
  //     return <a onClick={this.goDetail.bind(this, item)}>查看 </a>;
  //   },
  // },
];

// const goDetail = item => {
//   let path = `/zhaoshang-promotion/promotionDetail`;
//   window.open(`${path}?task_plan_id=${item.task_plan_id}`); // 0523 新窗口打开
// };
// tableType
const todayPlan = memo(({ data, loading, radioOnChange }) => {
  const extraContent = (
    <div style={{ marginBottom: 20 }} className={styles.extraContent}>
      <RadioGroup onChange={radioOnChange} defaultValue="10">
        <RadioButton value="10">试用推广</RadioButton>
        <RadioButton value="20">高佣推广</RadioButton>
        <RadioButton value="30,31">收藏推广</RadioButton>
      </RadioGroup>
    </div>
  );

  return (
    <Card
      loading={loading}
      bordered={false}
      title="今日推广"
      extra={<Link to="/zhaoshang-promotion/plan">{'全部推广>'}</Link>}
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
