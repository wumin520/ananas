import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, message, Pagination } from 'antd';
import { router } from 'umi';

import * as clipboard from 'clipboard-polyfill';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Favorite.less';

const params = {
  per_page: 12,
  page: 1,
};

@connect(({ favorite, loading, setting }) => ({
  favorite,
  loading: loading.models.favorite,
  setting,
}))
class Favorite extends PureComponent {
  state = {};

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'favorite/queryFavoriteList',
      payload: params,
    });
  };

  forwardToQF = index => {
    const val = index === 0 ? 1 : 0;
    router.push(`/fangdan/qf/info?qf=${val}`);
  };

  onPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    params.page = page;
    this.fetchList();
  };

  render() {
    /* eslint-disable */
    const {
      favorite: { list, page_info },
      loading,
      setting,
    } = this.props;

    const { primaryColor } = setting;
    const titleContent = item => (
      <div>
        <span style={{ fontSize: 16, fontWeight: 500 }}>{item.title}</span>
        {item.state ? '' : <div className={styles.upgradeTag}>升级中</div>}
      </div>
    );
    const onTabChange = (index, item) => {
      /* eslint-disable */
      const { dispatch } = this.props;
      let short_url = '';
      console.log(index, item, this.nodeRef, this.copyTextHash);
      if (index === 1) {
        if (this.copyFailed && this.copyTextHash && this.copyTextHash[item.task_plan_id]) {
          const text = this.copyTextHash[item.task_plan_id];
          clipboard.writeText(text).then(() => {
            message.success('复制成功');
          });
          return;
        }
        dispatch({
          type: 'favorite/queryGoodsUrl',
          payload: {
            task_plan_id: item.task_plan_id,
          },
        }).then(res => {
          if (res.status === 'ok') {
            short_url = res.payload.short_url;
            const url = short_url;
            let text = this[`nodeRef_${item.task_id}`].innerText.replace('[点击复制文案获取]', url);
            text = `${item.title}\n${text}`;
            this.copyTextHash = this.copyTextHash || {};
            this.copyTextHash[item.task_plan_id] = text;
            clipboard
              .writeText(text)
              .then(() => {
                message.success('复制成功');
              })
              .catch(e => {
                console.log(e, 'e -> 复制 ');
                message.error('复制失败！请重新点击复制～');
                this.copyFailed = 1;
              });
          }
        });
      } else {
        dispatch({
          type: 'favorite/removeFavorite',
          payload: {
            task_id: item.task_id,
          },
        }).then(res => {
          if (res.status === 'ok') {
            message.success('取消收藏成功');
            this.fetchList();
          }
        });
      }
    };
    console.log(list, 'list -> ');
    return (
      <div className={styles.noTitle}>
        <PageHeaderWrapper title=" " content=" " extraContent="">
          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 10, lg: 4, md: 2, sm: 1, xs: 1 }}
              dataSource={[...list]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      cover={<img alt="example" src={item.img} />}
                      actions={[
                        <a
                          style={{ color: primaryColor }}
                          onClick={() => {
                            onTabChange(1, item);
                          }}
                        >
                          复制文案
                        </a>,
                        <a
                          onClick={() => {
                            onTabChange(2, item);
                          }}
                        >
                          取消收藏
                        </a>,
                      ]}
                    >
                      <Card.Meta
                        title={titleContent(item)}
                        description={
                          <React.Fragment>
                            <div
                              style={{ whiteSpace: 'pre-wrap', height: 126, overflow: 'hidden' }}
                              ref={node => {
                                this[`nodeRef_${item.task_id}`] = node;
                              }}
                            >
                              {`价格:${item.price}元
券后价:${item.after_coupon_price}元
【推荐理由】${item.recommend_reason}
商品链接:[点击复制文案获取]`}
                            </div>
                          </React.Fragment>
                        }
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton}>
                      <Icon type="plus" /> 新建产品
                    </Button>
                  </List.Item>
                )
              }
            />
          </div>
        </PageHeaderWrapper>
        <Pagination
          style={{ marginTop: 20 }}
          hideOnSinglePage={true}
          onChange={this.onPageChange}
          defaultCurrent={1}
          total={page_info.total_num}
          pageSize={10}
        />
      </div>
    );
  }
}

export default Favorite;
