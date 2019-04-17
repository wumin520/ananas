import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Tabs, Badge } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './styles.less';

const { TabPane } = Tabs;
const { Option } = Select;

let param = {
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
  };

  componentDidMount() {
    this.getAssetList(param);
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
    param = {
      page: 1,
      tradeType: -1,
      page_no: 1,
    };
    if (value === 'withdraw') {
      console.log(param.page_no);
      dispatch({
        type: 'capital/getExchangeList',
        payload: {
          page: param.page_no,
        },
      });
    } else if (value === 'trade') {
      this.getAssetList(param);
    }
  };

  // 交易类型切换
  selectTypeChange = value => {
    param = {
      page: 1,
      type: value,
    };
  };

  clearAll = () => {
    param = {
      page: 1,
      type: -1,
    };
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
    this.getAssetList(param);
  };

  toGo = url => {
    router.push(url);
  };

  render() {
    const stateMap = ['processing', 'success', 'error'];
    const state = ['审核中', '提现成功', '提现失败'];

    const statusMap = ['error', 'success'];
    const status = ['失败', '成功'];

    const { assetData, exchangeData } = this.props;

    // const toFreeze = () => {
    //   router.push('CapitalManage/FreezeDetail');
    // }

    const Info = ({ title, value, bordered, linkName, url }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>￥{value}</p>
        {bordered && <em />}
        <a href={url}>{linkName}</a>
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
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
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
        dataIndex: 'state',
        key: 'state',
        render(val) {
          return <Badge status={stateMap[val - 1]} text={state[val - 1]} />;
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
              <Col sm={8} xs={24}>
                <Info
                  title="可用余额"
                  value={assetData.asset_info.balance}
                  linkName="提现"
                  url="/CapitalManage/withdraw"
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info
                  title="冻结金额"
                  value={assetData.asset_info.balance}
                  linkName="冻结明细"
                  url="/CapitalManage/FreezeDetail"
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="累计支出" value={assetData.asset_info.expend_balance} />
              </Col>
            </Row>
          </Card>
          <br />
          <Card>
            <Tabs onTabClick={this.tabsClick}>
              <TabPane tab="交易明细" key="trade">
                <div>
                  交易类型：
                  <Select
                    style={{ width: 120 }}
                    defaultValue="全部"
                    onChange={this.selectTypeChange}
                  >
                    {assetData.type_select.length &&
                      assetData.type_select.map(e => (
                        <Option key={e.value} value={e.value}>
                          {e.name}
                        </Option>
                      ))}
                  </Select>
                  <Button style={{ marginLeft: 8 }} type="primary" onClick={this.setAgeSort}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.clearAll}>
                    重置
                  </Button>
                </div>
                <br />
                <Table
                  columns={columns}
                  dataSource={assetData.list}
                  pagination={assetData.page_info}
                  onChange={this.handleChange}
                />
              </TabPane>
              <TabPane tab="提现记录" key="withdraw">
                <Table
                  columns={columns2}
                  dataSource={exchangeData.list}
                  pagination={exchangeData.page_info}
                  onChange={this.handleChange}
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
