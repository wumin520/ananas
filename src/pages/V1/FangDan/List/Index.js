import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Pagination } from 'antd';
// import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const FormItem = Form.Item;
const statusMap = ['warning', 'processing', 'success', 'error', 'warning', 'default'];
const status = ['待支付', '审核中', '进行中', '审核驳回', '清算中', '已完成'];
const { Option } = Select;

@connect(({ task, loading }) => ({
  task,
  loading: loading.effects['task/fetchBasic'],
}))
@Form.create()
class FdList extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchBasic',
      payload: {
        page: 1,
        task_id: '2222',
        goods_id: '222',
        state: 0,
        type: -1,
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
        type: 'rule/fetch',
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

  // 搜索
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    // const { type_select, state_select } = this.props;
    const typeSelect = [{ name: '全部', value: '-1' }, { name: '好评全返', value: '0' }];
    const stateSelect = [
      { name: '全部', value: '-1' },
      { name: '待支付', value: '0' },
      { name: '审核中', value: '1' },
      { name: '进行中', value: '2' },
      { name: '审核驳回', value: '3' },
      { name: '清算中', value: '4' },
      { name: '已结算', value: '5' },
    ];
    return (
      // console.log('state_select:',state_select),
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
            <FormItem label="推广类型">
              {getFieldDecorator('type')(
                <Select style={{ width: 120 }} placeholder="全部" onChange={this.selectTypeChange}>
                  {typeSelect.length &&
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
              {getFieldDecorator('status')(
                <Select style={{ width: 120 }} placeholder="全部" onChange={this.selectTypeChange}>
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
    // const { list ,task_info, state_select,type_select,page_info} = this.props;
    // 跳转路径
    const goDetail = `/fangdan/list/generalizeDetail`;
    const goOrder = '/fangdan/list/order';

    const taskInfo = {
      running_num: 10, // 进行中
      verifying_num: 100, // 审核中
      finish_num: 100, // 已完成数
    };
    const pageInfo = {
      total_num: 100, // 总数
      total_page: 5, // 页数
    };

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
              <span> {val.title}</span>
            </p>
          );
        },
      },
      {
        title: '提交时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '推广份数',
        render: item => {
          return (
            <p>
              <span>发放份数 {item.total_amount}</span>
              <span>&nbsp;&nbsp;评价人数 {item.order_num}</span>
              <br />
              <span>下单人数 {item.comment_num}</span>
              <span>&nbsp;&nbsp;售后人数 {item.sale_back_num}</span>
            </p>
          );
        },
      },
      {
        title: '操作',
        render: item => {
          let operation;
          // if(state != 0){
          //   operation = (<a href={goDetail}>查看 </a>)
          // }
          // if(state!=1&&state!=3){
          //   operation = (<a href="">编辑 </a>)
          // }
          // if(state == 2){
          //   operation = (<a href="">终止 </a>)
          // }
          // if(state == 0){
          //   operation = (<a href="">支付 </a>)
          // }
          // if(state != 0&&state != 1&&state != 3){
          //   operation = (<a href={goOrder}>订单明细 </a>)
          // }
          if (item.state === 0) {
            operation = <a href="">支付 </a>;
            // operation = (<a href={goDetail}>查看 </a>)
          }
          if (item.state === 1) {
            operation = <a href={goDetail}>查看 </a>;
          }
          if (item.state === 2) {
            operation = (
              <span>
                <a href={goDetail}>查看 </a>
                <a href={goOrder}>订单明细 </a>
                <br />
                <a href="">终止 </a>
              </span>
            );
          }
          if (item.state === 3) {
            operation = (
              <span>
                <a href={goDetail}>查看 </a>
                <a href="">编辑 </a>
              </span>
            );
          }
          if (item.state === 4 || item.state === 5) {
            operation = (
              <span>
                <a href={goDetail}>查看 </a>
                <a href={goOrder}>订单明细 </a>
              </span>
            );
          }
          return <span>{operation}</span>;
        },
      },
    ];
    const list = [
      {
        key: '1',
        task_id: '12334',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        title: '商品名称1行的商品名称',
        created_at: '2016-09-21  08:50:08',
        price: '￥20.00',
        state: 0,
        total_amount: 200,
        order_num: 100,
        comment_num: 80,
        sale_back_num: 10,
      },
      {
        key: '2',
        task_id: '12334',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        title: '商品名称1行的商品名称',
        created_at: '2016-09-21  08:50:08',
        price: '￥20.00',
        state: 1,
        total_amount: 200,
        order_num: 100,
        comment_num: 80,
        sale_back_num: 10,
      },
      {
        key: '3',
        task_id: '12334',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        title: '商品名称1行的商品名称',
        created_at: '2016-09-21  08:50:08',
        price: '￥20.00',
        state: 2,
        total_amount: 200,
        order_num: 100,
        comment_num: 80,
        sale_back_num: 10,
      },
      {
        key: '4',
        task_id: '12334',
        img: 'https://cdn.youlianyc.com/image/static/52f7920ea62f13d30565a38c5786aeb63b82c453.jpg',
        title: '商品名称1行的商品名称',
        created_at: '2016-09-21  08:50:08',
        price: '￥20.00',
        state: 3,
        total_amount: 200,
        order_num: 100,
        comment_num: 80,
        sale_back_num: 10,
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

    // card
    return (
      <PageHeaderWrapper title=" " content={content}>
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
                columns={columns}
                dataSource={list}
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

export default FdList;
