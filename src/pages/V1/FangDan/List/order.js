import React, { PureComponent } from 'react';
// import { findDOMNode } from 'react-dom';
// import moment from 'moment';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Pagination } from 'antd';
// import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';
import styles from './order.less';

const { Option } = Select;
const FormItem = Form.Item;
const statusMap = ['processing', 'success', 'error', 'warning'];
const status = ['已下单', '已完成', '无效', '待评价'];
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
  state = {};

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
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="全部" style={{ width: '100%' }}>
                  <Option value="0">已下单</Option>
                  <Option value="1">已完成</Option>
                  <Option value="2">售后</Option>
                  <Option value="3">待评价</Option>
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
    const columns = [
      {
        title: '推广编号',
        dataIndex: 'number',
        key: 'number',
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
        title: '订单编号',
        dataIndex: 'dnumber',
        key: 'dnumber',
      },
      {
        title: '购买价格',
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
        title: '时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="">查看 {record.name}</a>
          </span>
        ),
      },
    ];
    const data = [
      {
        key: '1',
        number: '12334',
        dnumber: '13245',
        product: {
          img:
            'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
          title: '商品名称1行的商品名称',
        },
        date: '2016-09-21  08:50:08',
        price: '￥20.00',
        status: 0,
        count: {
          a: 100,
          b: 200,
          c: 300,
        },
      },
      {
        key: '2',
        dnumber: '13245',
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
          a: 100,
          b: 200,
          c: 300,
        },
      },
      {
        key: '3',
        number: '12334',
        dnumber: '13245',
        product: {
          img:
            'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
          title: '商品名称1行的商品名称',
        },
        date: '2016-09-21  08:50:08',
        price: '￥20.00',
        status: 2,
        count: {
          a: 100,
          b: 200,
          c: 300,
        },
      },
    ];

    // const modalFooter = done
    //   ? { footer: null, onCancel: this.handleDone }
    //   : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

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
              <Col sm={6} xs={24}>
                <Info title="已下单" value="8个" bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="待评价" value="32个" bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="待返现" value="24个" />
              </Col>
              <Col sm={6} xs={24}>
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
                <p>共400条记录 第1/50页</p>
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
