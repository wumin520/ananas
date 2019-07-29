import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Table } from 'antd';

import Footer from '../components/Footer';
import HeadNav from '../components/HeadNav';

import style from '../components/MarketNav.less';
import styles from '../styles.less';

@connect(({ VIP, loading }) => ({
  memberListData: VIP.memberListData,
  loading: loading.models.VIP,
}))
class VIP extends Component {
  state = {
    top: '32px',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const { dispatch } = this.props;
    dispatch({
      type: 'VIP/getMemberList',
    });
  }

  handleScroll = () => {
    const { scrollY } = window;
    if (scrollY > 32) {
      this.setState({
        top: '0',
      });
    } else {
      this.setState({
        top: '32px',
      });
    }
  };

  render() {
    const { top } = this.state;
    const { memberListData } = this.props;

    const renderContent = value => {
      const obj = {
        children: value,
        props: {},
      };
      return obj;
    };

    const columns = [
      {
        title: 'VIP特权',
        colSpan: 2,
        dataIndex: 'title',
        width: 100,
        render: (value, row, index) => {
          const obj = {
            children: value,
            row,
            props: {},
          };

          obj.props.rowSpan = 0;

          const valObj = {
            0: 2,
            2: 6,
            8: 5,
          };
          if ({}.hasOwnProperty.call(valObj, index)) obj.props.rowSpan = valObj[index];

          return obj;
        },
      },
      {
        title: '',
        colSpan: 0,
        dataIndex: 'title_sub',
        render: renderContent,
      },
      {
        title: '功能解析',
        dataIndex: 'function',
        render: renderContent,
      },
      {
        title: '普通商家 体验3天',
        dataIndex: 'function_1',
        render: renderContent,
      },
      {
        title: '黄金会员 ￥4000/年',
        dataIndex: 'function_2',
        render: renderContent,
      },
      {
        title: '白金会员 ￥6000/年',
        dataIndex: 'function_3',
        render: renderContent,
      },
      {
        title: '铂金会员 ￥6000/年',
        dataIndex: 'function_4',
        render: renderContent,
      },
    ];

    const data = [
      {
        key: '1',
        title: '特色服务',
        title_sub: '专属运营1对1服务',
        function: '5年运营定制方案全程跟踪服务',
        function_1: '空',
        function_2: '空',
        function_3: '勾',
        function_4: '勾',
      },
      {
        key: '2',
        title: '特色服务',
        title_sub: '线下电商大会',
        function: '10年电商平台运营经验大牛分享',
        function_1: '空',
        function_2: '空',
        function_3: '空',
        function_4: '勾',
      },
      {
        key: '3',
        title: '独家功能',
        title_sub: '精准用户画像',
        function: '地域/性别/等级',
        function_1: '空',
        function_2: '空',
        function_3: '勾',
        function_4: '勾',
      },
      {
        key: '4',
        title: '独家功能',
        title_sub: '每日订单分时段控制',
        function: '精细化控制每日用户转化',
        function_1: '空',
        function_2: '空',
        function_3: '空',
        function_4: '勾',
      },
      {
        key: '5',
        title: '独家功能',
        title_sub: '自定义购买路径转化',
        function: '精准控制打造计划的数据匹配',
        function_1: '空',
        function_2: '空',
        function_3: '勾',
        function_4: '勾',
      },
      {
        key: '6',
        title: '独家功能',
        title_sub: '宝贝权重优化',
        function: '快速提升宝贝、店铺权重',
        function_1: '不赠送',
        function_2: '赠送￥1000',
        function_3: '赠送￥3000',
        function_4: '赠送￥5000',
      },
      {
        key: '7',
        title: '独家功能',
        title_sub: '店铺DSR优化',
        function: '快速提升全维度UV产值排名',
        function_1: '收取10%',
        function_2: '免费额度50万，超出收取10%',
        function_3: '免费额度100万，超出收取8%',
        function_4: '免费额度200万，超出收取5%',
      },
      {
        key: '8',
        title: '独家功能',
        title_sub: '爆款打造',
        function: '流量黄金推荐位，冲销量必备',
        function_1: '',
        function_2: '5个',
        function_3: '10个',
        function_4: '30个',
      },
      {
        key: '9',
        title: '基础服务',
        title_sub: '免费店铺绑定数',
        function: '发布活动需要绑定对应店铺',
        function_1: '不限制',
        function_2: '不限制',
        function_3: '不限制',
        function_4: '不限制',
      },
      {
        key: '10',
        title: '基础服务',
        title_sub: '用户实名认证',
        function: '手机号认证',
        function_1: '勾',
        function_2: '勾',
        function_3: '勾',
        function_4: '勾',
      },
      {
        key: '11',
        title: '基础服务',
        title_sub: '优先审核',
        function: '发布推广后系统安排优先审核',
        function_1: '空',
        function_2: '空',
        function_3: '勾',
        function_4: '勾',
      },
      {
        key: '12',
        title: '基础服务',
        title_sub: '短信服务',
        function: '每日推广状态提醒',
        function_1: '勾',
        function_2: '勾',
        function_3: '勾',
        function_4: '勾',
      },
      {
        key: '13',
        title: '基础服务',
        title_sub: '置顶推广',
        function: '提高宝贝曝光率',
        function_1: '每天￥2/次',
        function_2: '每天免费1次',
        function_3: '每天免费1次',
        function_4: '每天免费1次',
      },
    ];

    return (
      <div>
        <HeadNav />
        <div style={{ top }} className={style.marketNav}>
          <div className={style.nav}>
            <div className={style.nav_left}>
              <Link to="/web/index">
                <img
                  className={style.logoImg}
                  src="https://cdn.youlianyc.com/image/static/80177b5561be4401729b60666c74a07e5e459d34.jpg"
                  alt=""
                />
              </Link>
              <div className={style.line}>line</div>
              <div className={style.title}>会员特权</div>
            </div>
            <div className={style.nav_right}>
              <div className={style.btn_block}>
                <Link
                  style={{ width: '88px', height: '32px' }}
                  className={`${style.btn} ${style.btn_register}`}
                  to="/"
                >
                  返回首页
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* banner */}
        <div className={styles.VIP_block}>
          <div className={styles.VIP_top}>
            <div className={styles.ms_banner}>
              <p className={styles.p1}>超多客VIP会员</p>
              <p className={styles.p2}>3000+商家，5年电商经验沉淀电商发展快速通道</p>
              <p className={styles.p3}>不为便宜买单，只为效果付费</p>
            </div>
          </div>
        </div>

        {/* content */}
        <div className={styles.VIP_contBlock}>
          <div className={styles.VIPMembers}>
            {memberListData.map((e, index) => (
              <Fragment>
                {index > 0 ? (
                  <div className={styles.VIPMember}>
                    <div className={`${styles.VIPMember_top} ${styles.VIPMember_top_bg}${index}`}>
                      <p className={styles.VIP_name}>{e.name}</p>
                      <p className={styles.VIP_price_block}>
                        ￥<span className={styles.VIP_price}>{e.price}</span>/年
                      </p>
                    </div>
                    <div className={styles.VIPMember_bottom}>
                      <p className={styles.desc}>{e.content_one}</p>
                      <p className={styles.desc}>{e.content_two}</p>
                      <Link className={styles.btn} to="/">
                        立即开通
                      </Link>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </Fragment>
            ))}
          </div>

          <div className={styles.VIP_details}>
            <Table columns={columns} dataSource={data} pagination={false} bordered />
          </div>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default VIP;
