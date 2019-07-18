import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, Modal, DatePicker } from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const { confirm } = Modal;

let params = {
  page: 1, // 翻页参数
  state: '',
};

@connect(({ businesses, loading }) => ({
  listData: businesses.listData,
  loading: loading.effects['businesses/fetchBasic'],
}))
@Form.create()
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '商户名称',
        width: 143,
        key: 'shop_name',
        render: item => {
          return (
            <div>
              <a>{item.shop_name}</a>
              <div>店铺编号：{item.shop_code}</div>
              <div>注册时间：{item.created_at}</div>
            </div>
          );
        },
      },
      {
        title: '联系方式',
        key: 'contact',
        width: 100,
        render: item => {
          return (
            <div>
              <div>手机号：{item.phone}</div>
              <div>qq号：{item.qq}</div>
            </div>
          );
        },
      },
      {
        key: 'total_balance',
        width: 80,
        title: '累计放款总额',
        dataIndex: 'total_balance',
        render: val => {
          return <span>{val ? `￥ ${val}` : '无'}</span>;
        },
      },
      {
        title: '资产余额',
        key: 'balance',
        width: 150,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>账户余额：{item.balance}</span>
              <br />
              <span>冻结中：{item.frozen_balance}</span>
              <br />
              <span>累计推广支出：{item.outcome}</span>
            </p>
          );
        },
      },
      {
        title: '账号状态',
        key: 'state',
        width: 100,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '操作',
        width: 120,
        render: item => {
          return (
            <Link to={`/work/promotion/plan?shop_code=${item.shop_code}&sh_id=${item.sh_id}`}>
              推广记录
            </Link>
          );
        },
      },
    ];
  }

  componentDidMount() {
    // params.type = 10;
    this.getListData(params);
  }

  componentWillUnmount() {
    params = {
      state: '',
      page: 1,
    };
  }

  // 接口
  getListData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'businesses/fetchBasic',
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
      const times = fieldsValue.created_at;
      if (times instanceof Array) {
        params.start_time = times[0].format('YYYY-MM-DD HH:MM:SS');
        params.end_time = times[1].format('YYYY-MM-DD HH:MM:SS');
      }
      console.log(err, fieldsValue, 'err', params);

      params.page = 1;
      const def = keys => {
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          if (values[key]) {
            params[key] = values[key];
          }
        }
      };
      def(['shop_code', 'shop_name', 'phone']);
      params.state = values.state || '';

      dispatch({
        type: 'businesses/fetchBasic',
        payload: params,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    params = {};
    params.page = 1;
    params.state = '';

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

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { listData } = this.props;
    const stateSelect = listData.state_select;
    // const typeSelect = listData.type_select;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 12, xl: 24 }}>
          <Col md={5} sm={24}>
            <FormItem label="店铺编号">
              {getFieldDecorator('shop_code')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商户手机">
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商户名称">
              {getFieldDecorator('shop_name')(<Input placeholder="请输入" />)}
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
        <Row>
          <Col md={8} sm={24}>
            <FormItem label="注册时间">{getFieldDecorator('created_at')(<RangePicker />)}</FormItem>
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
    const { listData } = this.props;
    const content = <div />;
    const title = <div style={{ marginTop: 12 }}>商家列表</div>;
    return (
      <PageHeaderWrapper title={title} content={content}>
        <div className={styles.standardList}>
          <Card className={styles.customStyleCard}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.sh_id}
                columns={this.columns}
                dataSource={listData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: parseInt(listData.page_info.current_page, 10),
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

export default List;
