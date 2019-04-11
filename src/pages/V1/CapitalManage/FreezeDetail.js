import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';

import styles from './FreezeDetail.less';

const { Option } = Select;

function handleChange() {}

const data = [
  {
    no: '001',
    time: '2016-09-21  08:50:08',
    type: '提现',
    money: '-￥20',
    product: {
      imgUrl:
        'http://c.hiphotos.baidu.com/image/pic/item/f2deb48f8c5494ee72f03e6d23f5e0fe98257ef7.jpg',
      proName: '商品名称',
    },
  },
];

const content = <div />;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class FreezeDetail extends PureComponent {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
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

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
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

  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: '推广编号',
        dataIndex: 'no',
        key: 'no',
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: '冻结时间',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      },
      {
        title: '商品',
        dataIndex: 'product',
        key: 'product',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        render(item) {
          return (
            <div className={styles.FreezePro}>
              <img className={styles.proImg} src={item.imgUrl} alt="" />
              <span>{item.proName}</span>
            </div>
          );
        },
      },
      {
        title: '放单类型',
        dataIndex: 'type',
        key: 'type',
        filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      },
      {
        title: '冻结金额',
        dataIndex: 'money',
        key: 'money',
      },
    ];

    return (
      <PageHeaderWrapper title="冻结明细" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="担保中的任务" value="5个" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="冻结金额" value="￥20000.00" bordered />
              </Col>
            </Row>
          </Card>
          <br />
          <Card style={{ width: '100%' }}>
            <div>
              放单类型：
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
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FreezeDetail;
