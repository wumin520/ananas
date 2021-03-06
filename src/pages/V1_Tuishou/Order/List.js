import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  Card,
  Row,
  Col,
  Modal,
  Input,
  Button,
  Form,
  Select,
  Badge,
  Carousel,
  DatePicker,
  Icon,
} from 'antd';
// import ModelPop from './components/ModelPop';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './List.less';

const { Option } = Select;
const FormItem = Form.Item;

let params = {
  page: 1,
  order_id: 0,
  title: '',
  terminal_type: 0,
  state: 0,
  ordered_time_for: '',
  ordered_time_to: '',
};

@connect(({ order, loading }) => ({
  orderData: order.orderData,
  loading: loading.models.order,
}))
@Form.create()
class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      modal1Visible: false,
      itemImg: [],
      tabActiveKey: 'haoping',
      startTime: '',
      endTime: '',
    };
  }

  componentDidMount() {
    // this.getOrderData(params);
    this.handleFormReset();
  }

  getOrderData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/queryOrder',
      payload: p,
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

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { startTime, endTime } = this.state;
    console.log('startTime, endTime====>', startTime, endTime);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      params = {
        page: 1,
        order_id: values.order_id || 0,
        title: values.title || '',
        terminal_type: values.terminal || 0,
        state: values.state || 0,
        ordered_time_for: `${startTime} 00:00:00` || '',
        ordered_time_to: `${endTime} 23:59:59` || '',
      };
      dispatch({
        type: 'order/queryOrder',
        payload: params,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    params = {
      page: 1,
      order_id: 0,
      title: '',
      terminal_type: 0,
      state: 0,
      ordered_time_for: '',
      ordered_time_to: '',
    };
    dispatch({
      type: 'order/queryOrder',
      payload: params,
    });
  };

  // goOrderDetail = item => {
  // const w = window.open('about:blank');
  // w.location.href = `/order/productDetail?order_id=${item.order_id}`;
  // router.push(`/order/productDetail?order_id=${item.order_id}`);
  // };

  // model
  setModal1Visible = item => {
    this.setState({
      modal1Visible: true,
      itemImg: item.proof_images,
    });
  };

  Closable = () => {
    this.setState({
      modal1Visible: false,
    });
  };

  onChange = page => {
    params.page = page;
    this.getOrderData(params);
  };

  handleTabChange = (key, val) => {
    console.log('handleTabChange', key, val);
    this.setState({
      tabActiveKey: key,
    });
    if (key === 'haoping') {
      this.qf = undefined;
      params.type = 10;
    } else if (key === 'quanfen') {
      this.qf = 1;
      params.type = '30,31';
    } else if (key === 'deq') {
      params.type = 20;
    }
    params.page = 1;
    params.task_id = 0;
    params.goods_id = 0;
    params.state = -1;
    this.getOrderData(params);
    // 清空input框中上次输入的值
    const { form } = this.props;
    form.resetFields();
  };

  // 轮播左右切换
  next() {
    this.slider.slick.slickNext();
  }

  prev() {
    this.slider.slick.slickPrev();
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { orderData } = this.props;
    const stateSelect = orderData.state;
    const { terminal } = orderData;
    // const { location } = this.props;
    // const { query } = location;
    // const defaultValue = query.task_id;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="订单编号">
              {getFieldDecorator('order_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('title')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="来源">
              {getFieldDecorator('terminal')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="全部"
                  onChange={this.selectTypeChange}
                >
                  {terminal.length &&
                    terminal.map(e => (
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
        <Row colSpan="5">
          <FormItem label="下单时间">
            {getFieldDecorator('ordered_time_to')(
              <DatePicker.RangePicker format="YYYY-MM-DD" onChange={this.selectPlanTime} />
            )}
          </FormItem>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    /* eslint-disable */
    const { orderData } = this.props;
    const orderNumInfo = orderData.stat;
    const pageInfo = orderData.page_info;
    const { list } = orderData;
    const { modal1Visible, itemImg, tabActiveKey } = this.state;
    const ModelPops = ({ itemImg }) => (
      <Modal
        style={{ top: 20 }}
        footer={null}
        visible={modal1Visible}
        maskClosable={true}
        onCancel={this.Closable.bind()}
      >
        <Carousel
          autoplay
          dots={false}
          ref={el => (this.slider = el)}
          bodyStyle={{ backgroundColor: '#F6F7F8' }}
        >
          {itemImg.length > 0 &&
            itemImg.map(e => (
              <div className={styles.models}>
                <a href={e} target="_Blank">
                  <img src={e} alt="" className={styles.hp_img} />
                </a>
              </div>
            ))}
        </Carousel>
        <div className={styles.btn}>
          <Icon type="left" onClick={this.prev} />
          <Icon type="right" onClick={this.next} />
        </div>
      </Modal>
    );

    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_id',
        key: 'order_id',
        width: 150,
      },
      {
        title: '商品名称',
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
        width: 90,
        render(item) {
          return <span>￥{item.order_price}</span>;
        },
      },
      {
        title: '预估佣金',
        width: 90,
        render(item) {
          return <span>￥{item.commission_amount}</span>;
        },
      },
      {
        title: '下单时间',
        width: 200,
        dataIndex: 'ordered_datetime',
      },
      {
        title: '来源',
        width: 90,
        dataIndex: 'terminal_desc',
      },
      {
        title: '状态',
        width: 90,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      // {
      //   title: '操作',
      //   width: 90,
      //   render: item => {
      //     const { itemImg } = this.state;
      //     const url = `/order/productDetail?order_id=${item.order_id}`;
      //     let option;
      //     // if (item.proof_images.length > 0) {
      //     //   {
      //     //     /** option = (
      //     //     <span>
      //     //       <a onClick={this.setModal1Visible.bind(this, item)}>免单凭证</a>
      //     //       <ModelPops itemImg={itemImg} />
      //     //     </span>
      //     //   ); */
      //     //   }
      //     // }
      //     return (
      //       <span>
      //         {/* <a onClick={this.goOrderDetail.bind(this, item)} target='_blank'>查看 </a> */}
      //         <a href={url} target="_blank">
      //           查看{' '}
      //         </a>
      //         <br />
      //         {option}
      //       </span>
      //     );
      //   },
      // },
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
      <PageHeaderWrapper
        title="订单列表"
        content={content}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={24}>
                <Info title="已下单" value={orderNumInfo.ordered} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="已完成" value={orderNumInfo.finished} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="未支付" value={orderNumInfo.unpaid} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="无效" value={orderNumInfo.invalid} />
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
                dataSource={list}
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

export default OrderList;
