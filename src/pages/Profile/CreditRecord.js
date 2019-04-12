import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Form,
  DatePicker,
  Select,
  Table,
  Badge,
  Divider,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './CreditRecord.less';

const FormItem = Form.Item;
const { Option } = Select;
const SelectOption = Select.Option;
const { TextArea } = Input;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({ rule, list, loading }) => ({
  rule,
  list,
  loading: loading.models.list,
}))
@Form.create()
class CreditRecord extends Component {
  state = { visible: false, done: false };

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
  ];

  dataStatic = [
    {
      key: '1',
      pointDeduct: '满12分',
      backQ: '限制',
    },
    {
      key: '2',
      pointDeduct: '满12分',
      backQ: '限制',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
    dispatch({
      type: 'rule/fetch',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const { loading } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const { rule } = this.props;
    const {
      data: { list = [] },
    } = rule;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择任务负责人' }],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="当前积分" value="85" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="账户限制" value="无限制" bordered />
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

            <Table loading={loading} dataSource={list} columns={this.columns} />
          </Card>
          <Card>
            <Table
              columns={this.columnsStatic}
              dataSource={this.dataStatic}
              bordered
              title={() => '扣分限制'}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default CreditRecord;
