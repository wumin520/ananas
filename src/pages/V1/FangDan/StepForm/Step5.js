import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
}))
class Step5 extends React.PureComponent {
  render() {
    const onFinish = () => {
      router.push('/fangdan/step-form/pay');
    };

    const actions = (
      <Fragment>
        <Button size="large" type="primary" onClick={onFinish}>
          查看详情
        </Button>
        <Button onClick={onFinish} style={{ margin: '40px 0' }} size="large">
          返回列表
        </Button>
      </Fragment>
    );
    const description = (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        我们将在24小时内审核完毕
        <br />
        审核结果以短信形式发送到186****7707的手机上
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
