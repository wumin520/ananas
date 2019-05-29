import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, message } from 'antd';
import { router } from 'umi';

import * as clipboard from 'clipboard-polyfill';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Favorite.less';

@connect(({ favorite, loading, setting }) => ({
  favorite,
  loading: loading.models.favorite,
  setting,
}))
class Favorite extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'favorite/queryFavoriteList',
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  forwardToQF = index => {
    const val = index === 0 ? 1 : 0;
    router.push(`/fangdan/qf/info?qf=${val}`);
  };

  render() {
    const {
      favorite: { list },
      loading,
      setting,
    } = this.props;

    const { primaryColor } = setting;
    const listTemp = [
      {
        actions: ['列表', '+新增'],
        state: 1,
        avatar:
          'https://cdn.youlianyc.com/image/static/4c0162077ac017705f46686278c48edfbc5d0e42.jpg',
        title: '免单试用推广',
        description: `适用于：
          基础销量偏低
          宝贝流量较少
          宝贝销评破零
          DSR评分低`,
      },
      {
        actions: ['列表', '+新增'],
        state: 1,
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/5c75983b5efea8cef21ec34f25972cb946983272.jpg',
        title: '圈粉收藏推广',
        description: `适用于：
          宝贝收藏数低
          店铺收藏数低
          宝贝权重不高
          店铺权重不高`,
      },
      {
        actions: ['列表', '+新增'],
        state: 1,
        type: 3,
        avatar:
          'https://cdn.youlianyc.com/image/static/526746a209d504d6d9c43270767ff76e928aedc2.jpg',
        title: '大额券推广',
        description: `适用于：
          宝贝月销量≥50
          宝贝评价数≥50
          DSR评分≥4.8分
          佣金比例≥30%`,
      },
    ];
    const qfList = [
      {
        actions: ['+新增'],
        state: 1,
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/b506a5e8c8c2c467d9bf26b695746268187db04b.jpg',
        title: '店铺圈粉',
        description: `提高店铺收藏数`,
      },
      {
        actions: ['+新增'],
        state: 1,
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/f90b52f7970908277319d34c556fbaf656323549.jpg',
        title: '商品圈粉',
        description: `提高单个商品收藏数`,
      },
    ];
    const titleContent = item => (
      <div>
        <span style={{ fontSize: 16, fontWeight: 500 }}>{item.title}</span>
        {item.state ? '' : <div className={styles.upgradeTag}>升级中</div>}
      </div>
    );
    const onTabChange = (index, item) => {
      const { dispatch } = this.props;
      console.log(index, item);
      if (index === 1) {
        clipboard.writeText('hello world').then(() => {
          message.success('复制成功');
        });
      } else {
        dispatch({
          type: 'favorite/removeFavorite',
          payload: {
            task_id: item.task_id,
          },
        }).then(res => {
          if (res.status === 'ok') {
            this.fetchList();
          }
        });
      }
    };
    const { visible } = this.state;
    const { Meta } = Card;
    console.log(list, 'list -> ');
    return (
      <div className={styles.noTitle}>
        <Modal
          title="请选择圈粉收藏推广的类型"
          footer={null}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={483}
        >
          <List
            dataSource={[...qfList]}
            grid={{ gutter: 24, lg: 2, md: 2, sm: 2, xs: 2 }}
            renderItem={(item, index) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 206, textAlign: 'center', border: 'none' }}
                  cover={
                    <img alt="example" src={item.avatar} style={{ width: 80, margin: '0 auto' }} />
                  }
                >
                  <Meta title={item.title} description={item.description} />
                  <Button
                    onClick={() => {
                      this.forwardToQF(index);
                    }}
                    style={{ display: 'block', margin: '20px auto 0' }}
                    type="primary"
                  >
                    {item.actions[0]}
                  </Button>
                </Card>
              </List.Item>
            )}
          />
        </Modal>
        <PageHeaderWrapper title=" " content=" " extraContent="">
          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={[...listTemp]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      cover={
                        <img
                          alt="example"
                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                      }
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
                            <div>价格:15.80元</div>
                            <div>券后价:5.80元</div>
                            <div>
                              【推荐理由】限制36个字限制36个字限制36个字限制36个字限制36个字限制36个字限制36个字限
                            </div>
                            <div>商品链接:[点击复制文案获取]</div>
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
      </div>
    );
  }
}

export default Favorite;
