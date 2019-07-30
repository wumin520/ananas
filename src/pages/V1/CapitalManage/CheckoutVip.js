import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Checkbox, Icon } from 'antd';
import { Link } from 'umi';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

const content = <div />;

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

    return (
      <PageHeaderWrapper title="购买会员" content={content}>
        <Card>
          <div>
            <strong style={{ fontSize: '20px', marginRight: '10px' }}>我的VIP会员</strong>
            <Link className={styles.col1890ff} to="/public/VIP">
              了解VIP会员服务
            </Link>
          </div>
          <div className={styles.myVIP}>
            <span>
              我的账号<span className={styles.col1890ff}>{currentUser.phone}</span>，
            </span>
            <span>
              会员等级
              <span className={styles.col1890ff}>
                {currentUser && currentUser.member_info[0].name
                  ? currentUser.member_info[0].name
                  : '无'}
              </span>
            </span>
          </div>
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
                        {e.is_recommend ? (
                          <Fragment>
                            <span className={styles.triangle_topLeft} />
                            <span className={styles.triangle_txt}>推荐</span>
                          </Fragment>
                        ) : (
                          ''
                        )}
                        {selectId === e.package_id ? (
                          <Fragment>
                            <span className={styles.triangle_bottomRight} />
                            <Icon type="check" className={styles.triangle_icon} />
                          </Fragment>
                        ) : (
                          ''
                        )}
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
                    <span className={styles.label_title}>VIP类型</span>
                    <span>{memberListData[selectId - 1].name}-年度</span>
                  </p>
                  <p>
                    <span className={styles.label_title}>会员费</span>
                    <span>￥{memberListData[selectId - 1].price}/年</span>
                  </p>
                  <p>
                    <span className={styles.label_title}>有效期</span>
                    <span>{memberListData[selectId - 1].valid_time}</span>
                  </p>
                  <p>
                    <span className={styles.label_title}>会员内容</span>
                    <span className={styles.col1890ff}>
                      {memberListData[selectId - 1].content_one}
                    </span>
                  </p>
                  <p>
                    <span className={styles.label_title} />
                    <span style={{ color: 'red' }}>{memberListData[selectId - 1].content_two}</span>
                  </p>
                  <p className={styles.describe}>{memberListData[selectId - 1].describe}</p>
                </div>
                <div className={styles.paid_block}>
                  <p className={styles.need_price}>
                    需支付：￥{memberListData[selectId - 1].price}
                  </p>
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
                      我已仔细阅读并同意接受《超多客广告服务协议》、《超多客VIP会员服务协议》
                    </Checkbox>
                  </div>
                </div>
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
