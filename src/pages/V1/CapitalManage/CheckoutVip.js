import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Checkbox, Icon, Alert } from 'antd';
import { Link } from 'umi';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const content = (
  <Fragment>
    <Icon type="exclamation-circle" style={{ color: '#2F54EB', marginRight: '5px' }} />
    <Link className={styles.col2F54EB} to="/public/VIP">
      了解VIP会员服务
    </Link>
  </Fragment>
);

@connect(({ VIP, user, loading }) => ({
  memberListData: VIP.memberListData,
  currentUser: user.currentUser,
  loading: loading.models.recharge,
}))
@Form.create()
class CheckoutVip extends PureComponent {
  state = {
    selectId: 1,
    isChecked: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'VIP/getMemberList',
    }).then(() => {
      this.recommendVIP();
    });
  }

  recommendVIP = () => {
    const { memberListData } = this.props;
    let id = '';
    if (memberListData.length > 0) {
      memberListData.map(e => {
        if (e.is_recommend === 1) {
          id = e.package_id;
        }
        return e.package_id;
      });
    }

    this.setState({
      selectId: id,
    });
  };

  selectVIP = packageId => {
    this.setState({
      selectId: packageId,
    });
  };

  onChangeCheckbox = e => {
    console.log('e.target.checked', e.target.checked);
    this.setState({
      isChecked: e.target.checked,
    });
  };

  toPaid = () => {
    const { selectId } = this.state;
    const { dispatch, memberListData } = this.props;
    dispatch({
      type: 'recharge/rechargeSubmit',
      payload: {
        money: memberListData[selectId - 1].price,
        type: 1,
        refer_id: selectId,
      },
    });
  };

  render() {
    const { selectId, isChecked } = this.state;
    const { memberListData, currentUser } = this.props;

    const alertInfo = (
      <div className={styles.myVIP}>
        <span>
          我的账号<span className={styles.col2F54EB}>{currentUser.phone}</span>，
        </span>
        <span>
          会员等级
          <span className={styles.col2F54EB}>
            {currentUser && currentUser.member_info[0].name
              ? currentUser.member_info[0].name
              : '无'}
          </span>
        </span>
      </div>
    );

    return (
      <PageHeaderWrapper title="我的VIP会员" content={content}>
        <Card>
          <Alert message={alertInfo} type="info" showIcon />
          <div className={styles.VIP_block}>
            <div className={styles.top_tabs}>
              {memberListData &&
                memberListData.length > 0 &&
                memberListData.map((e, index) => (
                  <Fragment>
                    {index > 0 ? (
                      <div
                        className={`${styles.tab} ${
                          selectId === e.package_id ? styles.selectedItem : ''
                        }`}
                        key={e.name}
                        onClick={this.selectVIP.bind(this, e.package_id)}
                      >
                        {e.name}
                      </div>
                    ) : (
                      ''
                    )}
                  </Fragment>
                ))}
            </div>
            {memberListData && memberListData.length ? (
              <Fragment>
                <div className={styles.select_Vip_info}>
                  <p>
                    <span className={styles.label_title}>VIP类型：</span>
                    <span>{memberListData[selectId - 1].name}-年度</span>
                  </p>
                  <p>
                    <span className={styles.label_title}>会员费：</span>
                    <span>
                      ￥
                      <span style={{ fontSize: '30px' }}>{memberListData[selectId - 1].price}</span>
                      /年
                    </span>
                  </p>
                  <p>
                    <span className={styles.label_title}>有效期：</span>
                    <span>{memberListData[selectId - 1].valid_time}</span>
                  </p>
                  <p>
                    <span className={`${styles.label_title} ${styles.label_title2}`}>
                      会员内容：
                    </span>
                    <span style={{ color: '#BC8567' }}>
                      {memberListData[selectId - 1].content_one}
                    </span>
                  </p>
                  {memberListData[selectId - 1].content_two ? (
                    <p>
                      <span className={styles.label_title} />
                      <span style={{ color: '#BC8567' }}>
                        {memberListData[selectId - 1].content_two}
                      </span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className={styles.paid_block}>
                  <div>
                    {isChecked ? (
                      <Button className={styles.btn_paid} type="primary" onClick={this.toPaid}>
                        支付并开通
                      </Button>
                    ) : (
                      <Button className={styles.btn_paid} type="primary" disabled>
                        支付并开通
                      </Button>
                    )}
                  </div>
                  <div>
                    <Checkbox onChange={this.onChangeCheckbox}>
                      我已仔细阅读并同意接受
                      <Link to="/public/helpDetail?SelectedKeys=7" style={{ color: '#2B4DEF' }}>
                        《超多客广告服务协议》、《超多客VIP会员服务协议》
                      </Link>
                    </Checkbox>
                  </div>
                </div>
                <p className={styles.describe}>{memberListData[selectId - 1].describe}</p>
              </Fragment>
            ) : (
              ''
            )}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CheckoutVip;
