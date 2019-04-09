import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
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
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

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
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title: '好评全返',
        description: `适用于：
基础销量偏低
宝贝流量较少
宝贝销评破零
DSR评分低
佣金比例≥20%`,
      },
      {
        actions: ['列表', '敬请期待...'],
        state: 0,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title: '高佣高券',
        description: `适用于：
宝贝月销量≥50，评价数≥50
DSR评分≥4.8分
佣金比例≥50%`,
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
        <a>{item.title}</a>
        {item.state ? '' : <div className={styles.upgradeTag}>升级中</div>}
      </div>
    );
    const onTabChange = index => {
      console.log('onTabChange', 1, index);
      router.push('/fangdan/step-form');
    };

    return (
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
                          onTabChange(1);
                        }}
                      >
                        {item.actions && item.actions[0]}
                      </a>,
                      <a
                        style={item.state ? { color: primaryColor } : {}}
                        onClick={() => {
                          onTabChange('2');
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
    );
  }
}

export default Index;
