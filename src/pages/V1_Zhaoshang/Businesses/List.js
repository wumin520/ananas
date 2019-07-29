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
  DatePicker,
  Icon,
  Popover,
} from 'antd';
import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

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
        title: '累计充值',
        dataIndex: 'total_balance',
        render: val => {
          return <span>{val ? `￥ ${val}` : ''}</span>;
        },
      },
      {
        title: '资产余额',
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
        title: '会员等级',
        width: 150,
        render: item => {
          console.log('item.member_list===', item.member_list);
          const memberPop = (
            <div>
              {item.member_list.map(val => {
                // console.log('item.member_list===', item.member_list, val);
                return (
                  <p>
                    {val.name}:{val.level > 10 ? `${val.end_time}到期` : val.end_time}
                  </p>
                );
              })}
            </div>
          );

          return (
            <div style={{ textAlign: 'left' }}>
              <span>{item.member_name}</span>
              <br />
              <p>{item.member_end_time ? `${item.member_end_time}到期` : '永久'}</p>
              {item.member_list.length > 1 ? (
                <Popover placement="right" content={memberPop}>
                  <Button type="small" style={{ lineHeight: 2, height: 22 }}>
                    <Icon type="small-dash" />
                  </Button>
                </Popover>
              ) : (
                ''
              )}
            </div>
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
            <div>
              <Link to={`/work/promotion/plan?shop_code=${item.shop_code}&sh_id=${item.sh_id}`}>
                推广记录
              </Link>
              <br />
              <Link to={`/work/businesses/record?shop_code=${item.shop_code}&sh_id=${item.sh_id}`}>
                会员购买记录
              </Link>
            </div>
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
    const { form } = this.props;
    form.resetFields();
    params = {};
    params.page = 1;
    params.state = '';
    this.getListData(params);
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
                rowKey={item => item.qq}
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
