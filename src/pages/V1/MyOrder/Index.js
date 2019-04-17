import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Pagination } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { router } from 'umi';
import styles from './Index.less';

const { Option } = Select;
const FormItem = Form.Item;
const statusMap = ['error', 'processing', 'warning', 'success'];
const status = ['无效', '已下单', '待评价', '已完成'];
// const param = {
//   page: 1,
//   task_id: '2222',
//   goods_id: '222',
//   state: 0,
// };
@connect(({ task, loading }) => ({
  orderData: task.orderData,
  loading: loading.models.task,
}))
@Form.create()
class OrderList extends PureComponent {
  state = {};

  componentDidMount() {
    this.getOrderData();
  }

  getOrderData = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    dispatch({
      type: 'task/orderData',
      payload: {
        task_id: query.task_id,
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
        type: 'task/orderData',
        payload: values,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch, location } = this.props;
    const { query } = location;
    form.resetFields();
    // this.setState({
    //   formValues: {},
    // });
    dispatch({
      type: 'task/orderData',
      payload: {
        task_id: query.task_id,
      },
    });
  };

  goOrderDetail = item => {
    router.push(`/fangdan/list/ProductDetail?order_id=${item.order_id}`);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { orderData } = this.props;
    const stateSelect = orderData.state_select;
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
    const { orderData } = this.props;
    const orderNumInfo = orderData.order_num_info;
    const pageInfo = orderData.page_info;
    const { list } = orderData;
    const columns = [
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
      },
      {
        title: '商品',
        render: val => {
          return (
            <span className={styles.pro}>
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.goods_name}</span>
            </span>
          );
        },
      },
      {
        title: '订单编号',
        dataIndex: 'p_order_id',
        key: 'p_order_id',
      },
      {
        title: '购买价格',
        render(item) {
          return <span>￥{item.order_price}</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '时间',
        render: val => {
          /* eslint-disable */
          const time = (
            <span>
              <span>{val.paid_datetime ? '付款: ' + val.paid_datetime : ''}</span>
              <br />
              <span> {val.harvest_time ? '确认收货: ' + val.harvest_time : ''}</span>
              <br />
              <span>{val.proof_time ? '好评: ' + val.proof_time : ''}</span>
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
      {
        title: '操作',
        render: item => (
          <span>
            <a onClick={this.goOrderDetail.bind(this, item)}>查看</a>
          </span>
        ),
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
    // 分页
    // function onShowSizeChange(current, pageSize) {
    //   console.log(current, pageSize);
    // }
    function onChange(pageNumber) {
      console.log('Page: ', pageNumber);
    }
    // 分页
    return (
      <PageHeaderWrapper title="订单明细" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="已下单" value={orderNumInfo.pay_num} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="待评价" value={orderNumInfo.wait_proof_num} bordered />
              </Col>

              <Col sm={8} xs={24}>
                <Info title="已完成" value={orderNumInfo.finish_num} />
              </Col>
            </Row>
          </Card>
          <br />
          <Card>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                columns={columns}
                dataSource={list}
                pagination={false}
                className={styles.tableMargin}
              />
              <div className={styles.pageBottom}>
                {/* <p>
                  共{pageInfo.total_num}条记录 第1/{pageInfo.total_page}页
                </p> */}
                <Pagination defaultCurrent={1} total={pageInfo.total_num} onChange={onChange} />
                {/* <Pagination
                  showSizeChanger
                  showQuickJumper
                  defaultCurrent={1}
                  total={pageInfo.total_num}
                  onChange={onChange}
                /> */}
              </div>
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default OrderList;
