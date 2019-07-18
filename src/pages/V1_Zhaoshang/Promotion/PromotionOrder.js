import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './Plan.less';

const FormItem = Form.Item;
const { Option } = Select;

let params = {
  page: 1, // 翻页参数
  sh_id: 0,
  task_id: 0, // 推广编号
  goods_id: 0, // 商品id
  p_order_id: 0, // 订单编号
  state: -1,
  type: 10,
  ordered_time_for: '',
  ordered_time_to: '',
};

@connect(({ promotion, loading }) => ({
  orderData: promotion.orderData,
  loading: loading.effects['promotion/orderData'],
}))
@Form.create()
class PromotionOrder extends PureComponent {
  state = {
    startTime: '',
    endTime: '',
    tabActiveKey: 'haoping',
  };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '订单编号',
        dataIndex: 'p_order_id',
        key: 'p_order_id',
        width: 100,
      },
      {
        key: 'sh_name',
        dataIndex: 'sh_name',
        title: '商户名称',
        width: 120,
      },
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 100,
      },
      {
        title: '商品',
        width: 143,
        render: val => {
          return (
            <a
              className={styles.pro}
              href={val.goods_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.title}</span>
            </a>
          );
        },
      },
      {
        title: '购买价格',
        dataIndex: 'order_price',
        key: 'order_price',
        width: 125,
        render: item => {
          return <span>￥{item}</span>;
        },
      },
      {
        title: '状态',
        width: 100,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '时间',
        width: 150,
        render: item => {
          return <span>下单：{item.ordered_datetime}</span>;
        },
      },
      {
        title: '操作',
        width: 120,
        render: item => {
          return <a onClick={this.goDetail.bind(this, item)}>查看 </a>;
        },
      },
    ];
  }

  componentDidMount() {
    params.type = 10;
    this.getOrderData(params);
  }

  // 接口
  getOrderData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/orderData',
      payload: params,
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    const { startTime, endTime } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      params.page = 1;
      params.task_id = values.task_id || 0;
      params.sh_id = values.sh_id || 0;
      params.goods_id = values.goods_id || 0;
      params.p_order_id = values.p_order_id || 0;
      params.ordered_time_to = endTime || '';
      params.ordered_time_for = startTime || '';
      params.state = values.state || -1;
      this.getOrderData(params);
    });
  };

  // 保存筛选日期
  selectPlanTime = date => {
    const startTimeTemp = moment(date[0]).format('YYYY-MM-DD');
    const endTimeTemp = moment(date[1]).format('YYYY-MM-DD');
    this.setState({
      startTime: startTimeTemp,
      endTime: endTimeTemp,
    });
  };

  // 重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    params.page = 1;
    params.sh_id = 0;
    params.task_id = 0;
    params.goods_id = 0;
    params.state = -1;
    params.p_order_id = 0;
    this.getOrderData(params);
  };

  goDetail = item => {
    const path = `/work/promotion/orderDetail`;
    window.open(`${path}?order_id=${item.order_id}`);
  };

  onChange = page => {
    params.page = page;
    this.getOrderData(params);
  };

  handleTabChange = key => {
    this.setState({
      tabActiveKey: key,
    });
    if (key === 'haoping') {
      params.type = 10;
    } else if (key === 'quanfen') {
      params.type = '30,31';
    } else if (key === 'deq') {
      params.type = 20;
    }
    params.page = 1;
    params.task_id = 0;
    params.goods_id = 0;
    params.sh_id = 0;
    params.p_order_id = 0;
    params.state = -1;
    this.getOrderData(params);
    // 清空input框中上次输入的值
    const { form } = this.props;
    form.resetFields();
  };

  radioGroupOnChange = e => {
    params.type = e.target.value;
    params = {
      page: 1,
      task_id: 0,
      goods_id: 0,
      sh_id: 0,
      p_order_id: 0,
      state: -1,
      type: e.target.value,
    };
    this.getOrderData(params);
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
            <FormItem label="订单编号">
              {getFieldDecorator('p_order_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="店铺编号">
              {getFieldDecorator('sh_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品编号">
              {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
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
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="下单时间">
              {getFieldDecorator('endTime')(
                <DatePicker.RangePicker format="YYYY-MM-DD" onChange={this.selectPlanTime} />
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
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    // 表格数据
    const { orderData } = this.props;
    const { tabActiveKey } = this.state;
    const { columns } = this;
    const content = <div />;
    const tabList = [
      {
        key: 'haoping',
        tab: '试用推广',
      },
      {
        key: 'deq',
        tab: '高佣推广',
      },
    ];

    const extraContent = '';

    return (
      <PageHeaderWrapper
        title="订单列表"
        content={content}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.standardList}>
          <Card className={styles.customStyleCard} extra={extraContent}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.id}
                columns={columns}
                dataSource={orderData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: orderData.page_info.current_page,
                  pageSize: orderData.page_info.per_page,
                  total: orderData.page_info.total_num,
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

export default PromotionOrder;
