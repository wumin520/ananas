import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'schedule':
        return 2;
      case 'pay':
        return 3;
      case 'result':
        return 4;
      default:
        return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    console.log(location, '1');
    let title = '新增免单试用推广商品';
    if (location.pathname.indexOf('/qf/') > -1) {
      title = '商品圈粉';
    }
    return (
      <PageHeaderWrapper
        title={title}
        tabActiveKey={location.pathname}
        content="快速提升转化率/快速聚集人气/宝贝流量"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="校验商品" />
              <Step title="编辑推广" />
              <Step title="推广排期" />
              <Step title="支付" />
              <Step title="完成" />
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
