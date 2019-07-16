import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Row, Col, Button, Form, DatePicker, Table, Tabs, Badge } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import moment from 'moment';

import styles from './styles.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

let params = {
  page: 1,
  start_time: '',
  end_time: '',
};

const content = <div />;

@connect(({ capital, loading }) => ({
  assetInfo: capital.assetInfo,
  withdrawData: capital.withdrawData,
  settledData: capital.settledData,
  loading: loading.models.capital,
}))
@Form.create()
class Capital extends PureComponent {
  state = {
    tabType: 0,
    startTime: '',
    endTime: '',
  };

  componentDidMount() {
    this.getSettledRecord(params);
  }

  getWithdrawRecord = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/getWithdrawRecord',
      payload: p,
    });
  };

  getSettledRecord = p => {
    const { dispatch } = this.props;
    dispatch({
      type: 'capital/getSettledRecord',
      payload: p,
    });
  };

  // tabs切换
  tabsClick = value => {
    const { form } = this.props;
    form.resetFields();
    params = {
      page: 1,
    };
    if (value === 'withdraw') {
      this.setState({ tabType: 1 });
      this.getWithdrawRecord(params);
    } else if (value === 'settlement') {
      this.setState({ tabType: 0 });
      this.getSettledRecord(params);
    }
  };

  clearAll = () => {
    const { tabType } = this.state;
    params = {
      page: 1,
    };
    const { form } = this.props;
    form.resetFields();
    if (tabType === 1) {
      this.getWithdrawRecord(params);
    } else {
      this.getSettledRecord(params);
    }
  };

  onChangeDate = date => {
    const startTimeTemp = moment(date[0]).format('YYYY-MM-DD');
    const endTimeTemp = moment(date[1]).format('YYYY-MM-DD');
    this.setState({
      startTime: startTimeTemp,
      endTime: endTimeTemp,
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { startTime, endTime, tabType } = this.state;
    params = {
      page: 1,
      start_time: startTime,
      end_Time: endTime,
    };
    if (tabType === 1) {
      this.getWithdrawRecord(params);
    } else {
      this.getSettledRecord(params);
    }
  };

  toGo = url => {
    router.push(url);
  };

  changePage = currPage => {
    params.page = currPage;
    const { tabType } = this.state;
    if (tabType === 1) {
      this.getWithdrawRecord(params);
    } else {
      this.getSettledRecord(params);
    }
  };

  render() {
    const {
      withdrawData,
      settledData,
      assetInfo,
      form: { getFieldDecorator },
    } = this.props;

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
        title: '日期',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '结算金额（元）',
        dataIndex: 'money',
        key: 'money',
      },
    ];

    const columns2 = [
      {
        title: '时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '提现金额',
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

    const FilterBlock = () => (
      <div>
        <Form onSubmit={this.handleSearch} layout="inline">
          <FormItem label="">
            {getFieldDecorator('range-picker', {})(<RangePicker onChange={this.onChangeDate} />)}
          </FormItem>
          <Button style={{ marginLeft: 8, marginTop: 4 }} type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8, marginTop: 4 }} onClick={this.clearAll}>
            重置
          </Button>
        </Form>
        <br />
      </div>
    );

    return (
      <PageHeaderWrapper title="我的资金" content={content}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={12} xs={24}>
                <Info
                  title="可提现金额(元)"
                  value={assetInfo.balance}
                  linkName="提现"
                  url="/zhaoshang-capital/withdraw"
                  bordered
                />
              </Col>
              <Col sm={12} xs={24}>
                <Info title="已结算金额(元)" value={assetInfo.settled_balance} linkName="" url="" />
              </Col>
            </Row>
          </Card>
          <br />
          <Card>
            <Tabs onTabClick={this.tabsClick}>
              <TabPane tab="结算记录" key="settlement">
                <FilterBlock />
                <Table
                  columns={columns}
                  dataSource={settledData.list}
                  pagination={{
                    defaultCurrent: 1,
                    current: settledData.page_info.current_page,
                    pageSize: settledData.page_info.per_page,
                    total: settledData.page_info.total_num,
                    onChange: this.changePage,
                  }}
                />
              </TabPane>
              <TabPane tab="提现记录" key="withdraw">
                <FilterBlock />
                <Table
                  columns={columns2}
                  dataSource={withdrawData.list}
                  pagination={{
                    defaultCurrent: 1,
                    current: withdrawData.page_info.current_page,
                    pageSize: withdrawData.page_info.per_page,
                    total: withdrawData.page_info.total_num,
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

export default Capital;
