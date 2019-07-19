import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';

import Footer from './components/Footer';
import HeadNav from './components/HeadNav';
import ActNav from './components/ActNav';

import styles from './styles.less';
import { getStorage } from '@/utils/authority';

const rewardList = [
  { reward: 500, recharge: 3000 },
  { reward: 1000, recharge: 5000 },
  { reward: 2000, recharge: 10000 },
  { reward: 3000, recharge: 15000 },
];

@connect(({ loading }) => ({
  loading: loading.models.recharge,
}))
class RechargeActivity extends Component {
  state = {
    path: '/CapitalManage/Recharge',
  };

  componentDidMount() {
    if (!getStorage('token')) {
      this.setState({
        path: '/user/login',
      });
    } else if (getStorage('sh_state') === '0') {
      this.setState({
        path: '/user/settlein',
      });
    }
  }

  render() {
    const { path } = this.state;
    return (
      <div>
        <HeadNav />
        <ActNav />

        {/* banner */}
        <div className={styles.recharge_block}>
          <div className={styles.recharge_top}>
            <div className={styles.ms_banner} />
          </div>
        </div>

        <div className={styles.rechargeAct_block}>
          <div className={styles.rechargeAct_title} />
          <div className={styles.rechargeAct_desc}>
            <p>
              感谢新老客户对超多客的支持和信赖，即日起凡是在超多客充值，即刻享受充值送钱的活动。
            </p>
            <p>超多客重磅出击，只要您充值，立马就送奖励金，就这么任性！充的越多，送的就越多喔。</p>
          </div>
          <div className={styles.act_list_block}>
            {rewardList.map(e => (
              <div className={styles.act_item} key={e.reward}>
                <div className={styles.title}>单笔充值满{e.recharge}元</div>
                <div className={styles.reward_block}>
                  <div className={styles.reward_money}>
                    送<span className={styles.reward}>{e.reward}</span>元
                  </div>
                  <div className={styles.btn}>奖励金</div>
                </div>
              </div>
            ))}
          </div>
          <Link className={`${styles.btn_toRecharge}`} to={path}>
            立即充值
          </Link>
          <div className={styles.attention}>
            <div className={styles.title}>温馨提示</div>
            <div className={styles.desc}>
              <p>1、奖励金可用于收藏推广，不支持提现，充值前可联系专属运营了解详情。</p>
              <p>2、活动截止后充值不再赠送奖励金。</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#F6FFED', paddingBottom: '120px' }}>
          <div className={styles.rechargeAct_block}>
            <div className={`${styles.rechargeAct_title} ${styles.rechargeAct_title2}`} />
            <div className={`${styles.rechargeAct_desc} ${styles.rechargeAct_desc2}`}>
              <p>1、可参与活动的用户：超多客放单中心用户。</p>
              <p>2、活动充值限额：活动期间单笔充值达标，才能获得奖励。</p>
              <p>3、奖励生效时间：充值成功后立即生效。</p>
            </div>
          </div>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default RechargeActivity;
