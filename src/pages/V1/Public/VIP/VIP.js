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

    // In the fifth row, other columns are merged into first column
    // by setting it's colSpan to be 0
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    const columns = [
      {
        title: 'VIP特权',
        colSpan: 2,
        dataIndex: 'tel',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (index === 2) {
            obj.props.rowSpan = 2;
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.props.rowSpan = 0;
          }
          if (index === 4) {
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: '功能解析',
        colSpan: 0,
        dataIndex: 'phone',
        render: renderContent,
      },
      {
        title: '普通商家 体验3天',
        dataIndex: 'address',
        render: renderContent,
      },
      {
        title: '黄金会员 ￥4000/年',
        dataIndex: 'name',
        render: (text, row, index) => {
          if (index < 4) {
            return <a href="/">{text}</a>;
          }
          return {
            children: <a href="/">{text}</a>,
            props: {
              colSpan: 5,
            },
          };
        },
      },
      {
        title: '白金会员 ￥6000/年',
        dataIndex: 'age',
        render: renderContent,
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        tel: '0571-22098909',
        phone: 18889898989,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        tel: '0571-22098333',
        phone: 18889898888,
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'London No. 2 Lake Park',
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
            <Table columns={columns} dataSource={data} bordered />
          </div>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default VIP;
