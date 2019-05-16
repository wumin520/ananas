import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal } from 'antd';
import { router } from 'umi';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Index.less';

@connect(({ list, loading, setting }) => ({
  list,
  loading: loading.models.list,
  setting,
}))
class Index extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    //   payload: {
    //     count: 8,
    //   },
    // });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  forwardToQF = index => {
    router.push(`/fangdan/qf/info?qf=${index}`);
  };

  render() {
    const {
      // list: { list },
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
          'https://cdn.youlianyc.com/image/static/4c0162077ac017705f46686278c48edfbc5d0e42.jpg',
        title: '圈粉推广',
        description: `适用于：
          无基础销量
          宝贝流量较少
          需要提高转化率
          DSR评分低`,
      },
      {
        actions: ['列表', '敬请期待...'],
        state: 0,
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
          'https://cdn.youlianyc.com/image/static/4c0162077ac017705f46686278c48edfbc5d0e42.jpg',
        title: '店铺圈粉',
        description: `提高店铺收藏数`,
      },
      {
        actions: ['+新增'],
        state: 1,
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/4c0162077ac017705f46686278c48edfbc5d0e42.jpg',
        title: '商品圈粉',
        description: `提高单个商品收藏数`,
      },
    ];

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          超多客为电商推广提供量身定制方案,快速提升商品搜索排名,带来大量免费真实用户,获得精准商品流量，提升付费转化率
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            提升转化率
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            快速聚集人气
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            提高商品流量
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const titleContent = item => (
      <div>
        <span style={{ fontSize: 16, fontWeight: 500 }}>{item.title}</span>
        {item.state ? '' : <div className={styles.upgradeTag}>升级中</div>}
      </div>
    );
    const onTabChange = (index, item) => {
      if (!item.state) {
        return;
      }
      console.log('onTabChange -> ', index, item);
      if (item.type === 2 && index === 2) {
        this.setState({
          visible: true,
        });
        return;
      }
      if (index === 1) {
        router.push('/fangdan/list');
        return;
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'form/checkPrivige',
        payload: {
          type: 0,
        },
      }).then(res => {
        if (res && res.status === 'ok') {
          router.push('/fangdan/step-form');
        }
      });
      // console.log('onTabChange', 1, index);
    };

    const { visible } = this.state;
    const { Meta } = Card;
    return (
      <div>
        <Modal
          title="请选择圈粉推广的类型"
          footer={null}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <List
            dataSource={[...qfList]}
            grid={{ gutter: 24, lg: 2, md: 2, sm: 2, xs: 2 }}
            renderItem={(item, index) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={item.avatar} />}
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
        <PageHeaderWrapper title="我要放单" content={content} extraContent={extraContent}>
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
                      actions={[
                        <a
                          onClick={() => {
                            onTabChange(1, item);
                          }}
                        >
                          {item.actions && item.actions[0]}
                        </a>,
                        <a
                          style={item.state ? { color: primaryColor } : {}}
                          onClick={() => {
                            onTabChange(2, item);
                          }}
                        >
                          {item.actions && item.actions[1]}
                        </a>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={titleContent(item)}
                        description={
                          <Ellipsis className={styles.item} lines={3}>
                            {item.description}
                          </Ellipsis>
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

export default Index;
