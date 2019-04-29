import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider, Modal, Carousel } from 'antd';
import DescriptionList from '@/components/DescriptionList';
// import ModelPop from './components/ModelPop';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProductDetail.less';

const { Description } = DescriptionList;
const statusMap = ['error', 'processing', 'warning', 'success'];
const status = ['无效', '已下单', '待评价', '已完成'];
@connect(({ order, loading }) => ({
  orderDetail: order.orderDetail,
  loading: loading.effects['order/orderDetail'],
}))
class ProductDetail extends Component {
  state = {
    modal1Visible: false,
    // itemImg: {},
  };

  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    dispatch({
      type: 'order/orderDetail',
      payload: {
        order_id: query.order_id,
      },
    });
  };

  setModal1Visible = () => {
    this.setState({
      modal1Visible: true,
    });
  };

  Closable = () => {
    this.setState({
      modal1Visible: false,
    });
  };

  render() {
    const { loading, orderDetail } = this.props;
    const { modal1Visible } = this.state;
    console.log('orderDetail', orderDetail);
    const { data } = orderDetail;
    const content = <div />;
    return (
      /* eslint-disable */
      <PageHeaderWrapper title="订单详情" loading={loading} content={content}>
        <Card bordered={false}>
          <DescriptionList size="large" title="商品信息" style={{ marginBottom: 32 }}>
            <Description term="商品id">{data.goods_id}</Description>
            <Description term="商品名称" className={styles.pro_name}>
              {data.title}
            </Description>
            <Description term="商品主图">
              <img src={data.img} alt="img" style={{ width: 65, heigth: 65 }} />
            </Description>
            <Description term="优惠券">{data.coupon ? '￥' + data.coupon : '无'}</Description>
            <Description term="商品价格">￥{data.price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="订单编号">{data.p_order_id}</Description>
            <Description term="订单状态">
              <Badge status={statusMap[data.state]} text={status[data.state]} />
            </Description>
            <Description term="来源">推广编号{data.task_id}</Description>
            <Description term="订单价格">{data.order_price}</Description>
            <Description term="返现金额">￥{data.rebate_price}</Description>
          </DescriptionList>
          <p>
            好评凭证:
            {data.proof_images.length === 0
              ? '未上传'
              : data.proof_images.length > 0 &&
                data.proof_images.map(e => (
                  <a onClick={this.setModal1Visible.bind()}>
                    <img
                      src={e}
                      style={{ width: 100, height: 100, marginLeft: 10, marginBottom: 20 }}
                    />
                  </a>
                ))}
            <Modal
              style={{ top: 20 }}
              footer={null}
              visible={modal1Visible}
              maskClosable={true}
              onCancel={this.Closable.bind()}
            >
              <Carousel autoplay bodyStyle={{ backgroundColor: '#F6F7F8' }}>
                {data.proof_images.length > 0 &&
                  data.proof_images.map(e => (
                    <div className={styles.models}>
                      <a href={e} target="_Blank">
                        <img src={e} alt="" className={styles.hp_img} />
                      </a>
                    </div>
                  ))}
              </Carousel>
            </Modal>
          </p>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="订单进度" style={{ marginBottom: 32 }}>
            <div style={{ paddingLeft: 16 }}>
              <p>{data.paid_datetime ? '下单: ' + data.paid_datetime : ''}</p>
              <p>{data.ordered_datetime ? '付款: ' + data.ordered_datetime : ''}</p>
              <p>{data.harvest_time ? '收货: ' + data.harvest_time : ''}</p>
              <p>{data.proof_time ? '好评: ' + data.proof_time : ''}</p>
            </div>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProductDetail;
