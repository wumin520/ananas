import React, { PureComponent } from 'react';
import { Collapse, Icon, List } from 'antd';
import { router } from 'umi';
import MarketNav from './components/MarketNav';
import Footer from './components/Footer';
import 'antd/dist/antd.css';
import styles from './HelpCenter.less';

class Header extends PureComponent {
  state = {
    enter: [
      {
        key: 1,
        list_intro: '系统检测商品硬性条件',
        list_time: '2019-04-25',
      },
      {
        key: 2,
        list_intro: '商家放单推广要求及流程',
        list_time: '2019-04-25',
      },
      {
        key: 3,
        list_intro: '超多客招商入驻要求',
        list_time: '2019-04-25',
      },
    ],
    produtRule: [
      {
        key: 4,
        list_intro: '商品推广及上架规范',
        list_time: '2019-04-25',
      },
      {
        key: 5,
        list_intro: '商品信息编辑说明',
        list_time: '2019-04-25',
      },
      {
        key: 6,
        list_intro: '商品状态异常及保护规则',
        list_time: '2019-04-25',
      },
    ],
    illegal: [
      {
        key: 7,
        list_intro: '放单信用分规则',
        list_time: '2019-04-25',
      },
      {
        key: 8,
        list_intro: '商家违规限制及账号冻结',
        list_time: '2019-04-25',
      },
      {
        key: 9,
        list_intro: '不良商家投诉流程',
        list_time: '2019-04-25',
      },
    ],
    problem: [
      {
        key: '1',
        issue: '1.	提交的商品必须包邮吗？',
        answer: '放单商品必须全国包邮（少数偏远地区、港澳台除外）。',
      },
      {
        key: '2',
        issue: '2.	推广怎么收费？',
        answer: '仅需支付返给用户的货款费用，服务费限时免费。',
      },
    ],
  };

  goDetail = item => {
    if (item.key <= 3) {
      router.push(`/public/helpDetail?SelectedKeys=1&OpenKeys=sub1&key=${item.key}`);
    } else if (item.key >= 4 && item.key <= 6) {
      router.push(`/public/helpDetail?SelectedKeys=2&OpenKeys=sub1&key=${item.key}`);
    } else if (item.key >= 7) {
      router.push(`/public/helpDetail?SelectedKeys=3&OpenKeys=sub1&key=${item.key}`);
    }
  };

  render() {
    const { Panel } = Collapse;
    const { problem, enter, produtRule, illegal } = this.state;
    return (
      <div className={styles.pages}>
        <MarketNav />
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
                    <span>入驻须知</span>
                  </p>
                  <List
                    itemLayout="horizontal"
                    dataSource={enter}
                    split={false}
                    renderItem={item => (
                      <List.Item className={styles.listItem}>
                        <List.Item.Meta
                          title={<a onClick={this.goDetail.bind(this, item)}>{item.list_intro}</a>}
                        />
                        <div>{item.list_time}</div>
                      </List.Item>
                    )}
                  />
                  <a href="/public/helpDetail?SelectedKeys=1&OpenKeys=sub1">
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
                  <List
                    itemLayout="horizontal"
                    dataSource={produtRule}
                    split={false}
                    renderItem={item => (
                      <List.Item className={styles.listItem}>
                        <List.Item.Meta
                          title={<a onClick={this.goDetail.bind(this, item)}>{item.list_intro}</a>}
                        />
                        <div>{item.list_time}</div>
                      </List.Item>
                    )}
                  />
                  <a href="/public/helpDetail?SelectedKeys=2&OpenKeys=sub1">
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
                  <List
                    itemLayout="horizontal"
                    dataSource={illegal}
                    split={false}
                    renderItem={item => (
                      <List.Item className={styles.listItem}>
                        <List.Item.Meta
                          title={<a onClick={this.goDetail.bind(this, item)}>{item.list_intro}</a>}
                        />
                        <div>{item.list_time}</div>
                      </List.Item>
                    )}
                  />
                  <a href="/public/helpDetail?SelectedKeys=3&OpenKeys=sub1">
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
                  <Panel header={item.issue} className={styles.ant} key={item.key}>
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
