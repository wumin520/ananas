import React from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    {/* <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.view-mailbox" />
      </Button>
    </a> */}
    <Link to="/">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        {(location.state && location.state.payload && location.state.payload.tip_title) ||
          '申请已提交'}
      </div>
    }
    description={
      (location.state && location.state.payload && location.state.payload.tip_desc) ||
      '我们将在24小时内审核完毕，审核结果将以短信形式通知您'
    }
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
