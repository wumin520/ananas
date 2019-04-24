import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
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
    const goDetail = () => {
      router.push(`/fangdan/list/GeneralizeDetail?task_id=${location.query.task_id}`);
    };
    const goBackList = () => {
      router.push('/fangdan/list');
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
    return (
      <Result
        type="success"
        title="提交成功"
        description={description}
        extra=""
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step5;
