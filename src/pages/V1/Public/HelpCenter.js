import React, { PureComponent } from 'react';
// import { router } from 'umi';
import { Collapse, Icon } from 'antd';
import Footer from './components/Footer';
import 'antd/dist/antd.css';
import styles from './HelpCenter.less';

class Header extends PureComponent {
  state = {
    enter: [
      {
        list_intro: '系统检测商品硬性条件',
        list_time: '2019-04-24',
      },
      {
        list_intro: '商家放单推广要求及流程',
        list_time: '2019-04-24',
      },
      {
        list_intro: '超多客招商入驻要求',
        list_time: '2019-04-24',
      },
    ],
    produtRule: [
      {
        list_intro: '商品推广及上架规范',
        list_time: '2019-04-24',
      },
      {
        list_intro: '商品信息编辑说明',
        list_time: '2019-04-24',
      },
      {
        list_intro: '商品状态异常及保护规则',
        list_time: '2019-04-24',
      },
    ],
    illegal: [
      {
        list_intro: '放单信用分规则',
        list_time: '2019-04-24',
      },
      {
        list_intro: '商家违规限制及账号冻结',
        list_time: '2019-04-24',
      },
      {
        list_intro: '不良商家投诉流程',
        list_time: '2019-04-24',
      },
    ],
    problem: [
      {
        key: '1',
        issue: 'This is panel header 1',
        answer:
          'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
      },
      {
        key: '2',
        issue: 'This is panel header 1',
        answer:
          'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
      },
      {
        key: '3',
        issue: 'This is panel header 1',
        answer:
          'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
      },
    ],
  };

  render() {
    const { Panel } = Collapse;
    const { problem, enter, produtRule, illegal } = this.state;
    return (
      <div className={styles.pages}>
        <div className={styles.help_top}>
          <div className={styles.help_banner}>
            <div className={styles.help_notice}>
              <div className={styles.notice_title}>最新公告</div>
              <div className={styles.notice_content}>
                <div className={styles.introduction}>
                  <p className={styles.intr_title}>
                    <img
                      className={styles.intr_img}
                      src="https://cdn.youlianyc.com/image/static/bbdad5dacc0ae98f8572d47694d7cfec0e14cda5.jpg"
                      alt=""
                    />
                    <span>入门须知</span>
                  </p>
                  {enter.length > 0 &&
                    enter.map(item => (
                      <p className={styles.list}>
                        <span className={styles.list_intro}>{item.list_intro}</span>
                        <span className={styles.list_time}>{item.list_time}</span>
                      </p>
                    ))}
                  <a href="">
                    查看更多 <Icon type="right" />
                  </a>
                </div>
                <div className={styles.introduction}>
                  <p className={styles.intr_title}>
                    <img
                      className={styles.intr_img}
                      src="https://cdn.youlianyc.com/image/static/07c40a2e9715922debd8b5dfae200a977c77bb8c.jpg"
                      alt=""
                    />
                    <span>商品规范</span>
                  </p>
                  {produtRule.length > 0 &&
                    produtRule.map(item => (
                      <p className={styles.list}>
                        <span className={styles.list_intro}>{item.list_intro}</span>
                        <span className={styles.list_time}>{item.list_time}</span>
                      </p>
                    ))}
                  <a href="">
                    查看更多 <Icon type="right" />
                  </a>
                </div>
                <div className={styles.introduction}>
                  <p className={styles.intr_title}>
                    <img
                      className={styles.intr_img}
                      src="https://cdn.youlianyc.com/image/static/f0f26f36d4dbbe74dfdbc82ce5cf47f1daea1446.jpg"
                      alt=""
                    />
                    <span>违规规则</span>
                  </p>
                  {illegal.length > 0 &&
                    illegal.map(item => (
                      <p className={styles.list}>
                        <span className={styles.list_intro}>{item.list_intro}</span>
                        <span className={styles.list_time}>{item.list_time}</span>
                      </p>
                    ))}
                  <a href="">
                    查看更多 <Icon type="right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.help_problem}>
          <div className={styles.problem}>
            <div className={styles.title}>常见问题</div>
            {problem.length > 0 &&
              problem.map(item => (
                <Collapse accordion className={styles.panel}>
                  <Panel header={item.issue} key={item.key}>
                    <p>{item.answer}</p>
                  </Panel>
                </Collapse>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Header;
