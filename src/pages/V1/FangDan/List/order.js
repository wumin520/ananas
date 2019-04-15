import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Pagination } from 'antd';
// import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './order.less';

const { Option } = Select;
const FormItem = Form.Item;
const statusMap = ['error', 'processing', 'warning', 'success'];
const status = ['无效', '已下单', '待评价', '已完成'];
@connect(({ task, loading }) => ({
  orderData: task.orderData,
  loading: loading.models.task,
}))
@Form.create()
class OrderList extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/orderData',
      payload: {
        page: 1,
        task_id: '2222',
        goods_id: '222',
        state: 0,
      },
    });
  }

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
      // this.setState({
      //   formValues: values,
      // });

      dispatch({
        type: 'task/orderData',
        payload: values,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    // this.setState({
    //   formValues: {},
    // });
    dispatch({
      type: 'task/fetch',
      payload: {},
    });
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
              {getFieldDecorator('number')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品id">
              {getFieldDecorator('productId')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
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
    const goDetail = `/fangdan/list/generalizeDetail`;
    const { orderData } = this.props;
    const orderNumInfo = orderData.order_num_info;
    const pageInfo = orderData.page_info;
    // const { list } = orderData;
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
            <p>
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
              <span> {val.goods_name}</span>
            </p>
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
        dataIndex: 'orderPrice',
        key: 'orderPrice',
        render(orderPrice) {
          return <span>￥{orderPrice}</span>;
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
        render(val) {
          return (
            <span>
              <span>下单:{val.ordered_datetime}</span>
              <br />
              <span>确认收货:{val.harvest_time}</span>
              <br />
              <span>好评:{val.proof_time}</span>
              <br />
              <span>售后:</span>
            </span>
          );
        },
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <span>
            <a href={goDetail}>查看</a>
          </span>
        ),
      },
    ];
    const data = [
      {
        key: '1',
        task_id: '12334',
        p_order_id: 2020202,
        goods_name: '商品名称',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        orderPrice: 200.0,
        state: '0',
        ordered_datetime: '2019-02-10 00:00:00',
        harvest_time: '2019-02-10 00:00:00',
        proof_time: '',
      },
      {
        key: '2',
        task_id: '12334',
        p_order_id: 2020202,
        goods_name: '商品名称',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        orderPrice: 200.0,
        state: '1',
        ordered_datetime: '2019-02-10 00:00:00',
        harvest_time: '2019-02-10 00:00:00',
        proof_time: '',
      },
      {
        key: '3',
        task_id: '12334',
        p_order_id: 2020202,
        goods_name: '商品名称',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        orderPrice: 200.0,
        state: '2',
        ordered_datetime: '2019-02-10 00:00:00',
        harvest_time: '2019-02-10 00:00:00',
        proof_time: '',
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
      <PageHeaderWrapper title=" " content={content}>
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
                dataSource={data}
                pagination={false}
                className={styles.tableMargin}
              />
              <div className={styles.pageBottom}>
                <p>
                  共{pageInfo.total_num}条记录 第1/{pageInfo.total_page}页
                </p>
                <Pagination
                  showSizeChanger
                  showQuickJumper
                  defaultCurrent={1}
                  total={pageInfo.total_num}
                  onChange={onChange}
                />
              </div>
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default OrderList;
