import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const FormItem = Form.Item;
const statusMap = ['processing', 'success', 'default', 'error'];
const status = ['排期中', '进行中', '已结束', '已暂停'];
const { Option } = Select;
const { confirm } = Modal;

let param = {
  page: 1,
  task_id: 0,
  goods_id: 0,
  state: -1,
  type: -1,
};

@connect(({ task, loading }) => ({
  planData: task.planData,
  loading: loading.effects['task/planList'],
}))
@Form.create()
class PlanList extends PureComponent {
  state = {};

  componentDidMount() {
    this.getListData(param);
  }

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
          thises.getListData(param);
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
          thises.getListData(param);
        });
      },
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
      param = {
        page: 1,
        task_id: values.task_id || 0,
        goods_id: values.goods_id || 0,
        state: values.state || -1,
        type: values.type || -1,
      };
      dispatch({
        type: 'task/planList',
        payload: param,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'task/planList',
      payload: {
        page: 1,
        task_id: 0,
        goods_id: 0,
        state: -1,
        type: -1,
      },
    });
  };

  onChange = currPage => {
    param = {
      page: currPage,
    };
    this.getListData(param);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { planData } = this.props;
    const stateSelect = planData.state_select;
    const typeSelect = planData.type_select;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品id">
              {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
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
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 91,
      },
      {
        title: '商品',
        render: val => {
          return (
            <span className={styles.pro}>
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.title}</span>
            </span>
          );
        },
      },
      {
        title: '提交时间',
        dataIndex: 'plan_time',
        key: 'plan_time',
        width: 222,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: item => {
          return <span>￥{item}</span>;
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 110,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '推广份数',
        width: 200,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>发放份数 {item.total_amount}</span>
              <br />
              <span>评价人数 {item.comment_num}</span>
              <br />
              <span>下单人数 {item.order_num}</span>
              <br />
              <span>售后人数 {item.sale_back_num}</span>
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
    return (
      <PageHeaderWrapper title="排期列表" content={content}>
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
          <Card>
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
