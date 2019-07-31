import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Modal, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

const { confirm } = Modal;

let params = {
  page: 1, // 翻页参数
  task_id: 0, // 推广编号
  goods_id: 0, // 商品id
  state: -1, // 状态-1 全部 0待支付，1待审核，2进行中，3审核驳回 4 清算中 5 已结算
  type: 10, // 推广类型 全部 10-免单全返 20-大额券推广 30-圈粉-收藏商品 31-圈粉-收藏店铺 注意：多个“,”隔开，eg:圈粉全部：30,31 默认：10
};

@connect(({ task, loading }) => ({
  listData: task.listData,
  loading: loading.effects['task/fetchBasic'],
}))
@Form.create()
class FdList extends PureComponent {
  state = {
    tabActiveKey: 'haoping',
  };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 90,
      },
      {
        key: 'goods_id',
        title: '商品id',
        width: 120,
        dataIndex: 'goods_id',
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
        title: '提交时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 160,
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
        key: 'coupon_price',
        width: 80,
        title: '优惠券',
        dataIndex: 'coupon_price',
        render: val => {
          return <span>{val ? `￥ ${val}` : '无'}</span>;
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
        title: '推广份数',
        width: 150,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>发放份数 {item.total_amount}</span>
              <br />
              <span>下单人数 {item.order_num}</span>
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
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goPay.bind(this, item)}>支付 </a>
              </span>
            );
          }
          if (item.state === 1 || item.state === 6) {
            operation = <a onClick={this.goDetail.bind(this, item)}>查看 </a>;
          }
          if (item.state === 2) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goOrder.bind(this, item)}>订单明细 </a>
                <br />
                <a onClick={this.taskFinish.bind(this, item)}>终止 </a>
              </span>
            );
          }
          if (item.state === 3) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goRedact.bind(this, item)}>编辑 </a>
              </span>
            );
          }
          if (item.state === 4 || item.state === 5) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goOrder.bind(this, item)}>订单明细 </a>
              </span>
            );
          }
          return <span>{operation}</span>;
        },
      },
    ];
    this.qf = props.location.query.qf !== undefined;
  }

  componentDidMount() {
    const { location } = this.props;
    params.type = 10;
    if (location.query.qf !== undefined) {
      params.type = '30,31';
      this.setState({
        tabActiveKey: 'quanfen',
      });
    } else if (location.query.deq) {
      params.type = 20;
      this.setState({
        tabActiveKey: 'deq',
      });
    }
    this.getListData(params);
  }

  // 接口
  getListData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchBasic',
      payload: params,
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
      params.state = values.state || -1;

      dispatch({
        type: 'task/fetchBasic',
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
    dispatch({
      type: 'task/fetchBasic',
      payload: params,
    });
  };

  taskFinish = item => {
    const { dispatch } = this.props;
    const thises = this;
    confirm({
      title: '确认要终止吗？',
      content: '推广终止后不能恢复，商品将立即下线，确认要终止吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'task/finishMessage',
          payload: {
            page: 1,
            task_id: item.task_id,
          },
        }).then(() => {
          thises.getListData();
        });
      },
    });
  };

  goDetail = item => {
    let path = `/fangdan/list/generalizeDetail`;
    if (/^3[0|1]$/.test(item.type)) {
      path = `/fangdan/qfDetail`;
    }
    if (item.type === 20) {
      path = `/fangdan/deqDetail`;
    }
    // router.push(`${path}?task_id=${item.task_id}`);
    window.open(`${path}?task_id=${item.task_id}`); // 0523 新窗口打开
  };

  goPay = item => {
    let path = `/fangdan/step-form/pay?task_id=${item.task_id}&goods_id=${
      item.goods_id
    }&need_fetch=1`;
    path = this.addQFQuery(item, path);
    router.push(path);
  };

  // 订单明细
  goOrder = item => {
    // console.log('this:', item.task_id);
    let path = `/order/Index`;
    if (/^3[0|1]$/.test(item.type)) {
      path = `/order/qf`;
    }
    if (item.type === 20) {
      router.push(`${path}?deq=1&task_id=${item.task_id}`);
      return;
    }
    router.push(`${path}?task_id=${item.task_id}`);
  };

  addQFQuery = (item, path) => {
    // console.log('item -> ', item);
    let url = path;
    if (/^3[0|1]$/.test(item.type)) {
      const qf = item.type === 30 ? 0 : 1;
      url += `&qf=${qf}`;
    } else if (item.type === 20) {
      url += `&deq=1`;
    }
    return url;
  };

  // 编辑
  goRedact = item => {
    let path = item.type === 10 ? `/fangdan/step-form/confirm` : `/fangdan/qf/confirm`;
    path += `?task_id=${item.task_id}&goods_id=${item.goods_id}&action=edit`;
    path = this.addQFQuery(item, path);
    router.push(path);
  };

  onChange = page => {
    params.page = page;
    this.getListData(params);
  };

  handleTabChange = (key, val) => {
    console.log('handleTabChange', key, val);
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
    // console.log('radioGroupOnChange -> ', e);
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
    // const typeSelect = listData.type_select;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          {/** 筛选店铺/商品 字段都为 goods_id, 后端查询两者已兼容 */}
          <Col md={5} sm={24}>
            {params.type === 10 ? (
              <FormItem label="商品id ">
                {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
              </FormItem>
            ) : (
              <FormItem label={this.deq ? '商品id ' : '商品/店铺id '}>
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
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    // 表格数据
    const { listData, match } = this.props;
    const { tabActiveKey } = this.state;
    const taskInfo = listData.task_info;

    let { columns } = this;
    const qFColumns = [
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 90,
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
        title: '提交时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 160,
      },
      {
        title: '收藏类型',
        key: 'type',
        width: 100,
        render: item => {
          return <span>{item.type === 30 ? '商品收藏' : '店铺收藏'}</span>;
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
        title: '推广份数',
        width: 150,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>发放份数 {item.total_amount}</span>
              <br />
              <span>收藏人数 {item.order_num}</span>
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
          // 0-待支付，1-待审核，2-进行中，3-审核驳回 4-清算中 5-已结算
          if (item.state === 0) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goPay.bind(this, item)}>支付 </a>
              </span>
            );
          }
          if (item.state === 1) {
            operation = <a onClick={this.goDetail.bind(this, item)}>查看 </a>;
          }
          if (item.state === 2) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goOrder.bind(this, item)}>推广效果</a>
                <br />
                <a onClick={this.taskFinish.bind(this, item)}>终止 </a>
              </span>
            );
          }
          if (item.state === 3) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goRedact.bind(this, item)}>编辑 </a>
              </span>
            );
          }
          if (item.state === 4 || item.state === 5) {
            operation = (
              <span>
                <a onClick={this.goDetail.bind(this, item)}>查看 </a>
                <a onClick={this.goOrder.bind(this, item)}>推广效果 </a>
              </span>
            );
          }
          return <span>{operation}</span>;
        },
      },
    ];
    if (this.qf) {
      columns = qFColumns;
    }
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
    console.log(match, '1');
    const extraContent = this.qf ? (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.radioGroupOnChange} defaultValue="30,31">
          <RadioButton value="30,31">全部收藏</RadioButton>
          <RadioButton value="30">商品收藏</RadioButton>
          <RadioButton value="31">店铺收藏</RadioButton>
        </RadioGroup>
      </div>
    ) : (
      ''
    );
    return (
      <PageHeaderWrapper
        title="放单列表"
        content={content}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
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

export default FdList;
