import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Alert } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form, user }) => ({
  data: form.step,
  taskId: form.taskId,
  currentUser: user.currentUser,
}))
class Step5 extends React.PureComponent {
  render() {
    /* eslint-disable */
    const { taskId, currentUser, location } = this.props;

    let path = `/fangdan/list/GeneralizeDetail?task_id=${location.query.task_id}`;
    let listPath = '/fangdan/list';
    if (/^3[0|1]$/.test(location.query.type)) {
      path = `/fangdan/qfDetail?task_id=${location.query.task_id}`;
      listPath += `?qf=${location.query.type}`;
    }

    if (location.query.deq) {
      path = `/fangdan/deqDetail?task_id=${location.query.task_id}`;
      listPath += `?deq=${location.query.deq}`;
    }

    const goDetail = () => {
      router.push(path);
    };
    const goBackList = () => {
      router.push(listPath);
    };

    const actions = (
      <Fragment>
        <Button size="large" type="primary" onClick={goDetail}>
          查看详情
        </Button>
        <Button onClick={goBackList} style={{ margin: '40px 0' }} size="large">
          返回列表
        </Button>
      </Fragment>
    );
    const phoneStr = currentUser.phone
      ? `${currentUser.phone.substr(0, 3)}****${currentUser.phone.substr(7)}`
      : '';
    const description = (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        我们将在24小时内审核完毕
        <br />
        审核结果以短信形式发送到{phoneStr}的手机上
      </div>
    );
    const extra = (
      <Alert
        message="审核通过后，您可在超多客官网-选品库中查看自己的商品推广状态"
        type="info"
        showIcon
        closable
      />
    );
    return (
      <div className={styles.stepResult}>
        <Result
          type="success"
          title="提交成功"
          description={description}
          extra={extra}
          actions={actions}
          className={styles.result}
        />
      </div>
    );
  }
}

export default Step5;
