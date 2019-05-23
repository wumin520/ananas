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
  Badge,
  Carousel,
  Icon,
  Radio,
} from 'antd';
// import ModelPop from './components/ModelPop';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './qfList.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;

let params = {
  page: 1, // 翻页参数
  task_id: 0, // 推广编号
  goods_id: 0, // 商品id
  type: '30,31',
  // state: -1, // 状态 已完成&无效
};

@connect(({ order, loading }) => ({
  fansData: order.fansData,
  loading: loading.models.order,
}))
@Form.create()
class orderList extends PureComponent {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      modal1Visible: false,
      itemImg: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { query } = location;
    params.task_id = query.task_id || 0;
    this.getfansData(params);
  }

  getfansData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fansList',
      payload: p,
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

      params.page = 1;
      params.task_id = values.task_id || 0;
      params.goods_id = values.goods_id || 0;

      dispatch({
        type: 'order/fansList',
        payload: params,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    params.page = 1;
    params.task_id = 0;
    params.goods_id = 0;

    dispatch({
      type: 'order/fansData',
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
    this.getfansData(params);
  };

  radioGroupOnChange = e => {
    console.log('radioGroupOnChange -> ', e);
    params.type = e.target.value;
    params = {
      page: 1, // 翻页参数
      task_id: 0, // 推广编号
      goods_id: 0, // 商品id
      type: e.target.value,
    };
    this.getfansData(params);
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
    const { location } = this.props;
    const { query } = location;
    const defaultValue = query.task_id;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id', { initialValue: defaultValue })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品/店铺id">
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
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    /* eslint-disable */
    const { fansData } = this.props;
    const orderNumInfo = fansData.order_stat;
    const pageInfo = fansData.page_info;
    const { list } = fansData;
    const { modal1Visible, itemImg } = this.state;
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
        title: '用户昵称',
        dataIndex: 'nick_name',
        key: 'nick_name',
        width: 150,
      },
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 90,
      },
      {
        key: 'goods_id',
        title: '商品/店铺id',
        width: 110,
        dataIndex: 'goods_id',
      },
      {
        title: '商品/店铺名称',
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
        title: '状态',
        width: 90,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '上传时间',
        width: 200,
        render(val) {
          /* eslint-disable */
          return (
            <span>
              <span>{val.proof_time}</span>
            </span>
          );
        },
      },
      {
        title: '操作',
        width: 90,
        render: item => {
          const { itemImg } = this.state;
          const url = `/order/qfDetail?order_id=${item.order_id}`;
          let option;
          if (item.proof_images.length > 0) {
            option = (
              <span>
                <a onClick={this.setModal1Visible.bind(this, item)}>收藏凭证</a>
                <ModelPops itemImg={itemImg} />
              </span>
            );
          }
          return (
            <span>
              {/* <a onClick={this.goOrderDetail.bind(this, item)} target='_blank'>查看 </a> */}
              <a href={url} target="_blank">
                查看{' '}
              </a>
              <br />
              {option}
            </span>
          );
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
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.radioGroupOnChange} defaultValue="30,31">
          <RadioButton value="30,31">全部圈粉</RadioButton>
          <RadioButton value="30">商品圈粉</RadioButton>
          <RadioButton value="31">店铺圈粉</RadioButton>
        </RadioGroup>
      </div>
    );
    return (
      <PageHeaderWrapper title=" " content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="今日圈粉" value={orderNumInfo.daily_num} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="累计圈粉" value={orderNumInfo.total_num} />
              </Col>
            </Row>
          </Card>
          <br />
          <Card className={styles.customStyleCard} extra={extraContent}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.id}
                columns={columns}
                dataSource={list}
                pagination={{
                  defaultCurrent: 1,
                  current: fansData.page_info.current_page,
                  pageSize: fansData.page_info.per_page,
                  total: fansData.page_info.total_num,
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

export default orderList;
