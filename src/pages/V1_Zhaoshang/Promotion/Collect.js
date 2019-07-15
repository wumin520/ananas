import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Plan.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

let params = {
  page: 1, // 翻页参数
  task_id: 0, // 推广编号
  goods_id: 0, // 商品id
  state: -1,
  type: 30, // 推广类型 30-收藏商品 31-收藏店铺
};

@connect(({ promotion, loading }) => ({
  collectData: promotion.collectData,
  loading: loading.effects['promotion/collectData'],
}))
@Form.create()
class Collect extends PureComponent {
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
            </p>
          );
        },
      },
    ];
    this.dpColumns = [
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
    ];
  }

  componentDidMount() {
    params.type = 30;
    this.getListData(params);
  }

  // 接口
  getListData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/collectData',
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
        type: 'promotion/collectData',
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
      type: 'promotion/collectData',
      payload: params,
    });
  };

  onChange = page => {
    params.page = page;
    this.getListData(params);
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
    // let { columns } = this;

    this.getListData(params);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { collectData } = this.props;
    const stateSelect = collectData.state_select;
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
    const { collectData } = this.props;
    const { columns, dpColumns } = this;
    let tableColumns = columns;
    // console.log('params.type=====>>>>', params.type);
    if (params.type === 31) {
      tableColumns = dpColumns;
    }
    const content = <div />;

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.radioGroupOnChange} defaultValue="30">
          <RadioButton value="30">商品收藏</RadioButton>
          <RadioButton value="31">店铺收藏</RadioButton>
        </RadioGroup>
      </div>
    );

    return (
      <PageHeaderWrapper title="放单列表" content={content}>
        <div className={styles.standardList}>
          <Card className={styles.customStyleCard} extra={extraContent}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.id}
                columns={tableColumns}
                dataSource={collectData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: collectData.page_info.current_page,
                  pageSize: collectData.page_info.per_page,
                  total: collectData.page_info.total_num,
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

export default Collect;
