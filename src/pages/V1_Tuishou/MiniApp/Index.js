import React, { Component } from 'react';
import { Row, Col, Card, Tabs, Collapse, Icon, Form, Input, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';

const { TabPane } = Tabs;
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

@Form.create()
class Index extends Component {
  state = {
    expandIconPosition: 'right',
  };

  render() {
    /* eslint-disable */
    const { getFieldDecorator } = this.props.form;
    const { expandIconPosition } = this.state;
    const text = '1';
    // const loading = false;
    const content = <div className={styles.subTitle}>共11项配置 ，11项未配置</div>;
    const formItemLayout = {
      labelCol: { span: 4, offset: 2 },
      wrapperCol: { span: 14 },
    };
    const goldCoinsData = [
      {
        label: '绑定手机号',
        field: 'bind_phone_reward',
        extra: [
          {
            type: 'input',
            field: 'wechat',
            placeholder: '请输入客服微信号',
          },
          {
            type: 'select',
            field: 'keyword',
            placeholder: '请选择回复关键词',
          },
        ],
      },
    ];
    const renderConinsExtra = extra => {
      console.log('renderConinsExtra -> ', extra);
      return extra ? (
        <Col span={10}>
          {extra.map(item => {
            return item.type === 'input' ? (
              <Form.Item key={item.field}>
                {getFieldDecorator(item.field, {
                  rules: [{ required: true, message: '请输入' }],
                })(<Input placeholder={item.placeholder} />)}
              </Form.Item>
            ) : (
              <Form.Item key={item.field}>
                {getFieldDecorator(item.field, {
                  rules: [{ required: true, message: '请输入' }],
                })(<Input placeholder={item.placeholder} />)}
              </Form.Item>
            );
          })}
        </Col>
      ) : (
        ''
      );
    };
    const renderGoldCoinsSetting = list => (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        {list.map(item => {
          return (
            <Row key={item.field} gutter={8}>
              <Col span={3}>{item.label}</Col>
              <Col span={2}>奖励</Col>
              <Col span={2}>
                <Form.Item>
                  {getFieldDecorator('bs', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={2}>金币</Col>
              {item.extra && renderConinsExtra(item.extra)}
            </Row>
          );
        })}
        <Form.Item>
          <Row>
            <Col offset={2}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
    return (
      <PageHeaderWrapper title="基础配置" content={content}>
        <Row gutter={10}>
          <Col span={24}>
            <Card bordered={false} bodyStyle={{ paddingTop: 0 }}>
              <div className={styles.incomeMessage}>
                <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                  <TabPane tab="首页基础配置" key="sales">
                    <Row gutter={32}>
                      <Col span={8}>
                        <iframe
                          className={styles.miniApp}
                          title="mini"
                          src="http://localhost:9000/#!/pages/index"
                        />
                      </Col>
                      <Col span={16}>
                        <Collapse
                          expandIconPosition="right"
                          defaultActiveKey={['2']}
                          onChange={callback}
                        >
                          <Panel header="步数兑换（未配置）" key="1" extra={genExtra()}>
                            <Form layout="horizontal">
                              <Form.Item label="兑换1金币需要" {...formItemLayout}>
                                <Row offset={16} gutter={8}>
                                  <Col span={6}>
                                    {getFieldDecorator('bs', {
                                      rules: [{ required: true, message: '请输入' }],
                                    })(<Input />)}
                                  </Col>
                                  <Col span={2}>步数</Col>
                                </Row>
                              </Form.Item>
                              <Form.Item>
                                <Row>
                                  <Col offset={2}>
                                    <Button type="primary">保存</Button>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Form>
                          </Panel>
                          <Panel header="赚金币" key="2" extra={genExtra()}>
                            {renderGoldCoinsSetting(goldCoinsData)}
                          </Panel>
                          <Panel header="赚现金" key="3" extra={genExtra()}>
                            <div>{text}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="首页基础配置1" key="i">
                    <div>1</div>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
