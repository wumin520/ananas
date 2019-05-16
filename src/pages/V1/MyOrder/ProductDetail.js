import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider, Modal, Carousel, Icon } from 'antd';
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
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      modal1Visible: false,
    };
  }

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

  // 轮播左右切换
  next() {
    this.slider.slick.slickNext();
  }

  prev() {
    this.slider.slick.slickPrev();
  }

  render() {
    const { loading, orderDetail } = this.props;
    const { modal1Visible } = this.state;
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
            <Description>
              <div className={styles.pro_img}>
                <p>商品主图: </p>
                <img src={data.img} alt="img" style={{ width: 65, heigth: 65, marginLeft: 10 }} />
              </div>
            </Description>
            <Description term="优惠券">{data.coupon ? '￥' + data.coupon : '无'}</Description>
            <Description term="商品价格">￥{data.price}</Description>
            <Description term="招商ID">{data.zs_duo_id}</Description>
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
              ? ' 未上传'
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
              <Carousel
                autoplay
                dots={false}
                ref={el => (this.slider = el)}
                bodyStyle={{ backgroundColor: '#F6F7F8' }}
              >
                {data.proof_images.length > 0 &&
                  data.proof_images.map(e => (
                    <div className={styles.models}>
                      <a href={e} target="_Blank">
                        <img src={e} alt="" className={styles.hp_img} />
                      </a>
                    </div>
                  ))}
              </Carousel>
              <div className={styles.btn}>
                <Icon type="left" onClick={this.prev} />
                <Icon type="right" onClick={this.next} />
              </div>
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
