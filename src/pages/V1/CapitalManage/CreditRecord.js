import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Badge, Divider } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './CreditRecord.less';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({ creditlist, list, loading }) => ({
  creditlist: creditlist.data.payload,
  list,
  loading: loading.models.list,
}))
@Form.create()
class CreditRecord extends Component {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  columns = [
    {
      title: '时间',
      dataIndex: 'name',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '推广编号',
      dataIndex: 'desc',
    },
    {
      title: '商品',
      dataIndex: 'callNo',
      sorter: true,
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '扣分',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '扣分分类',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '说明',
      render: () => (
        <Fragment>
          <a>查看</a>
          <Divider type="vertical" />
          <a href="">订单明细</a>
        </Fragment>
      ),
    },
  ];

  columnsStatic = [
    {
      title: '扣分节点',
      dataIndex: 'pointDeduct',
    },
    {
      title: '放单-好评全返',
      dataIndex: 'backQ',
    },
    {
      title: '平台官方推荐',
      dataIndex: 'recommend',
    },
    {
      title: '提现',
      dataIndex: 'withdraw',
    },
    {
      title: '冻结账号',
      dataIndex: 'freeze',
    },
  ];

  dataStatic = [
    {
      key: '1',
      pointDeduct: '满12分',
      backQ: '限制',
      recommend: '不限制',
      withdraw: '不限制',
      freeze: '不限制',
    },
    {
      key: '2',
      pointDeduct: '满24分',
      backQ: '限制',
      recommend: '限制',
      withdraw: '不限制',
      freeze: '不限制',
    },
    {
      key: '3',
      pointDeduct: '满36分',
      backQ: '限制',
      recommend: '限制',
      withdraw: '限制',
      freeze: '不限制',
    },
    {
      key: '4',
      pointDeduct: '超出36分',
      backQ: '限制',
      recommend: '限制',
      withdraw: '限制',
      freeze: '限制',
    },
  ];

  columnsStaticRule = [
    {
      title: '',
      dataIndex: 'name',
      render: (value, row, index) => {
        const obj = {
          children: value,
          row,
          props: {},
        };

        obj.props.rowSpan = 0;

        const valObj = {
          0: 3,
          3: 4,
          7: 2,
          9: 1,
        };
        if ({}.hasOwnProperty.call(valObj, index)) obj.props.rowSpan = valObj[index];

        return obj;
      },
    },
    {
      title: '处罚分类',
      dataIndex: 'item',
    },
    {
      title: '活动要求',
      dataIndex: 'require',
      render: (value, row, index) => {
        const obj = {
          children: value,
          row,
          props: {},
        };
        obj.props.rowSpan = index === 0 ? 10 : 0;
        return obj;
      },
    },
    {
      title: '不符合活动要求的处罚规定',
      dataIndex: 'punish',
    },
  ];

  dataStaticRule = [
    {
      key: '1',
      name: '任务过程',
      item: '商品价格类',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣1分',
    },
    {
      key: '2',
      name: '任务过程',
      item: '上下架类',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣2分',
    },
    {
      key: '3',
      name: '任务过程',
      item: '下单类',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣2分',
    },
    {
      key: '4',
      name: '发货过程',
      item: '发货时间',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣2分',
    },
    {
      key: '5',
      name: '发货过程',
      item: '商品质量',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣3分',
    },
    {
      key: '6',
      name: '发货过程',
      item: '错发漏发',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣1分',
    },
    {
      key: '7',
      name: '发货过程',
      item: '收货评价',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣2分',
    },
    {
      key: '8',
      name: '平台规则',
      item: '私下拉群',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣3分',
    },
    {
      key: '9',
      name: '平台规则',
      item: '商家规范',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣2分',
    },
    {
      key: '10',
      name: '其他行为',
      item: '其他恶意行为',
      require: '与 《超多客商家处罚规则一致》',
      punish: '根据情况每次扣1~12分',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'creditlist/getListData',
      payload: {
        page: 1,
      },
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { creditlist } = this.props;
    let shInfo = {};
    if (creditlist) shInfo = creditlist.sh_info;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="当前积分" value={shInfo.credit_score} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="账户限制" value={shInfo.limit_info} bordered />
              </Col>
              <Col sm={8} xs={24} />
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Form layout="inline">
              <StandardFormRow grid last>
                <Row gutter={16} style={{ marginTop: 20, marginBottom: 30 }}>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="扣分分类">
                      {getFieldDecorator('user', {})(
                        <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                          <Option value="lisa">李三</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="推广id">
                      {getFieldDecorator('rate', {})(
                        <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                          <Option value="good">优秀</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <span className={styles.submitButtons}>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
                      </Button>
                    </span>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>

            {/* <Table loading={loading} dataSource={list} columns={this.columns} /> */}
          </Card>
          <Card>
            <Table
              columns={this.columnsStatic}
              dataSource={this.dataStatic}
              bordered
              pagination={false}
              title={() => '扣分限制'}
            />
            <div>
              <p>
                限制放单：指卖家无法在平台发布活动（满24分每2天只能发布一次活动，满36分每月只能发布5次活动）
              </p>
              <p>商品平台不做任何推荐：卖家商品无法获得平台任何资源的推荐</p>
              <p>提现：满36分提现受限，2个月内不能提现，超出36分不能使用提现功能</p>
              <p>冻结账号：均不能使用，请联系招商办理解冻</p>
            </div>

            <Table
              columns={this.columnsStaticRule}
              dataSource={this.dataStaticRule}
              bordered
              pagination={false}
              title={() => '违规扣分规则：'}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CreditRecord;
