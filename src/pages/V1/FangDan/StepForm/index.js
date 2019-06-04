import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  componentDidMount() {
    /* eslint-disable */
    window.onbeforeunload = function() {
      return '确定离开吗？系统可能不会保存您所做的更改';
    };
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

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
    // console.log(location, '1');
    let title = '新增推广';
    if (location.pathname.indexOf('/qf/') > -1 || location.query.qf !== undefined) {
      title = '商品圈粉';
      location.query.qf === '1' ? (title = '店铺圈粉') : '';
    }
    // step 5
    if (location.query.type) {
      title = '商品圈粉';
      location.query.type === '31' ? (title = '店铺圈粉') : '';
    }
    let breadcrumbList = [];
    if (location.query.deq !== undefined) {
      title = '新增优惠券推广';
      breadcrumbList = [
        { title: '首页', href: '/' },
        { title: '放单中心', href: '/' },
        { title: '优惠券推广', href: '/' },
      ];
    }
    return (
      <PageHeaderWrapper
        title={title}
        tabActiveKey={location.pathname}
        breadcrumbList={breadcrumbList}
        content="快速提升转化率/快速聚集人气/宝贝流量"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="校验商品" />
              <Step title="编辑推广" />
              <Step style={{ display: 'none' }} title="推广排期" />
              <Step style={{ display: 'none' }} title="支付" />
              <Step title="完成" />
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
