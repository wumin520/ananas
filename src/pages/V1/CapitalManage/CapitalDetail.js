import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Row, Col, Button, Form, Select, Table, Tabs, Badge } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

import styles from './styles.less';

const { TabPane } = Tabs;
const { Option } = Select;
const FormItem = Form.Item;

let params = {
  page: 1,
  type: -1,
};

const content = <div />;

@connect(({ capital, loading }) => ({
  assetData: capital.assetData,
  exchangeData: capital.exchangeData,
  loading: loading.models.capital,
}))
@Form.create()
class CapitalDetail extends PureComponent {
  state = {
    pagination: {},
    changeType: -1,
  };

  componentDidMount() {
    this.getAssetList(params);
  }

  getAssetList = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/getAssetList',
      payload: {
        page: p.page,
        type: p.type,
      },
    });
  };

  // 交易记录&提现记录切换
  tabsClick = value => {
    const { dispatch } = this.props;
    params = {
      page: 1,
      tradeType: -1,
      page_no: 1,
    };
    if (value === 'withdraw') {
      dispatch({
        type: 'capital/getExchangeList',
        payload: {
          page: params.page_no,
        },
      });
    } else if (value === 'trade') {
      this.getAssetList(params);
    }
  };

  // 交易类型切换
  selectTypeChange = value => {
    params = {
      page: 1,
      type: value,
    };
    this.state.changeType = value;
  };

  clearAll = () => {
    params = {
      page: 1,
      type: -1,
    };
    const { form } = this.props;
    form.resetFields();
    this.getAssetList(params);
  };

  handleTableChange = (pagination, filters, sorter) => {
    // eslint-disable-next-line
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  setAgeSort = () => {
    this.getAssetList(params);
  };

  toGo = url => {
    router.push(url);
  };

  changePage = p => {
    const { changeType } = this.state;
    params = {
      page: p,
      type: changeType,
    };
    this.getAssetList(params);
  };

  render() {
    const {
      assetData,
      exchangeData,
      form: { getFieldDecorator },
    } = this.props;

    // const toFreeze = () => {
    //   router.push('CapitalManage/FreezeDetail');
    // }

    const Info = ({ title, value, bordered, linkName, url }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>￥{value}</p>
        {bordered && <em />}
        <Link to={url}>{linkName}</Link>
      </div>
    );

    const columns = [
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
      },
      {
        title: '状态',
        key: 'state',
        width: 100,
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '交易金额',
        dataIndex: 'money',
        key: 'money',
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
      },
    ];

    const columns2 = [
      {
        title: '时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      // {
      //   title: '交易类型',
      //   dataIndex: 'type_desc',
      //   key: 'type_desc',
      // },
      {
        title: '交易金额',
        dataIndex: 'money',
        key: 'money',
      },
      {
        title: '状态',
        key: 'state',
        render(item) {
          return <Badge status={item.state_color} text={item.state_desc} />;
        },
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
      },
    ];

    return (
      <PageHeaderWrapper title="资金明细" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={12} xs={24}>
                <Info
                  title="可用余额"
                  value={assetData.asset_info.balance}
                  linkName="提现"
                  url="/CapitalManage/withdraw"
                  bordered
                />
              </Col>
              <Col sm={12} xs={24}>
                <Info
                  title="冻结金额"
                  value={assetData.asset_info.frozen_balance}
                  linkName="冻结明细"
                  url="/CapitalManage/FreezeDetail"
                />
              </Col>
              {/* <Col sm={8} xs={24}>
                <Info title="累计支出" value={assetData.asset_info.expend_balance} />
              </Col> */}
            </Row>
          </Card>
          <br />
          <Card>
            <Tabs onTabClick={this.tabsClick}>
              <TabPane tab="交易明细" key="trade">
                <Form layout="inline">
                  <FormItem label="交易类型">
                    {getFieldDecorator('type', {})(
                      <Select
                        placeholder="全部"
                        style={{ width: 120 }}
                        onChange={this.selectTypeChange}
                      >
                        {assetData.type_select.length &&
                          assetData.type_select.map(e => (
                            <Option key={e.value} value={e.value}>
                              {e.name}
                            </Option>
                          ))}
                      </Select>
                    )}
                  </FormItem>
                  <Button
                    style={{ marginLeft: 8, marginTop: 4 }}
                    type="primary"
                    onClick={this.setAgeSort}
                  >
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8, marginTop: 4 }} onClick={this.clearAll}>
                    重置
                  </Button>
                </Form>
                <br />
                <Table
                  columns={columns}
                  dataSource={assetData.list}
                  pagination={{
                    defaultCurrent: 1,
                    current: assetData.page_info.current_page,
                    pageSize: assetData.page_info.per_page,
                    total: assetData.page_info.total_num,
                    onChange: this.changePage,
                  }}
                />
              </TabPane>
              <TabPane tab="提现记录" key="withdraw">
                <Table
                  columns={columns2}
                  dataSource={exchangeData.list}
                  pagination={{
                    defaultCurrent: 1,
                    current: exchangeData.page_info.current_page,
                    pageSize: exchangeData.page_info.per_page,
                    total: exchangeData.page_info.total_num,
                    onChange: this.changePage,
                  }}
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CapitalDetail;
