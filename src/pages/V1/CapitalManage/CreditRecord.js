import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Input } from 'antd';

import { router } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './CreditRecord.less';

const FormItem = Form.Item;
const { Option } = Select;

let params = {
  page: 1,
  type: -1,
  task_id: 0,
};

const content = <div />;

@connect(({ creditlist, list, loading }) => ({
  creditlist,
  list,
  loading: loading.models.creditlist,
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
      dataIndex: 'created_at',
    },
    {
      title: '推广编号',
      dataIndex: 'task_id',
    },
    {
      title: '商品',
      render: val => {
        return (
          <span className={styles.pro}>
            <img src={val.img} alt="" style={{ width: 50, heigth: 50, marginRight: 5 }} />
            <span className={styles.goodsName}> {val.title}</span>
          </span>
        );
      },
    },
    {
      title: '扣分',
      dataIndex: 'score',
    },
    {
      title: '扣分分类',
      dataIndex: 'type',
    },
    {
      title: '说明',
      dataIndex: 'desc',
    },
  ];

  columnsStatic = [
    {
      title: '扣分节点',
      dataIndex: 'pointDeduct',
    },
    {
      title: '放单-好评试用推广',
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
          children: <a onClick={this.goRule.bind(this)}>{value}</a>,
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
      punish: '每次扣2分',
    },
    {
      key: '3',
      name: '任务过程',
      item: '下单类',
      punish: '每次扣2分',
    },
    {
      key: '4',
      name: '发货过程',
      item: '发货时间',
      punish: '每次扣2分',
    },
    {
      key: '5',
      name: '发货过程',
      item: '商品质量',
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
      punish: '每次扣2分',
    },
    {
      key: '10',
      name: '其他行为',
      item: '其他恶意行为',
      punish: '根据情况每次扣1~12分',
    },
  ];

  componentDidMount() {
    this.getFormData(params);
  }

  goRule = () => {
    router.push('/CapitalManage/rulecdk');
  };

  getFormData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'creditlist/getListData',
      payload: {
        page: p.page,
        type: p.type,
        task_id: p.task_id,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        params.page = 1;
        params.type = values.type;
        params.task_id = values.task_id;
        this.getFormData(params);
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    params = {
      page: 1,
      type: -1,
      task_id: 0,
    };
    this.getFormData(params);
  };

  changePage = p => {
    params.page = p;
    this.getFormData(params);
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.props;
    const { creditlist } = this.props;

    const shInfo = creditlist.sh_info;
    const { list } = creditlist;

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
      <PageHeaderWrapper title="信用记录" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="当前信用分" value={shInfo ? shInfo.credit_score : ''} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="账户限制" value={shInfo ? shInfo.limit_info : ''} bordered />
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
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <StandardFormRow grid last>
                <Row gutter={16} style={{ marginTop: 20, marginBottom: 30 }}>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="扣分分类">
                      {getFieldDecorator('type', {})(
                        <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                          {creditlist.type_select.length &&
                            creditlist.type_select.map(e => (
                              <Option key={e.value} value={e.value}>
                                {e.name}
                              </Option>
                            ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="推广id">
                      {getFieldDecorator('task_id', {})(
                        <Input
                          placeholder="请输入推广id"
                          style={{ maxWidth: 200, width: '100%' }}
                        />
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

            <Table
              loading={loading}
              dataSource={list}
              columns={this.columns}
              pagination={{
                defaultCurrent: 1,
                current: creditlist.page_info.current_page,
                pageSize: creditlist.page_info.per_page,
                total: creditlist.page_info.total_num,
                onChange: this.changePage,
              }}
            />
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
