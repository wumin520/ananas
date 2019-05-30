import React, { Component, Fragment } from 'react';
import { Pagination, Popover } from 'antd';
import { connect } from 'dva';
import Footer from '../components/Footer';
import HeadNav from '../components/HeadNav';
import FavNav from '../components/FavNav';

import styles from './Favorites.less';

const advantage = [
  {
    url: 'https://cdn.youlianyc.com/image/static/b295a26a087b813a6cb493a894217e971d458b6f.jpg',
    desc: '商家严审',
  },
  {
    url: 'https://cdn.youlianyc.com/image/static/8888c3f8bb574db7e824c2865885903f11250c6a.jpg',
    desc: '验货质检',
  },
  {
    url: 'https://cdn.youlianyc.com/image/static/7801b42f3d9b56c4178c585ab4117e1bfb603ae5.jpg',
    desc: '买手砍价',
  },
  {
    url: 'https://cdn.youlianyc.com/image/static/a2f2f00a5ff52c58930c1acd6dbea11a52fa9364.jpg',
    desc: '价格监控',
  },
  {
    url: 'https://cdn.youlianyc.com/image/static/e78b1fa45996d8d1cc1ffbce81561764d7028083.jpg',
    desc: '实时上新',
  },
  {
    url: 'https://cdn.youlianyc.com/image/static/185dcac008765aee3bf1e06f544f69e4885cb98a.jpg',
    desc: '多样素材',
  },
];

// 排序条件初始值
const sortInit = {
  最新上架: 0,
  销量: 2,
  佣金比例: 4,
  价格: 6,
};

let sortCondition = {
  sort: 0,
  page: 1,
};

@connect(({ user, favorites }) => ({
  currentUser: user.currentUser,
  tsTaskData: favorites.tsTaskData,
  shortUrl: favorites.shortUrl,
}))
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popVisible: false,
      sortTitle: '最新上架',
    };
  }

  // 页面初始化
  componentDidMount() {
    this.getProList();
  }

  // 获取商品列表
  getProList = () => {
    // let sale = this.sortSale === 2 ? 1 : 0
    // sortCondition.sort = sort || 1
    const { dispatch } = this.props;
    dispatch({
      type: 'favorites/tsTaskList',
      payload: sortCondition,
    });
  };

  // 商品列表排序条件处理
  getProSales = e => {
    const sortTitle = e.target.innerHTML;
    this.setState(
      prevState => {
        const prevSortTitle = prevState.sortTitle;
        let sortInitNumber = sortCondition.sort;
        if (prevSortTitle !== sortTitle) {
          sortCondition = {
            sort: sortInit[sortTitle],
            page: 1,
          };
        } else {
          // 排序 0-最新上架 1-销量升序 2-销量降序 3-佣金升序 4-佣金降序 5-价格升序 6-价格降序
          switch (sortInitNumber) {
            case 1:
              sortInitNumber = 2;
              break;
            case 2:
              sortInitNumber = 1;
              break;
            case 3:
              sortInitNumber = 4;
              break;
            case 4:
              sortInitNumber = 3;
              break;
            case 5:
              sortInitNumber = 6;
              break;
            case 6:
              sortInitNumber = 5;
              break;
            default:
              sortInitNumber = 0;
              break;
          }
          sortCondition = {
            sort: sortInitNumber,
            page: 1,
          };
        }
        return { sortTitle };
      },
      () => {
        this.getProList();
      }
    );
  };

  // 超多客六大优势
  showAdvantages = () => {
    return advantage.map(item => {
      return (
        <Fragment key={item.desc}>
          <div className={styles.top_icon}>
            <img className={styles.top_img_icon} src={item.url} alt="" />
            <div className={styles.top_icon_desc}>{item.desc}</div>
          </div>
        </Fragment>
      );
    });
  };

  // 选品库商品展示
  showFavItem = list => {
    const { popVisible } = this.state;
    return list.map(item => {
      return (
        <div className={styles.fav_item} key={item.task_id}>
          <img className={styles.fav_item_img} src={item.img} alt="" />
          {item.is_new && item.is_collected === 0 ? (
            <img
              className={styles.icon}
              src="https://cdn.youlianyc.com/image/static/51c31671b2ac8314ca99eb6b6ce5edef67136e60.jpg"
              alt=""
            />
          ) : (
            ''
          )}
          {item.is_collected ? (
            <img
              className={styles.icon}
              src="https://cdn.youlianyc.com/image/static/34db296df1a02f2b1d87ae84acd5f91239a2a3bb.jpg"
              alt=""
            />
          ) : (
            ''
          )}
          <div className={styles.flow_fav_show}>
            <div className={styles.flow_fav}>
              <div className={styles.fav} onClick={this.fav.bind(this, item)}>
                {item.is_collected ? '取消收藏' : '加入收藏'}
              </div>
              <Popover
                content={this.promoteInfo(item)}
                className={styles.fav}
                visible={popVisible}
                trigger="click"
                placement="right"
              >
                <div onClick={this.getShortUrl.bind(this, item)}>推广链接</div>
              </Popover>
            </div>
          </div>
          <div className={styles.fav_item_info}>
            <div className={styles.fav_pro_name}>{item.title}</div>
            {/** 商品信息 */}
            <div className={styles.fav_info_block}>
              <div className={`${styles.fav_info_left} ${styles.fav_coupon}`}>
                <span className={styles.fav_coupon_word}>券</span>
                <span className={styles.fav_coupon_price}>￥{item.coupon_price}</span>
              </div>
              <div className={styles.fav_coupon_left}>剩余{item.remain_amount}张</div>
            </div>
            <div className={styles.fav_info_block}>
              <div className={`${styles.fav_info_left}`}>
                <span>券后</span>
                <span className={styles.price}>￥{item.after_coupon_price}</span>
              </div>
              <div className={styles.origin_price}>原价￥{item.price}</div>
            </div>
            <div className={styles.fav_info_block}>
              <div className={`${styles.fav_info_left}`}>
                <span>赚取</span>
                <span className={styles.price}>￥{item.commission_amount}</span>
              </div>
              <div>比率{item.commission_rate}%</div>
            </div>
            <div className={styles.fav_info_block}>
              <div className={`${styles.fav_info_left}`}>销量{item.sales_volume}</div>
            </div>
          </div>
          {/** 店铺名称 */}
          <div className={styles.shop_name}>
            <img
              src="https://cdn.youlianyc.com/image/static/26ac8c8a0600b406d70e33f888f6fdf158f0ae65.jpg"
              alt=""
            />
            {item.mall_name}
          </div>
        </div>
      );
    });
  };

  // 推广链接悬浮层
  promoteInfo = item => {
    const { shortUrl } = this.props;
    return (
      <div className={styles.flow_bg}>
        <p className={styles.mb12}>{item.title}</p>
        <p className={styles.mb12}>
          券后价【{item.after_coupon_price}元】 原价【{item.price}元】
        </p>
        <p className={styles.mb12}>{item.recommend_reason}</p>
        <p className={styles.mb12}>商品链接:{shortUrl}</p>
      </div>
    );
  };

  // 获取推广商品分享链接
  getShortUrl = (item, e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const taskPlanId = item.task_plan_id;
    dispatch({
      type: 'favorites/tsTaskGoodsUrl',
      payload: {
        type: 10,
        task_plan_id: taskPlanId,
      },
    }).then(() => {
      this.setState({
        popVisible: true,
      });
    });
  };

  // 加入&取消收藏
  fav = item => {
    const { dispatch } = this.props;
    const taskId = item.task_id;
    const type = item.is_collected === 0 ? 'favorites/tsAddCollect' : 'favorites/tsRemoveCollect';
    dispatch({
      type,
      payload: {
        task_id: taskId,
      },
    }).then(() => {
      this.getProList();
    });
  };

  // handleVisibleChange = visible => {
  //   this.setState({
  //     popVisible: visible,
  //   },
  //   () => {
  //     console.log('popVisible: ', visible);
  //   });
  // };

  // 翻页
  onChange = pageNumber => {
    sortCondition.page = pageNumber;
    this.getProList();
  };

  render() {
    const { tsTaskData } = this.props;
    const { sortTitle } = this.state;
    const pageInfo = tsTaskData.page_info;

    return (
      <div>
        <HeadNav />
        <FavNav />

        <div className={styles.fav_main}>
          {/** banner */}
          <div className={styles.fav_top_banner}>
            <div className={styles.fav_top_banner_con}>
              <p className={styles.fav_top_title}>超多客六大优势</p>
            </div>
          </div>
          {/** banner icons block */}
          <div className={styles.top_icons}>{this.showAdvantages()}</div>
          <div className={styles.sort_block}>
            <div
              className={`${styles.sort_item} ${
                sortTitle === '最新上架' ? styles.sort_item_selected : ''
              } `}
              onClick={this.getProSales.bind(this)}
            >
              最新上架
            </div>
            <div
              className={`${styles.sort_item} ${
                sortTitle === '销量' ? styles.sort_item_selected : ''
              } ${styles.default} ${sortCondition.sort === 1 ? styles.up : styles.down}`}
              onClick={this.getProSales.bind(this)}
            >
              销量
            </div>
            <div
              className={`${styles.sort_item} ${
                sortTitle === '佣金比例' ? styles.sort_item_selected : ''
              } ${styles.default} ${sortCondition.sort === 3 ? styles.up : styles.down}`}
              onClick={this.getProSales.bind(this)}
            >
              佣金比例
            </div>
            <div
              className={`${styles.sort_item} ${
                sortTitle === '价格' ? styles.sort_item_selected : ''
              } ${styles.default} ${sortCondition.sort === 5 ? styles.up : styles.down}`}
              onClick={this.getProSales.bind(this)}
            >
              价格
            </div>
          </div>
          <div className={styles.fav_list}>{this.showFavItem(tsTaskData.list)}</div>
          <div className={styles.page_block}>
            <Pagination
              showQuickJumper
              total={pageInfo.total_num}
              current={pageInfo.current_page}
              pageSize={pageInfo.per_page}
              onChange={this.onChange}
            />
          </div>
        </div>

        {/* foot */}
        <Footer />
      </div>
    );
  }
}

export default Favorites;
