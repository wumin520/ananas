import React, { PureComponent } from 'react';
import NavOfficial from './components/NavOfficial';
import Footer from './components/Footer';
import styles from './Index.less';

class TrafficMatrix extends PureComponent {
  state = {};

  render() {
    /* eslint-disable */
    return (
      <div className={styles.page}>
        <NavOfficial />
        <div className={styles.cdk_top}>
          <div className={styles.box}>
            <div className={styles.title}>
              <p className={styles.title_l}>超多客小程序矩阵</p>
              <p className={styles.title_s}>无缝传播 高效触达</p>
            </div>
            <div className={styles.img}>
              <img
                src="https://cdn.youlianyc.com/image/static/c6188dd271650402ef25562fcef3e7f9442f97af.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.cdk_solution + ' ' + styles.cdk_business}>
          <div className={styles.sol_title}>
            <div className={styles.sol_title_l}>超多客小程序电商解决方案</div>
            <div className={styles.sol_title_s}>从经营流量到经营用户，尽享生态红利</div>
          </div>
          <div className={styles.cdk_circle}>
            <div className={styles.circle_l}>
              <div className={styles.circle_m}>
                <div className={styles.circle_s} />
                <div className={styles.ball_4 + ' ' + styles.ball} />
                <div className={styles.ball_5 + ' ' + styles.ball} />
              </div>
              <div className={styles.ball_1 + ' ' + styles.ball} />
              <div className={styles.ball_2 + ' ' + styles.ball} />
              <div className={styles.ball_3 + ' ' + styles.ball} />
              <div className={styles.largeBall + ' ' + styles.largeBall2}>
                <p className={styles.content}>高效品牌传播</p>
              </div>
              <div className={styles.TV}>
                <p className={styles.message}>
                  <span className={styles.ten}>10</span>
                  <span className={styles.million}>亿</span>
                </p>
                <p className={styles.wx}>微信流量池</p>
              </div>
            </div>
            <div className={styles.largeBall + ' ' + styles.largeBall1}>
              <p className={styles.content}>提高销售额</p>
            </div>
            <div className={styles.largeBall + ' ' + styles.largeBall3}>
              <p className={styles.content}>裂变式营销</p>
            </div>
            <div className={styles.largeBall + ' ' + styles.largeBall4}>
              <p className={styles.content}>多渠道获客</p>
            </div>
          </div>
        </div>
        <div className={styles.cdk_solution}>
          <div className={styles.sol_title}>
            <div className={styles.sol_title_l}>超多客小程序电商解决方案</div>
            <div className={styles.sol_title_s}>从经营流量到经营用户，尽享生态红利</div>
          </div>
          <div className={styles.sol_box}>
            <div className={styles.store}>
              <img
                src="https://cdn.youlianyc.com/image/static/792314d0fdd2a985fd413b828ba97460605ec549.jpg"
                alt=""
                className={styles.store_img}
              />
              <p className={styles.store_titleL}>强大的移动商城</p>
              <p className={styles.store_titleS}>多渠道曝光，引流无忧</p>
            </div>
            <div className={styles.store}>
              <img
                src="https://cdn.youlianyc.com/image/static/dd3a6214b51c45b930133f0920d2961cb264d9c7.jpg"
                alt=""
                className={styles.store_img}
              />
              <p className={styles.store_titleL}>百余种促销玩法</p>
              <p className={styles.store_titleS}>拼团、砍价、抽奖等多种营销，有效促进转化</p>
            </div>
            <div className={styles.store}>
              <img
                src="https://cdn.youlianyc.com/image/static/22a0b0f00880dbe661302851bf69da00b9a0db2f.jpg"
                alt=""
                className={styles.store_img}
              />
              <p className={styles.store_titleL}>完善SCRM管理</p>
              <p className={styles.store_titleS}>数字化会员管理体系，提高复购率</p>
            </div>
            <div className={styles.store}>
              <img
                src="https://cdn.youlianyc.com/image/static/231203076eccc528896bb1dc3361c5117912bd84.jpg"
                alt=""
                className={styles.store_img}
              />
              <p className={styles.store_titleL}>拓展销售渠道</p>
              <p className={styles.store_titleS}>实现销量裂变式增长</p>
            </div>
          </div>
        </div>
        <div className={styles.cdk_solution + ' ' + styles.cdk_plan}>
          <div className={styles.sol_title}>
            <div className={styles.sol_title_l}>超多客+商家共筑计划</div>
            <div className={styles.sol_title_s}>打造小程序电商服务品牌NO.1</div>
          </div>
          <div className={styles.sol_box}>
            <div className={styles.store}>
              <div className={styles.plan_bg}>
                <img
                  src="https://cdn.youlianyc.com/image/static/18e52d6292ae7e58e84acb52d15f7963ede73b00.jpg"
                  alt=""
                />
              </div>
              <p className={styles.store_titleL}>千万用户流量</p>
              <p className={styles.store_titleS}>借助开源联盟，持续为商家引流，拓展更多商业资源</p>
            </div>
            <div className={styles.store}>
              <div className={styles.plan_bg}>
                <img
                  src="https://cdn.youlianyc.com/image/static/fd2e7fd59cf39954d1fa16d866c4834360091453.jpg"
                  alt=""
                />
              </div>
              <p className={styles.store_titleL}>百亿成交额</p>
              <p className={styles.store_titleS}>行业深耕，上百种营销玩法，最大限度提高转化</p>
            </div>
            <div className={styles.store}>
              <div className={styles.plan_bg}>
                <img
                  src="https://cdn.youlianyc.com/image/static/36eb93663f305611d5e41aaa36500cc763bc6f68.jpg"
                  alt=""
                />
              </div>
              <p className={styles.store_titleL}>99%美誉度</p>
              <p className={styles.store_titleS}>构建自然用户体验系统，创造更多价值</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TrafficMatrix;
