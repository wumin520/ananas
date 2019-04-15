import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Badge } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';

import styles from './styles.less';

const { Option } = Select;

let param = {
  page: 1,
  type: 1,
};

const content = <div />;

@connect(({ capital, loading }) => ({
  freezeData: capital.freezeData,
  loading: loading.models.list,
}))
@Form.create()
class FreezeDetail extends PureComponent {
  state = {};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/frozenTaskList',
      payload: param,
    });
  }

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  clearAll = () => {
    param = {
      page: 1,
      type: -1,
    };
  };

  setAgeSort = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/frozenTaskList',
      payload: param,
    });
  };

  // 交易类型切换
  selectTypeChange = value => {
    param = {
      page: 1,
      type: value,
    };
  };

  render() {
    const { freezeData } = this.props;

    const statusMap = ['', 'processing', 'success', 'default'];
    const status = ['', '审核中', '进行中', '清算中'];

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const columns = [
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
      },
      {
        title: '冻结时间',
        dataIndex: 'frozen_at',
        key: 'frozen_at',
      },
      {
        title: '商品',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '放单类型',
        dataIndex: 'state',
        key: 'state',
        filters: [
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
      },
      {
        title: '冻结金额',
        dataIndex: 'forzen_money',
        key: 'forzen_money',
      },
    ];

    return (
      <PageHeaderWrapper title="冻结明细" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="担保中的任务" value={freezeData.head_info.forzen_balance} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="冻结金额" value={freezeData.head_info.forzen_num} bordered />
              </Col>
            </Row>
          </Card>
          <br />
          <Card style={{ width: '100%' }}>
            <div>
              放单类型：
              <Select style={{ width: 120 }} defaultValue="全部" onChange={this.selectTypeChange}>
                {freezeData.type_select.length &&
                  freezeData.type_select.map(e => (
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
            <Table columns={columns} dataSource={freezeData.list} onChange={this.handleChange} />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FreezeDetail;
