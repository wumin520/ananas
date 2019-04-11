import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Tabs, Badge } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CapitalDetail.less';

const { TabPane } = Tabs;
const { Option } = Select;

function handleChange() {}

const data = [
  {
    key: '001',
    time: '2016-09-21  08:50:08',
    type: '提现',
    money: '-￥20',
    status: 1,
    endTime: '2016-09-21  08:50:08',
    explain: '提现至尾号1234的中国农业银行卡',
  },
];

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

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
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
      type: 'list/fetch',
      payload: {
        count: 5,
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

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
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

    // const toFreeze = () => {
    //   router.push('CapitalManage/FreezeDetail');
    // }

    const Info = ({ title, value, bordered, linkName, url }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
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
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      },
      {
        title: '交易金额',
        dataIndex: 'money',
        key: 'money',
        filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
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
        title: '到账时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain',
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
                  value="￥20000.00"
                  linkName="提现"
                  url="/CapitalManage/CapitalDetail"
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info
                  title="冻结金额"
                  value="￥20000.00"
                  linkName="冻结明细"
                  url="/CapitalManage/FreezeDetail"
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="累计支出" value="￥30000.00" />
              </Col>
            </Row>
          </Card>
          <br />

          <Card>
            <Tabs>
              <TabPane tab="交易明细" key="1">
                <div>
                  交易类型：
                  <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Button style={{ marginLeft: 8 }} type="primary" onClick={this.setAgeSort}>
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.clearAll}>
                    重置
                  </Button>
                </div>
                <br />
                <Table columns={columns} dataSource={data} onChange={this.handleChange} />
              </TabPane>
              <TabPane tab="提现记录" key="2">
                <div>
                  交易类型：
                  <Select defaultValue="withdraw" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="withdraw">提现</Option>
                  </Select>
                </div>
                <br />
                <Table columns={columns2} dataSource={data2} onChange={this.handleChange} />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CapitalDetail;
