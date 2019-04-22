import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from './MarketPromotion.less';

import Footer from './components/Footer';

class MarketPromotion extends Component {
  state = {};

  render() {
    return (
      <div className={styles.marketPromotion}>
        {/* banner */}
        <div className={styles.bgColor}>
          <div className={styles.mp_banner}>
            <p className={styles.title}>移动电商广告服务平台</p>
            <p className={styles.subtitle}>领跑移动化营销，一站式导购服务</p>
          </div>
        </div>

        {/* content center */}
        <div className={styles.mp_center}>
          <p className={styles.title}>提供行业领先的移动营销自动化解决方案</p>
          <p className={styles.subtitle}>
            帮助品牌和营销者高效获取优质用户，并提升用户对品牌和产品的好感度
          </p>
          <div className={styles.programs}>
            <div className={styles.program}>
              <img
                src="https://cdn.youlianyc.com/image/static/d10f95507dc5f16549ef3f1ac365345951447889.jpg"
                alt=""
              />
              <span>提升销量</span>
            </div>
            <div className={styles.program}>
              <img
                src="https://cdn.youlianyc.com/image/static/0a67580064480f84f93671d300048e161ef06254.jpg"
                alt=""
              />
              <span>提升店铺转化率</span>
            </div>
            <div className={styles.program}>
              <img
                src="https://cdn.youlianyc.com/image/static/bcec8e21dde32fe6bb21706dec95ad5a0ede7b4e.jpg"
                alt=""
              />
              <span>精准营销推广</span>
            </div>
          </div>
        </div>

        {/* 平台优势 */}
        <div className={styles.advantage_block}>
          <div className={styles.title}>平台优势</div>
          <div className={styles.advantages}>
            <div className={styles.advantage}>
              <div className={styles.imgWord}>海量用户资源</div>
              <div className={styles.desc}>覆盖千万级流量，大大提高曝光率</div>
            </div>
            <div className={styles.advantage}>
              <div className={styles.imgWord}>极致的用户体验</div>
              <div className={styles.desc}>缩短推广周期，增强购物体验</div>
            </div>
            <div className={styles.advantage}>
              <div className={styles.imgWord}>精准营销</div>
              <div className={styles.desc}>建立信任，获得更多附加价值</div>
            </div>
          </div>
        </div>

        {/* 合作案例 */}
        <div className={styles.case_block}>
          <div className={styles.title}>合作案例</div>
          <div className={styles.subtitle}>超多客给他们带来 10W+ 的销量提升</div>
          <div className={styles.businesses}>
            <Carousel>
              <div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img className={styles.logoImg} src="" alt="" />
                  <div className={styles.businessName}>商家名称</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>1234</span>单
                  </div>
                </div>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
            </Carousel>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default MarketPromotion;
