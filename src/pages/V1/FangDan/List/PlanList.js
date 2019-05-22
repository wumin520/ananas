import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  Badge,
  Modal,
  DatePicker,
  Radio,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './Index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const statusMap = ['processing', 'success', 'default', 'error'];
const { Option } = Select;
const { confirm } = Modal;

let params = {
  page: 1,
  task_id: 0,
  goods_id: 0,
  state: -1,
  type: 10,
  start_time: '',
  end_time: '',
};

@connect(({ task, loading }) => ({
  planData: task.planData,
  loading: loading.effects['task/planList'],
}))
@Form.create()
class PlanList extends PureComponent {
  constructor(props) {
    super(props);
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
    if (location.query.qf !== undefined) {
      params.type = '30,31';
      this.setState({
        tabActiveKey: 'quanfen',
      });
    }
    this.getListData(params);
  }

  handleTabChange = (key, val) => {
    // 清空input框中上次输入的值
    const { form } = this.props;
    form.resetFields();
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
    }
    params.page = 1;
    params.task_id = 0;
    params.goods_id = 0;
    params.state = -1;
    params.start_time = '';
    params.end_time = '';
    this.getListData(params);
  };

  // 接口
  getListData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/planList',
      payload: p,
    });
  };

  // 下架
  planDown = item => {
    const { dispatch } = this.props;
    const thises = this;
    confirm({
      title: '确认要下架吗？',
      content: '下架后排期将暂停，暂停当天商品不会展示，确认要下架吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'task/planDownData',
          payload: {
            task_plan_id: item.task_plan_id,
          },
        }).then(() => {
          thises.getListData(params);
        });
      },
    });
  };

  // 上架
  planUp = item => {
    const { dispatch } = this.props;
    const thises = this;
    confirm({
      title: '确认要上架吗？',
      content: '请确保您的佣金/价格或商品状态符合《商品上架规则》',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'task/planUpData',
          payload: {
            task_plan_id: item.task_plan_id,
          },
        }).then(() => {
          thises.getListData(params);
        });
      },
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { startTime, endTime } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      params.page = 1;
      params.task_id = values.task_id || 0;
      params.goods_id = values.goods_id || 0;
      params.state = values.state || -1;
      params.start_time = startTime || '';
      params.end_time = endTime || '';

      dispatch({
        type: 'task/planList',
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
    params.state = -1;
    params.start_time = '';
    params.end_time = '';

    dispatch({
      type: 'task/planList',
      payload: params,
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

  onChange = currPage => {
    params.page = currPage;
    this.getListData(params);
  };

  radioGroupOnChange = e => {
    console.log('radioGroupOnChange -> ', e);
    params = {
      page: 1,
      task_id: 0,
      goods_id: 0,
      state: -1,
      start_time: '',
      end_time: '',
      type: e.target.value,
    };
    this.getListData(params);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { planData } = this.props;
    const stateSelect = planData.state_select;
    // const typeSelect = planData.type_select;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            {/** 筛选店铺/商品 字段都为 goods_id, 后端查询两者已兼容 */}
            {params.type === 10 ? (
              <FormItem label="商品id ">
                {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
              </FormItem>
            ) : (
              <FormItem label="商品/店铺id ">
                {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
              </FormItem>
            )}
          </Col>
          {/** <Col md={5} sm={24}>
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
          </Col> */}
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
          <FormItem label="推广日期">
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
    const { planData } = this.props;
    const headerInfo = planData.header_info;
    const columns = [
      {
        title: '排期时间',
        dataIndex: 'plan_time',
        key: 'plan_time',
        width: 120,
      },
      {
        key: 'goods_id',
        title: '商品/店铺id',
        width: 120,
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
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 90,
      },
      {
        title: '券后价',
        width: 100,
        dataIndex: 'after_coupon_price',
        key: 'after_coupon_price',
        render: item => {
          return <span>￥{item}</span>;
        },
      },
      {
        key: 'coupon_price',
        title: '优惠券',
        width: 100,
        dataIndex: 'coupon_price',
        render: val => {
          return <span>{val ? `￥ ${val}` : '无'}</span>;
        },
      },
      {
        title: '状态',
        width: 100,
        render(val) {
          return <Badge status={statusMap[val.state]} text={val.state_desc} />;
        },
      },
      {
        title: '推广份数',
        width: 150,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>发放份数 {item.total_amount}</span>
              <br />
              <span>
                {/^3[0|1]$/.test(item.type) ? '收藏' : '下单'}人数 {item.order_num}
              </span>
              <br />
              {/** <span>评价人数 {item.comment_num}</span> */}
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
                <a onClick={this.planDown.bind(this, item)}>下架</a>
              </span>
            );
          }
          if (item.state === 3) {
            operation = (
              <span>
                <a onClick={this.planUp.bind(this, item)}>上架</a>
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
    const tabList = [
      {
        key: 'haoping',
        tab: '免单试用',
      },
      {
        key: 'quanfen',
        tab: '圈粉收藏',
      },
    ];
    const extraContent = this.qf ? (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.radioGroupOnChange} defaultValue="30,31">
          <RadioButton value="30,31">全部圈粉</RadioButton>
          <RadioButton value="30">商品圈粉</RadioButton>
          <RadioButton value="31">店铺圈粉</RadioButton>
        </RadioGroup>
      </div>
    ) : (
      ''
    );
    /* eslint-disable */
    return (
      <PageHeaderWrapper
        title="排期列表"
        content={content}
        tabList={tabList}
        tabActiveKey={this.state.tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="今日" value={headerInfo.day_num} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周" value={headerInfo.week_num} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本月" value={headerInfo.month_num} />
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
                dataSource={planData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: planData.page_info.current_page,
                  pageSize: planData.page_info.per_page,
                  total: planData.page_info.total_num,
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

export default PlanList;
