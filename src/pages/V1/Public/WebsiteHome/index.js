import React, { Component } from 'react';
import { setInviteCode } from '@/utils/authority';
import router from 'umi/router';
import { Button, Carousel } from 'antd';
// import Link from 'umi/link';
import styles from './index.less';

import Footer from '../components/Footer';
import HeadNav from '../components/HeadNav';
import NavOfficial from '../components/NavOfficial';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#2F54EB',
      opacity: 0.85,
    };
  }

  componentWillMount() {
    // 保存地址参数中的邀请码
    const {
      location: { query },
    } = this.props;
    if (query.s) {
      setInviteCode(query.s);
    }
  }

  componentDidMount() {
    const ele1 = document.getElementById('canvas1');
    const data1 = {
      lr: 'r',
      x1: -200,
      y1: 340,
      x2: 110,
      y2: 20,
      x3: 260,
      y3: 20,
    };
    this.goCanvas(ele1, data1);

    const ele2 = document.getElementById('canvas2');
    const data2 = {
      lr: 'l',
      x1: 500,
      y1: 300,
      x2: 150,
      y2: 20,
      x3: 12,
      y3: 20,
    };
    this.goCanvas(ele2, data2);

    const ele3 = document.getElementById('canvas3');
    const data3 = {
      lr: 'r',
      x1: -150,
      y1: 150,
      x2: 150,
      y2: 20,
      x3: 280,
      y3: 20,
    };
    this.goCanvas(ele3, data3);

    const ele4 = document.getElementById('canvas4');
    const data4 = {
      lr: 'l',
      x1: 290,
      y1: 0,
      x2: 100,
      y2: 130,
      x3: 12,
      y3: 130,
    };
    this.goCanvas(ele4, data4);

    const ele5 = document.getElementById('canvas5');
    const data5 = {
      lr: 'r',
      x1: 0,
      y1: 0,
      x2: 150,
      y2: 130,
      x3: 280,
      y3: 130,
    };
    this.goCanvas(ele5, data5);
  }

  goCanvas = (ele, item) => {
    const obj = ele.getContext('2d');
    obj.beginPath();
    if (item.lr === 'r') {
      obj.arc(item.x3 + 6, item.y3, 5, 0, 2 * Math.PI);
    } else {
      obj.arc(item.x3 - 6, item.y3, 5, 0, 2 * Math.PI);
    }
    obj.fillStyle = '#2f54eb';
    obj.fill();
    obj.strokeStyle = '#38a1dc';
    obj.lineWidth = 3;
    obj.moveTo(item.x1, item.y1);
    obj.lineTo(item.x2, item.y2);
    obj.lineTo(item.x3, item.y3);
    obj.stroke();
    obj.closePath();
    return obj;
  };

  toGo = path => {
    router.push(path);
  };

  next = () => {
    this.setRef.slick.slickNext();
  };

  prev = () => {
    this.setRef.slick.slickPrev();
  };

  setRef = ref => {
    this.setRef = ref;
  };

  render() {
    const { bgColor, opacity } = this.state;
    const bannersSetting = {
      dots: true,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 5000, // 轮播间隔时长
      speed: 1000, // 切换速度
    };

    return (
      <div className={styles.main}>
        <HeadNav />

        <NavOfficial bgColor={bgColor} opacity={opacity} />

        {/* {con0} */}
        <div className={styles.banners}>
          <Carousel {...bannersSetting} ref={this.setRef}>
            {/* <div className={styles.content0_1}>
              <div className={styles.mask} />
              <div className={styles.act_con}>
                <div className={styles.act_block}>
                  <div className={styles.act_left}>
                    <p>充值就送 惊喜多多</p>
                    <p className={styles.desc}>2019新老用户回馈充值返现活动</p>
                    <p className={styles.desc}>充值最高送3000元，充得多送得多！</p>
                    <Link className={styles.btn} to="/public/rechargeActivity">
                      查看详情
                    </Link>
                  </div>
                  <div className={styles.act_right}>
                    <img
                      className={styles.act_right_img}
                      src="https://cdn.youlianyc.com/image/static/0226b6c564a73722ac1e1251173c3e39f36571a7.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div className={styles.content0}>
              <div className={styles.mask} />
              <p className={styles.p1}>赋能百万推手 打造极致爆款</p>
              <p className={styles.p2}>社群导购 + 内容服务 + 数字化营销 = 超多客</p>
            </div>
          </Carousel>
          {/* banner 悬浮按钮 */}
          {/* <div className={styles.icon_block}>
            <Icon
              type="left"
              className={`${styles.icon} ${styles.icon_prev}`}
              onClick={this.prev}
            />
            <Icon
              type="right"
              className={`${styles.icon} ${styles.icon_next}`}
              onClick={this.next}
            />
          </div> */}
        </div>

        {/* {con1} */}
        <div className={`${styles.content_block} ${styles.bgf6f7f8}`}>
          <div className={`${styles.content1} ${styles.content_center}`}>
            <p className={styles.titled}>多客推广、流量变现、一站式解决方案</p>
            <p className={styles.subtitled}>142538041位流量主正在使用</p>
            <div className={styles.flex4}>
              <div className={styles.flexDiv}>
                <div className={`${styles.above} ${styles.aboveBg1}`}>多多客</div>
                <div>
                  <p className={styles.p1}>75%</p>
                  <p className={styles.p2}>拥有社群流量，稳定转化</p>
                </div>
              </div>

              <div className={styles.flexDiv}>
                <div className={`${styles.above} ${styles.aboveBg2}`}>达人网红</div>
                <div>
                  <p className={styles.p1}>14%</p>
                  <p className={styles.p2}>粉丝拥护，享受更多收益</p>
                </div>
              </div>

              <div className={styles.flexDiv}>
                <div className={`${styles.above} ${styles.aboveBg3}`}>自媒体流量站</div>
                <div>
                  <p className={styles.p1}>9%</p>
                  <p className={styles.p2}>拥有社群流量，稳定转化</p>
                </div>
              </div>

              <div className={styles.flexDiv}>
                <div className={`${styles.above} ${styles.aboveBg4}`}>流量平台</div>
                <div>
                  <p className={styles.p1}>2%</p>
                  <p className={styles.p2}>用户群体庞大，坐享流量变现</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {con2} */}
        <div className={styles.content_block}>
          <div className={styles.title_block}>
            <p className={styles.titled}>全域精准营销</p>
            <p className={styles.subtitled}>全方位场景渗透、支持PC、小程序、APP、单页</p>
          </div>
          <div className={`${styles.content2} ${styles.content_center}`}>
            <div className={styles.verDiv}>
              <div className={styles.flexVertical}>
                <p className={styles.p1}>微信小程序</p>
                <p className={styles.p2}>
                  通过微信小程序进行导购，依托微信超级流量入口，快速的达成推广，更加的快捷、稳定。
                </p>
                <Button
                  className={styles.btn}
                  type="primary"
                  // eslint-disable-next-line
                  onClick={this.toGo.bind(this, '/public/matrix')}
                >
                  了解更多
                </Button>
              </div>
              <div>
                <img
                  alt="bg"
                  className={styles.adBg}
                  src="https://cdn.youlianyc.com/image/static/c6188dd271650402ef25562fcef3e7f9442f97af.jpg"
                />
              </div>
            </div>

            <div className={styles.verDiv}>
              <div className={styles.flexVertical}>
                <img
                  alt="bg"
                  className={styles.adBg}
                  src="https://cdn.youlianyc.com/image/static/df2a62e96fc20623970cd0a02bf1bcf442a7357a.jpg"
                />
              </div>
              <div>
                <p className={styles.p1}>CMS网站</p>
                <p className={styles.p2}>
                  快速搭建专业导购网站，免费坐享100人专业团队，免费运营、维护、优化、迭代、运维...
                  你要做的就是，专心去推广！
                </p>
                <button className={`${styles.btn} ${styles.btnDisable}`} type="button">
                  敬请期待
                </button>
              </div>
            </div>

            <div className={styles.verDiv}>
              <div className={styles.flexVertical}>
                <p className={styles.p1}>精品单页</p>
                <p className={styles.p2}>
                  可以应用于任何有流量的网站、 APP、公众号等，如影视站、
                  图片站、社区论坛等，帮助你将 流量变现，收益翻N倍！
                </p>
                <button className={`${styles.btn} ${styles.btnDisable}`} type="button">
                  敬请期待
                </button>
              </div>
              <div>
                <img
                  alt="bg"
                  className={styles.adBg}
                  src="https://cdn.youlianyc.com/image/static/d061a9fbee5cb881caf04f1a8fa9b3996519a116.jpg"
                />
              </div>
            </div>

            <div className={styles.verDiv}>
              <div>
                <img
                  alt="bg"
                  className={styles.adBg}
                  src="https://cdn.youlianyc.com/image/static/70889546d0c1fcadd35fcabb688673b38282b17e.jpg"
                />
              </div>
              <div className={styles.flexVertical}>
                <p className={styles.p1}>开放API</p>
                <p className={styles.p2}>
                  鼓励支持玩法创新，合作共赢！除了完善的导购解决方案，我们还有丰富的数据API接口可供调用，期待与懂技术有想法的你们开创更多导购新玩法。
                </p>
                <button className={`${styles.btn} ${styles.btnDisable}`} type="button">
                  敬请期待
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* {con3} */}
        <div className={styles.content3}>
          <p className={styles.titled}>打造闭环生态链</p>
          <p className={styles.subtitled}>技术驱动商业</p>
          <div className={styles.dataBg}>
            <div className={styles.float1}>
              <canvas id="canvas1" className={styles.canvasDiv} />
              <div className={styles.f1Text}>
                <p className={styles.p1}>平台准认证推手</p>
                <p className={styles.p2}>4,000+</p>
              </div>
            </div>

            <div className={styles.float2}>
              <canvas id="canvas2" className={styles.canvasDiv2} />
              <div className={styles.f2Text}>
                <p className={styles.p1}>系统分析商家大数据</p>
                <p className={styles.p2}>1,425,000+</p>
              </div>
            </div>

            <div className={styles.float3}>
              <canvas id="canvas3" className={styles.canvasDiv2} />
              <div className={styles.f1Text}>
                <p className={styles.p1}>流量平台合作API</p>
                <p className={styles.p2}>25,000+</p>
              </div>
            </div>

            <div className={styles.float4}>
              <canvas id="canvas4" className={styles.canvasDiv2} />
              <div className={styles.f4Text}>
                <p className={styles.p1}>已认证商家</p>
                <p className={styles.p2}>15,000+</p>
              </div>
            </div>

            <div className={styles.float5}>
              <canvas id="canvas5" className={styles.canvasDiv2} />
              <div className={styles.f5Text}>
                <p className={styles.p1}>引流功能测试</p>
                <p className={styles.p2}>3,000+</p>
              </div>
            </div>
          </div>
        </div>
        {/* {con4} */}
        <div className={styles.content4}>
          <div className={styles.mask} />
          <p>携手超多客，为商业赋能</p>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default Index;
