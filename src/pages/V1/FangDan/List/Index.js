import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const FormItem = Form.Item;
const statusMap = ['warning', 'processing', 'success', 'error', 'warning', 'default'];
const status = ['待支付', '审核中', '进行中', '审核驳回', '清算中', '已结算'];
const { Option } = Select;

const { confirm } = Modal;

@connect(({ task, loading }) => ({
  listData: task.listData,
  loading: loading.effects['task/fetchBasic'],
}))
@Form.create()
class FdList extends PureComponent {
  state = {
    page: 1,
  };

  componentDidMount() {
    const { page } = this.state;
    this.getListData(page);
  }

  // 接口
  getListData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchBasic',
      payload: {
        page: p,
      },
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      dispatch({
        type: 'task/fetchBasic',
        payload: values,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'task/fetch',
      payload: {},
    });
  };

  taskFinish = item => {
    const { dispatch } = this.props;
    const thises = this;
    confirm({
      title: '确认要终止吗？',
      content: '推广终止后不能恢复，商品将立即下线，确认要终止吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'task/finishMessage',
          payload: {
            page: 1,
            task_id: item.task_id,
          },
        }).then(() => {
          thises.getListData();
        });
      },
    });
  };

  goDetail = item => {
    router.push(`/fangdan/list/generalizeDetail?task_id=${item.task_id}`);
  };

  goPay = item => {
    router.push(
      `/fangdan/step-form/pay?task_id=${item.task_id}&goods_id=${item.goods_id}&need_fetch=1`
    );
  };

  // 订单明细
  goOrder = item => {
    // console.log('this:', item.task_id);
    router.push(`/order/Index?&task_id=${item.task_id}`);
  };

  // 编辑
  goRedact = item => {
    router.push(
      `/fangdan/step-form/confirm?task_id=${item.task_id}&goods_id=${item.goods_id}&action=edit`
    );
  };

  onChange = page => {
    const params = {
      currentPage: page,
      pageSize: 10,
    };
    this.getListData(params.currentPage);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { listData } = this.props;
    const stateSelect = listData.state_select;
    const typeSelect = listData.type_select;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品id">
              {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="推广类型">
              {getFieldDecorator('type')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="全部"
                  onChange={this.selectTypeChange}
                >
                  {typeSelect.length > 0 &&
                    typeSelect.map(e => (
                      <Option key={e.value} value={e.value}>
                        {e.name}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('state')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="全部"
                  onChange={this.selectTypeChange}
                >
                  {stateSelect.length &&
                    stateSelect.map(e => (
                      <Option key={e.value} value={e.value}>
                        {e.name}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
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
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    // 表格数据
    const { listData } = this.props;
    const taskInfo = listData.task_info;
    const columns = [
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 91,
      },
      {
        title: '商品',
        render: val => {
          return (
            <span className={styles.pro}>
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.title}</span>
            </span>
          );
        },
      },
      {
        title: '提交时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 222,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: item => {
          return <span>￥{item}</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 110,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '推广份数',
        width: 182,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>发放份数 {item.total_amount}</span>
              <br />
              <span>评价人数 {item.comment_num}</span>
              <br />
              <span>下单人数 {item.order_num}</span>
              <br />
              <span>售后人数 {item.sale_back_num}</span>
            </p>
          );
        },
      },
      {
        title: '操作',
        width: 120,
        render: item => {
          let operation;
          if (item.state === 0) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goPay.bind(this, item)}>支付 </a>
              </span>
            );
          }
          if (item.state === 1) {
            operation = <a onClick={this.goDetail.bind(this, item)}>查看 </a>;
          }
          if (item.state === 2) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goOrder.bind(this, item)}>订单明细 </a>
                <br />
                <a onClick={this.taskFinish.bind(this, item)}>终止 </a>
              </span>
            );
          }
          if (item.state === 3) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goRedact.bind(this, item)}>编辑 </a>
              </span>
            );
          }
          if (item.state === 4 || item.state === 5) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goOrder.bind(this, item)}>订单明细 </a>
              </span>
            );
          }
          return <span>{operation}</span>;
        },
      },
    ];

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const content = <div />;
    return (
      <PageHeaderWrapper title="放单列表" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="进行中" value={taskInfo.running_num} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="审核中" value={taskInfo.verifying_num} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已完成" value={taskInfo.finish_num} />
              </Col>
            </Row>
          </Card>
          <br />
          <Card>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.id}
                columns={columns}
                dataSource={listData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: listData.page_info.current_page,
                  pageSize: listData.page_info.per_page,
                  total: listData.page_info.total_num,
                  onChange: this.onChange,
                }}
              />
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FdList;
