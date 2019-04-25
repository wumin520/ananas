import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from './MarketPromotion.less';

import MarketNav from './components/MarketNav';
import Footer from './components/Footer';

class MarketPromotion extends Component {
  state = {};

  render() {
    return (
      <div className={styles.marketPromotion}>
        <MarketNav />

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
              <div className={`${styles.imgWord} ${styles.imgWord_1}`}>海量用户资源</div>
              <div className={styles.desc}>覆盖千万级流量，大大提高曝光率</div>
            </div>
            <div className={styles.advantage}>
              <div className={`${styles.imgWord} ${styles.imgWord_2}`}>极致的用户体验</div>
              <div className={styles.desc}>缩短推广周期，增强购物体验</div>
            </div>
            <div className={styles.advantage}>
              <div className={`${styles.imgWord} ${styles.imgWord_3}`}>精准营销</div>
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
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/efaf2d2ccf294c6e552daedc13eb2b84c1fa36c1.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>丝飘旗舰店</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>45613</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/2c5b526d63d27279d0a5c24102df92db4ada78ac.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>金冠家居专营店</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>35215</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/0c1609c3e1453f543a026925d12346d2e1bf033a.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>顾大嫂旗舰店</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>32563</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/14255151aeebab639f0b8ee447a4f82c1961c02c.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>幸福树旗舰店</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>25637</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/61d54fc88ad568fe6ae23c928ae3b4d9a66de3ea.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>生活一站购</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>24568</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/7783d1f9c903519e2f45bce57b511e75749c19b6.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>Mini饰品</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>23541</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/4b913a6c441ce566e8aac724c0b037d5008c8818.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>时光闺蜜</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>15613</span>单
                  </div>
                </div>
                <div className={styles.business}>
                  <img
                    className={styles.logoImg}
                    src="https://cdn.youlianyc.com/image/static/3e49c47873db9efcd36c7f7dfe83ab024f9f640c.jpg"
                    alt=""
                  />
                  <div className={styles.businessName}>邻家家居</div>
                  <div className={styles.businessDesc}>
                    销量提升<span className={styles.num}>12563</span>单
                  </div>
                </div>
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
