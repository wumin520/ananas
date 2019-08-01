import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Tag } from 'antd';
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
    const val = index === 0 ? 1 : 0;
    router.push(`/fangdan/qf/info?qf=${val}`);
  };

  render() {
    const {
      // list: { list },
      loading,
      // setting,
    } = this.props;

    // const { primaryColor } = setting;

    const listTemp = [
      {
        // actions: ['列表', '+新增'],
        state: 1,
        label: ['新品提升综合权重'],
        avatar:
          'https://cdn.youlianyc.com/image/static/acb251fe8b2dea609b5902ea1f35049841cef6fd.jpg',
        title: '试用推广',
        // keywords: '快速提升关键词排名/加购率/转化率/快速聚集人气/宝贝流量',
        description: `推广场景：
1、新品上架，需要基础流量、销量、买家秀
2、老品激活，需要提高老链接的动销率，避免死链
3、活动补量，需要绝对安全且及时的快速补量
4、活动报名，需要快速满足平台活动要求，包括基础销量、基础买家秀、DSR店铺权重等

推广效果：
1、优质种草买家秀，提高商品自然转化率
2、快速提高销量、买家秀数量，提升店铺DSR

推广要求：
1、跟进服务质量，推广前需设置单品招商推广计划
2、招商推广ID：3662914，招商团长佣金可设置为0`,
      },
      {
        // actions: ['列表', '+新增'],
        state: 1,
        label: ['优化权重赋能维护'],
        type: 3,
        avatar:
          'https://cdn.youlianyc.com/image/static/987b0e82149da8a8edb8f38ed048e6523bbed4dc.jpg',
        title: '高佣推广',
        // keywords: '加大曝光力度，为商家精准吸粉，有助于提升店铺和商品基础权重',
        description: `推广场景：
1、站外曝光，将商品推荐到百万微信群、QQ群、公众号、小程序流量中
2、站外分销，吸引和发展分销团体，为商品招募百万中小代理长期合作

推广效果：
1、快速提高商品的曝光量，快速出量
2、快速触达分销代理群体，稳定出量

推广要求：
1、宝贝月销量≥200
2、宝贝评价数≥40
3、佣金比例≥20%
4、支持专属佣金设置，推广ID：3662914`,
      },
      {
        // actions: ['列表', '+新增'],
        state: 1,
        label: ['单品精准爆款打造'],
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/ce77e786bc929fef024746da9738bdc9d8230fd8.jpg',
        title: '收藏推广',
        // keywords: '黄金推荐位，超高曝光率，吸引更多买家抢购更有助于提升收藏、加购、重复访问等',
        description: `推广场景：
1、优化千人千面展示，提高商品自然曝光权重
2、优化店铺商品搜索权重，提高商品搜索排名

推广效果：
1、定时定量增加商品和店铺的收藏数量
2、优质用户收藏，提高店铺和商品权重和转化率

推广要求：
1、店铺处于正常状态，非平台处罚中
2、商品有常销数据，效果事半功倍`,
      },
    ];

    const qfList = [
      {
        actions: ['+新增'],
        state: 1,
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/b506a5e8c8c2c467d9bf26b695746268187db04b.jpg',
        title: '店铺收藏',
        description: `提高店铺收藏数`,
      },
      {
        actions: ['+新增'],
        state: 1,
        type: 2,
        avatar:
          'https://cdn.youlianyc.com/image/static/f90b52f7970908277319d34c556fbaf656323549.jpg',
        title: '商品收藏',
        description: `提高单个商品收藏数`,
      },
    ];

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>为商家推广提供量身定制方案，快速提升商品搜索排名，获得精准商品流量，提升购买转化率！</p>
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
        let path = `/fangdan/list`;
        if (item.type === 2) {
          path += '?qf=1';
        } else if (item.type === 3) {
          path += '?deq=1';
        }
        router.push(path);
        return;
      }
      if (item.type === 3) {
        router.push('/fangdan/step-form/info?deq=1');
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
          title="请选择收藏推广的类型"
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
        <PageHeaderWrapper title="我要放单" content={content} extraContent={extraContent}>
          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              // grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={[...listTemp]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card hoverable className={styles.card}>
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={titleContent(item)}
                        description={
                          <div>
                            {item.label && item.label.length > 0
                              ? item.label.map(element => {
                                  return <Tag key={element}>{element}</Tag>;
                                })
                              : ''}
                            <p style={{ marginBottom: 10, marginTop: 10 }}>{item.keywords}</p>
                            <Ellipsis className={styles.item} lines={3}>
                              {item.description}
                            </Ellipsis>
                            <Button
                              type="primary"
                              onClick={() => {
                                onTabChange(2, item);
                              }}
                            >
                              发布推广
                            </Button>
                          </div>
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
