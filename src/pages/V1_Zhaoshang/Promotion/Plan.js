import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Radio, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './Plan.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

let params = {
  page: 1, // 翻页参数
  task_id: 0, // 推广编号
  sh_id: 0,
  goods_id: 0, // 商品id
  mall_id: 0, // 店铺编号
  state: -1, // 状态-1 全部 0待支付，1待审核，2进行中，3审核驳回 4 清算中 5 已结算
  type: 10, // 推广类型 全部 10-免单全返 20-大额券推广 30-圈粉-收藏商品 31-圈粉-收藏店铺 注意：多个“,”隔开，eg:圈粉全部：30,31 默认：10
  start_time: '',
  end_time: '',
};

@connect(({ promotion, loading }) => ({
  listData: promotion.listData,
  loading: loading.effects['promotion/planList'],
}))
@Form.create()
class Plan extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '投放时间',
        dataIndex: 'plan_time',
        key: 'plan_time',
        width: 160,
      },
      {
        key: 'mall_name',
        title: '商户名称',
        width: 120,
        dataIndex: 'mall_name',
      },
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 90,
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
        title: '券后价',
        dataIndex: 'after_coupon_price',
        key: 'after_coupon_price',
        width: 100,
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
        title: '推广情况',
        width: 150,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>发放份数 {item.total_amount}</span>
              <br />
              <span>下单人数 {item.order_num}</span>
              <br />
            </p>
          );
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
    this.qf = props.location.query.qf !== undefined;
  }

  state = {
    startTime: '',
    endTime: '',
    tabActiveKey: 'haoping',
  };

  componentDidMount() {
    const { location } = this.props;
    params.type = 10;
    // if (location.query.qf !== undefined) {
    //   params.type = '30,31';
    //   this.setState({
    //     tabActiveKey: 'quanfen',
    //   });
    // } else if (location.query.deq) {
    //   params.type = 20;
    //   this.setState({
    //     tabActiveKey: 'deq',
    //   });
    // }
    params.sh_id = location.query.sh_id;
    this.getListData(params);
  }

  // 接口
  getListData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/planList',
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
      params.mall_id = values.mall_id || 0;
      params.start_time = startTime || '';
      params.end_time = endTime || '';
      params.state = values.state || -1;
      this.getListData(params);
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
    params.task_id = 0;
    params.goods_id = 0;
    params.state = -1;
    params.mall_id = 0;
    params.start_time = '';
    params.end_time = '';
    this.getListData(params);
  };

  goDetail = item => {
    let path = `/zhaoshang-promotion/promotionDetail`;
    if (/^3[0|1]$/.test(item.type)) {
      path = `/zhaoshang-promotion/promotionDetail`;
    }
    if (item.type === 20) {
      path = `/zhaoshang-promotion/promotionDetail`;
    }
    window.open(`${path}?task_plan_id=${item.task_plan_id}`); // 0523 新窗口打开
  };

  onChange = page => {
    params.page = page;
    this.getListData(params);
  };

  handleTabChange = key => {
    this.setState({
      tabActiveKey: key,
    });
    this.deq = 0;
    this.qf = undefined;
    if (key === 'haoping') {
      params.type = 10;
    } else if (key === 'quanfen') {
      this.qf = 1;
      params.type = '30,31';
    } else if (key === 'deq') {
      this.deq = 1;
      params.type = 20;
    }
    params.page = 1;
    params.task_id = 0;
    params.goods_id = 0;
    params.state = -1;
    this.getListData(params);
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
      state: -1,
      type: e.target.value,
    };
    this.getListData(params);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { listData } = this.props;
    const stateSelect = listData.state_select;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="店铺编号">
              {getFieldDecorator('mall_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          {/** 筛选店铺/商品 字段都为 goods_id, 后端查询两者已兼容 */}
          <Col md={5} sm={24}>
            <FormItem label="商品编号">
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
        <Row colSpan="5">
          <FormItem label="排期时间">
            {getFieldDecorator('endTime')(
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
    // 表格数据
    const { listData } = this.props;
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
      {
        key: 'quanfen',
        tab: '收藏推广',
      },
    ];

    const extraContent = this.qf ? (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.radioGroupOnChange} defaultValue="30">
          <RadioButton value="30">商品收藏</RadioButton>
          <RadioButton value="31">店铺收藏</RadioButton>
        </RadioGroup>
      </div>
    ) : (
      ''
    );

    return (
      <PageHeaderWrapper
        title="推广排期列表"
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

export default Plan;
