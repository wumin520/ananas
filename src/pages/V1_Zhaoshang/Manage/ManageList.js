import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Row, Col, Input, Button, Form, Select, Badge, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './ManageList.less';

const FormItem = Form.Item;
const { Option } = Select;

const params = {
  page: 1,
  state: -1,
  phone: '',
  shop_name: '', // 店铺名称
  shop_code: '', // 店铺编号
  start_time: '',
  end_time: '',
};

@connect(({ manage, loading }) => ({
  manageData: manage.manageData,
  loading: loading.effects['manage/manageData'],
}))
@Form.create()
class ManageList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '商户名称',
        width: 120,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>店铺名：{item.shop_name}</span>
              <br />
              <span>店铺编号：{item.shop_code}</span>
              <br />
              <span>注册时间：{item.created_at}</span>
            </p>
          );
        },
      },
      {
        title: '联系方式',
        width: 120,
        render: item => {
          return (
            <p style={{ textAlign: 'left' }}>
              <span>手机号：{item.phone}</span>
              <br />
              <span>qq号：{item.qq}</span>
            </p>
          );
        },
      },
      {
        title: '累计放款总额',
        width: 100,
        dataIndex: 'total_balance',
        key: 'total_balance',
        render: item => {
          return <span>￥{item}</span>;
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
        title: '账号状态',
        width: 100,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '操作',
        width: 120,
        render: item => {
          return <a onClick={this.goPlan.bind(this, item)}>推广记录</a>;
        },
      },
    ];
  }

  state = {
    startTime: '',
    endTime: '',
  };

  componentDidMount() {
    this.getListData(params);
  }

  goPlan = item => {
    const path = `/zhaoshang-promotion/plan`;
    window.open(`${path}?sh_id=${item.sh_id}`); // 0523 新窗口打开
  };

  // 接口
  getListData = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'manage/manageData',
      payload: p,
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
      params.phone = values.phone || '';
      params.shop_name = values.shop_name || '';
      params.shop_code = values.shop_code || '';
      params.state = values.state || -1;
      params.start_time = startTime || '';
      params.end_time = endTime || '';

      dispatch({
        type: 'manage/manageData',
        payload: params,
      });
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    params.page = 1;
    params.phone = '';
    params.shop_name = '';
    params.shop_code = '';
    params.state = -1;
    params.start_time = '';
    params.end_time = '';
    dispatch({
      type: 'manage/manageData',
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

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { manageData } = this.props;
    const stateSelect = manageData.state_select;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="店铺编号">
              {getFieldDecorator('shop_code')(<Input placeholder="请输入拼多多id" />)}
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
        <Row colSpan="5">
          <FormItem label="注册时间">
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
    const { manageData } = this.props;
    const { columns } = this;
    const content = <div />;
    const extraContent = '';

    /* eslint-disable */
    return (
      <PageHeaderWrapper title="商家列表" content={content}>
        <div className={styles.standardList}>
          <Card className={styles.customStyleCard} extra={extraContent}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.id}
                columns={columns}
                dataSource={manageData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: manageData.page_info.current_page,
                  pageSize: manageData.page_info.per_page,
                  total: manageData.page_info.total_num,
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

export default ManageList;
