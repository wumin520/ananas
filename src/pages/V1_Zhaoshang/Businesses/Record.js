import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Row, Col, Input, Button, Form, Select, DatePicker } from 'antd';
// import Link from 'umi/link';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

let params = {
  page: 1, // 翻页参数
  member_level: 0,
};

@connect(({ businesses, loading }) => ({
  recordData: businesses.recordData,
  loading: loading.effects['businesses/recordData'],
}))
@Form.create()
class Record extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '商户名称',
        key: 'shop_name',
        width: 143,
        render: item => {
          return (
            <div>
              <a>{item.shop_name}</a>
              <div>店铺编号：{item.shop_code}</div>
            </div>
          );
        },
      },
      {
        title: '购买会员等级',
        key: 'member_name',
        dataIndex: 'member_name',
        width: 100,
      },
      {
        key: 'member_amount',
        width: 80,
        title: '购买金额',
        dataIndex: 'member_amount',
        render: val => {
          return <span>{`￥ ${val}`}</span>;
        },
      },
      {
        title: '结算金额',
        key: 'settle_amount',
        width: 150,
        dataIndex: 'settle_amount',
        render: val => {
          return <span>{`￥ ${val}`}</span>;
        },
      },
      {
        title: '购买时间',
        key: 'buy_time',
        dataIndex: 'buy_time',
        width: 150,
      },
    ];
  }

  componentDidMount() {
    // params.type = 10;
    this.getListData(params);
  }

  componentWillUnmount() {
    params = {
      member_level: 0,
      page: 1,
    };
  }

  // 接口
  getListData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'businesses/recordData',
      payload: params,
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      const times = fieldsValue.end_time;
      if (times instanceof Array) {
        params.start_time = times[0].format('YYYY-MM-DD HH:MM:SS');
        params.end_time = times[1].format('YYYY-MM-DD HH:MM:SS');
      }

      params.page = 1;
      const def = keys => {
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          if (values[key]) {
            params[key] = values[key];
          }
        }
      };
      def(['shop_code', 'shop_name']);
      params.member_level = values.member_level || '';
      this.getListData(params);
    });
  };

  // 重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    params = {};
    params.page = 1;
    params.member_level = '';
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
    const { recordData, location } = this.props;
    const stateSelect = recordData.member_level;
    const shopCode = location.query.shop_code;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 12, xl: 24 }}>
          <Col md={5} sm={24}>
            <FormItem label="店铺编号">
              {getFieldDecorator('shop_code', { initialValue: shopCode })(
                <Input placeholder="请输入拼多多id" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商户名称">
              {getFieldDecorator('shop_name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="会员等级">
              {getFieldDecorator('member_level')(
                <Select placeholder="请选择" onChange={this.selectTypeChange}>
                  {stateSelect.length > 0 &&
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
            <FormItem label="购买时间">{getFieldDecorator('end_time')(<RangePicker />)}</FormItem>
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
    const { recordData } = this.props;
    const content = <div />;
    const title = <div style={{ marginTop: 12 }}>会员购买记录</div>;
    return (
      <PageHeaderWrapper title={title} content={content}>
        <div className={styles.standardList}>
          <Card className={styles.customStyleCard}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.sh_id}
                columns={this.columns}
                dataSource={recordData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: parseInt(recordData.page_info.current_page, 10),
                  pageSize: recordData.page_info.per_page,
                  total: recordData.page_info.total_num,
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

export default Record;
