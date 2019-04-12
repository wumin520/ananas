import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Tabs, Badge } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './styles.less';

const { TabPane } = Tabs;
const { Option } = Select;

function handleChange(value) {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
}

function selectChange(value) {
  console.log(value);
}
// const data = [
//   {
//     created_at: '2016-09-21  08:50:08',
//     type_desc: '充值',
//     money: '-￥20',
//     desc: '提现至尾号1234的中国农业银行卡',
//   },
// ];

const data2 = [
  {
    key: '001',
    time: '2016-09-21  08:50:08',
    type: '提现',
    money: '-￥20',
    status: 1,
    explain: '提现至尾号1234的中国农业银行卡',
  },
];

const content = <div />;

@connect(({ capital, loading }) => ({
  assetData: capital.data,
  loading: loading.models.capital,
}))
@Form.create()
class CapitalDetail extends PureComponent {
  state = {
    pagination: {},
    filteredInfo: null,
    sortedInfo: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/getAssetList',
      payload: {
        page: 1,
        type: -1,
      },
    });
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
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

  render() {
    const statusMap = ['default', 'processing', 'success', 'error'];
    const status = ['关闭', '运行中', '成功', '异常'];

    // const { assetData } = this.props;
    const assetData = {
      list: [
        {
          created_at: '2019-03-03 00:00:00',
          type_desc: '充值',
          money: '+ 20 ',
          desc: '描述信息',
        },
        {
          created_at: '2019-03-03 00:00:00',
          type_desc: '充值',
          money: '+ 20 ',
          desc: '描述信息',
        },
      ],
      asset_info: {
        balance: '200',
        forzen_balance: '200',
        expend_balance: '300',
      },
      type_select: [
        {
          name: '全部',
          value: '-1',
        },
        {
          name: '充值',
          value: '1',
        },
        {
          name: '冻结',
          value: '2',
        },
      ],
      page_info: {
        total_num: 100,
        total_page: 5,
      },
    };
    console.log(this.props);
    console.log(assetData);

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

    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '交易类型',
        dataIndex: 'type_desc',
        key: 'type_desc',
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
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '交易金额',
        dataIndex: 'money',
        key: 'money',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      },
      {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain',
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
            <Tabs>
              <TabPane tab="交易明细" key="1">
                <div>
                  交易类型：
                  <Select style={{ width: 120 }} defaultValue="全部" onChange={selectChange}>
                    {assetData.type_select.length &&
                      assetData.type_select.map(e => (
                        <Option key={e.value} value={e.value}>
                          {e.name}
                        </Option>
                      ))}
                  </Select>
                  <Select
                    labelInValue
                    defaultValue={{ key: 'lucy' }}
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    <Option value="jack">Jack (100)</Option>
                    <Option value="lucy">Lucy (101)</Option>
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
              <TabPane tab="提现记录" key="2">
                <div>
                  交易类型：
                  <Select defaultValue="withdraw" style={{ width: 120 }} onChange={handleChange}>
                    <Option key="withdraw" value="withdraw">
                      提现
                    </Option>
                  </Select>
                </div>
                <br />
                <Table
                  columns={columns2}
                  dataSource={data2}
                  pagination={assetData.page_info}
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
