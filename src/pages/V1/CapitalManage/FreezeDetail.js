import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Form, Select, Table, Badge } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Result from '@/components/Result';

import styles from './styles.less';

const { Option } = Select;
const FormItem = Form.Item;

let param = {
  page: 1,
  type: -1,
};

const content = <div />;

@connect(({ capital, loading }) => ({
  freezeData: capital.freezeData,
  loading: loading.models.list,
}))
@Form.create()
class FreezeDetail extends PureComponent {
  state = {
    filteredInfo: null,
    changeType: -1,
  };

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

  getFreezeList = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/frozenTaskList',
      payload: p,
    });
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
    });
  };

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  clearAll = () => {
    param = {
      page: 1,
      type: -1,
    };
    this.state.filteredInfo = null;
    const { form } = this.props;
    form.resetFields();
    this.getFreezeList(param);
  };

  setAgeSort = () => {
    this.getFreezeList(param);
  };

  // 交易类型切换
  selectTypeChange = value => {
    param = {
      page: 1,
      type: value,
    };
    this.state.changeType = value;
  };

  onChange = p => {
    const { changeType } = this.state;
    param = {
      page: p,
      type: changeType,
    };
    this.getFreezeList(param);
  };

  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const {
      freezeData,
      form: { getFieldDecorator },
    } = this.props;

    const statusMap = ['', 'processing', 'success', 'default'];
    const status = ['', '审核中', '进行中', '清算中'];

    const columns = [
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 100,
      },
      {
        title: '冻结时间',
        dataIndex: 'frozen_at',
        key: 'frozen_at',
      },
      {
        title: '商品',
        key: 'title',
        render(item) {
          return (
            <div className={styles.FreezePro}>
              <img className={styles.proImg} src={item.img} alt="" />
              <span>{item.title}</span>
            </div>
          );
        },
      },
      {
        title: '放单状态',
        dataIndex: 'state',
        key: 'state',
        width: 150,
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
        filteredValue: filteredInfo.state || null,
        onFilter: (value, record) => record.state === value,
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
                <div className={styles.headerInfo}>
                  <span>担保中的任务</span>
                  <p>{freezeData.head_info.forzen_num}个</p>
                  <em />
                </div>
              </Col>
              <Col sm={8} xs={24}>
                <div className={styles.headerInfo}>
                  <span>冻结金额</span>
                  <p>￥{freezeData.head_info.forzen_balance}</p>
                  <em />
                </div>
              </Col>
            </Row>
          </Card>
          <br />
          <Card style={{ width: '100%' }}>
            <div>
              <Form layout="inline">
                <FormItem label="放单类型">
                  {getFieldDecorator('type', {})(
                    <Select
                      style={{ width: 120 }}
                      placeholder="全部"
                      onChange={this.selectTypeChange}
                    >
                      {freezeData.type_select.length &&
                        freezeData.type_select.map(e => (
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
            </div>
            <br />
            <Table
              columns={columns}
              dataSource={freezeData.list}
              onChange={this.handleChange}
              pagination={{
                defaultCurrent: 1,
                current: freezeData.page_info.current_page,
                pageSize: freezeData.page_info.per_page,
                total: freezeData.page_info.total_num,
                onChange: this.onChange,
              }}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FreezeDetail;
