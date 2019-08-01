import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Input, Badge } from 'antd';

import { router } from 'umi';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './styles.less';

const FormItem = Form.Item;
const { Option } = Select;

let params = {
  page: 1,
};

const content = <div />;

@connect(({ complaint, loading }) => ({
  complaintData: complaint.complaintData,
  loading: loading.models.complaint,
}))
@Form.create()
class ComplaintList extends Component {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  columns = [
    {
      title: '售后编号',
      dataIndex: 'id',
    },
    {
      title: '订单编号',
      dataIndex: 'p_order_id',
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
      title: '售后原因',
      dataIndex: 'reason',
    },
    {
      title: '状态',
      render: val => {
        return <Badge status={val.state_color} text={val.state_desc} />;
      },
    },
    {
      title: '提交时间',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      render: val => {
        return (
          <span>
            <a onClick={this.toDetail.bind(this, val)}>查看</a>
          </span>
        );
      },
    },
  ];

  componentDidMount() {
    this.getData(params);
  }

  getData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'complaint/getOrderComplainList',
      payload: p,
    });
  };

  toDetail = val => {
    router.push(`/complaint/complaintDetail?id=${val.id}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        params.page = 1;
        params.type = values.type;
        params.task_id = values.task_id;
        this.getData(params);
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    params = {
      page: 1,
    };
    this.getData(params);
  };

  changePage = p => {
    params.page = p;
    this.getData(params);
  };

  render() {
    const {
      form: { getFieldDecorator },
      complaintData,
    } = this.props;

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
        <p>{value}个</p>
        {bordered && <em />}
      </div>
    );

    return (
      <PageHeaderWrapper title="订单申诉" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info
                  title="待审核"
                  value={complaintData.verify_num_info.verify_wait_num}
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已完成" value={complaintData.verify_num_info.verify_finish_num} />
              </Col>
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
                  <Col xl={6} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="售后编号">
                      {getFieldDecorator('task_id', {})(
                        <Input
                          placeholder="请输入售后编号"
                          style={{ maxWidth: 200, width: '100%' }}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={6} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="订单编号">
                      {getFieldDecorator('task_id', {})(
                        <Input
                          placeholder="请输入订单编号"
                          style={{ maxWidth: 200, width: '100%' }}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={6} lg={10} md={12} sm={24} xs={24}>
                    <FormItem {...formItemLayout} label="状态">
                      {getFieldDecorator('state', {})(
                        <Select placeholder="请选择" style={{ maxWidth: 200, width: '100%' }}>
                          {complaintData.state_select.length &&
                            complaintData.state_select.map(e => (
                              <Option key={e.value} value={e.value}>
                                {e.name}
                              </Option>
                            ))}
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={6} sm={24}>
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

            <Table dataSource={complaintData.list} columns={this.columns} />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ComplaintList;
