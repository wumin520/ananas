import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Pagination } from 'antd';
// import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const FormItem = Form.Item;
const statusMap = ['processing', 'warning', 'success', 'default', 'default', 'error', 'success'];
const status = ['审核中', '审核驳回', '进行中', '已完成', '已终止', '已下架', '结算中'];
const { Option } = Select;

@connect(({ task, loading }) => ({
  task,
  loading: loading.effects['task/fetchBasic'],
}))
@Form.create()
class BasicList extends PureComponent {
  state = {};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchBasic',
      payload: {
        page: 1,
        task_id: '222',
        goods_id: '222',
        state: 0,
      },
    });
  }

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/submit',
      payload: { id },
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品id">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="推广类型">
              {getFieldDecorator('abc')(
                <Select placeholder="全部" style={{ width: '100%' }}>
                  <Option value="0">好评全返</Option>
                  <Option value="1">大额券</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="全部" style={{ width: '100%' }}>
                  <Option value="0">审核中</Option>
                  <Option value="1">审核驳回</Option>
                  <Option value="2">进行中</Option>
                  <Option value="3">已完成</Option>
                  <Option value="4">已下架</Option>
                  <Option value="5">结算中</Option>
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
    const goDetail = '/fangdan/list/generalizeDetail';
    const goOrder = '/fangdan/list/order';
    const columns = [
      {
        title: '推广编号',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="">{text}</a>,
      },
      {
        title: '商品',
        dataIndex: 'product',
        key: 'product',
        render: val => {
          return (
            <p>
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50 }} />
              <span> {val.title}</span>
            </p>
          );
        },
      },
      {
        title: '提交时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '推广份数',
        dataIndex: 'count',
        key: 'count',
        render: val => {
          return (
            <p>
              <span>发放份数 {val.a}</span>
              <span>&nbsp;&nbsp;评价人数 {val.b}</span>
              <br />
              <span>下单人数 {val.c}</span>
              <span>&nbsp;&nbsp;售后人数 {val.d}</span>
            </p>
          );
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href={goDetail}>查看 {record.name}</a>
            {/* <Divider type="vertical" /> */}
            <a href={goOrder}>订单明细 </a>
            <br />
            <a href="">下架 </a>
            {/* <Divider type="vertical" /> */}
            <a href="">终止 </a>
            <br />
            <a href="">上架 </a>
            <a href="">编辑 </a>
          </span>
        ),
      },
    ];
    const data = [
      {
        key: '1',
        number: '12334',
        product: {
          img:
            'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
          title: '商品名称1行的商品名称',
        },
        date: '2016-09-21  08:50:08',
        price: '￥20.00',
        status: 0,
        count: {
          a: '100',
          b: '200',
          c: '300',
          d: '0',
        },
        action: 0,
      },
      {
        key: '2',
        number: '12334',
        product: {
          img:
            'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
          title: '商品名称1行的商品名称',
        },
        date: '2016-09-21  08:50:08',
        price: '￥20.00',
        status: 1,
        count: {
          a: '100',
          b: '200',
          c: '300',
          d: '0',
        },
        action: 1,
      },
      {
        key: '3',
        number: '12334',
        product: {
          img:
            'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
          title: '商品名称1行的商品名称',
        },
        date: '2016-09-21  08:50:08',
        price: '￥20.00',
        status: 2,
        count: {
          a: '100',
          b: '200',
          c: '300',
          d: '0',
        },
        action: 2,
      },
      {
        key: '4',
        number: '12334',
        product: {
          img:
            'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
          title: '商品名称1行的商品名称',
        },
        date: '2016-09-21  08:50:08',
        price: '￥20.00',
        status: 3,
        count: {
          a: '100',
          b: '200',
          c: '300',
          d: '0',
        },
        action: 3,
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
    // function onShowSizeChange(current, pageSize) {
    //   console.log(current, pageSize);
    // }
    function onChange(pageNumber) {
      console.log('Page: ', pageNumber);
    }
    return (
      <PageHeaderWrapper title=" " content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="进行中" value="8个" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="审核中" value="32个" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已完成" value="24个" />
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
                <p>共90条记录 第1/50页</p>
                <Pagination
                  showSizeChanger
                  showQuickJumper
                  defaultCurrent={1}
                  total={90}
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

export default BasicList;
