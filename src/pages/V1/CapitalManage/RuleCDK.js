import React, { PureComponent } from 'react';
import { Card, Table } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const content = <div />;
@connect(({ loading }) => ({
  loading: loading.models.creditlist,
}))
class Rulecdk extends PureComponent {
  columns = [
    {
      title: '违规阶段',
      dataIndex: 'r1',
      render: (value, row, index) => {
        const obj = {
          children: value,
          row,
          props: {},
        };
        obj.props.rowSpan = index === 0 ? 3 : 1;
        return obj;
      },
    },
    {
      title: '违规类型',
      dataIndex: 'r2',
    },
    {
      title: '违规行为',
      dataIndex: 'r3',
    },
    {
      title: '扣信誉分',
      dataIndex: 'r4',
    },
  ];

  data = [
    {
      key: '1',
      r1: '活动过程',
      r2: '商品价格类',
      r3: '1.在推广有效期内，更改活动商品价格/佣金比例;2.活动商品价格虚高',
      r4: '每人次扣1分',
    },
    {
      key: '2',
      // r1: '活动过程',
      r1: '上下架类',
      r2: '活动期间内商品未保持上架状态（除合理情形且商家提供充分的书面证明材料外',
      r3: '每人次扣2分',
    },
    {
      key: '3',
      // r1: '活动过程',
      r1: '下单类',
      r2: '1、引导用户错误购买（包括购买非发布页面所示商品、赠品等情形;2、引导用户使用其他渠道购买',
      r3: '每人次扣2分',
    },
    {
      key: '4',
      r1: '平台规则',
      r2: '私下拉群',
      r3: '1、引导用户加入商家创建的QQ、微信群;2、在和用户聊天过程中提及超多客等',
      r4: '每人次扣1分',
    },
    {
      key: '5',
      r1: '其他行为',
      r2: '其他恶意行为',
      r3: '其他恶意行为造成用户或者平台损失的',
      r4: '根据情况酌情扣1-12分',
    },
  ];

  render() {
    return (
      <PageHeaderWrapper title="商家违规处罚规则" content={content}>
        <Card>
          <Table columns={this.columns} dataSource={this.data} bordered pagination={false} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Rulecdk;
