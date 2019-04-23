import React, { Component } from 'react';
import styles from './index.less';

import Footer from '../components/Footer';
import HeadNav from '../components/HeadNav';

class Index extends Component {
  componentDidMount() {
    const ele1 = document.getElementById('canvas1');
    const ctx1 = ele1.getContext('2d');
    ctx1.beginPath();
    ctx1.strokeStyle = '#38a1dc';
    ctx1.lineWidth = 3;
    ctx1.moveTo(-200, 340);
    ctx1.lineTo(110, 20);
    ctx1.lineTo(260, 20);
    ctx1.stroke();
    ctx1.closePath();

    const ele2 = document.getElementById('canvas2');
    const ctx2 = ele2.getContext('2d');
    ctx2.beginPath();
    ctx2.strokeStyle = '#38a1dc';
    ctx2.lineWidth = 3;
    ctx2.moveTo(500, 300);
    ctx2.lineTo(150, 20);
    ctx2.lineTo(0, 20);
    ctx2.stroke();
    ctx2.closePath();

    const ele3 = document.getElementById('canvas3');
    const ctx3 = ele3.getContext('2d');
    ctx3.beginPath();
    ctx3.strokeStyle = '#38a1dc';
    ctx3.lineWidth = 3;
    ctx3.moveTo(-150, 150);
    ctx3.lineTo(150, 20);
    ctx3.lineTo(300, 20);
    ctx3.stroke();
    ctx3.closePath();

    const ele4 = document.getElementById('canvas4');
    const ctx4 = ele4.getContext('2d');
    ctx4.beginPath();
    ctx4.strokeStyle = '#38a1dc';
    ctx4.lineWidth = 3;
    ctx4.moveTo(290, 0);
    ctx4.lineTo(100, 130);
    ctx4.lineTo(0, 130);
    ctx4.stroke();
    ctx4.closePath();

    const ele5 = document.getElementById('canvas5');
    const ctx5 = ele5.getContext('2d');
    ctx5.beginPath();
    ctx5.strokeStyle = '#38a1dc';
    ctx5.lineWidth = 3;
    ctx5.moveTo(0, 0);
    ctx5.lineTo(150, 130);
    ctx5.lineTo(300, 130);
    ctx5.stroke();
    ctx5.closePath();
  }

  render() {
    return (
      <div className={styles.main}>
        <HeadNav />

        {/* {con0} */}
        <div className={styles.content0}>
          <div className={styles.mask} />
          <p className={styles.p1}>一站式导购服务</p>
          <p className={styles.p2}>打造导购内容生态</p>
        </div>
        {/* {con1} */}
        <div className={styles.content1}>
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
              <div className={`${styles.above} ${styles.aboveBg4}`}>自媒体流量站</div>
              <div>
                <p className={styles.p1}>2%</p>
                <p className={styles.p2}>用户群体庞大，坐享流量变现</p>
              </div>
            </div>
          </div>
        </div>

        {/* {con2} */}
        <div className={styles.content2}>
          <p className={styles.titled}>全域精准营销</p>
          <p className={styles.subtitled}>全方位场景渗透、支持PC、小程序、APP、单页</p>
          <div className={styles.vertical4}>
            <div className={styles.verDiv}>
              <div className={styles.flexVertical}>
                <p className={styles.p1}>微信小程序</p>
                <p className={styles.p2}>
                  通过微信小程序进行导购，依托微信超级流量入口，快速的达成推广，更加的快捷、稳定。
                </p>
                <button className={styles.btn} type="button">
                  了解更多
                </button>
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
                <p className={styles.p1}>平台准入驻推手</p>
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
                <p className={styles.p1}>已入驻商家</p>
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
          <p>携手超多客，为商业赋能</p>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default Index;
