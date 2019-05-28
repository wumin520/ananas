import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
// import ModelPop from './components/ModelPop';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProductDetail.less';

const { Description } = DescriptionList;
@connect(({ order, loading }) => ({
  orderDetail: order.orderDetail,
  loading: loading.effects['order/orderDetail'],
}))
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
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

  setModal1Visible = () => {};

  Closable = () => {};

  // 轮播左右切换
  next() {
    this.slider.slick.slickNext();
  }

  prev() {
    this.slider.slick.slickPrev();
  }

  render() {
    const { loading, orderDetail, location } = this.props;
    const { data } = orderDetail;
    const content = <div />;
    const { deq } = location.query;

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
              <div className={styles.pro_image}>
                <p>商品主图: </p>
                <img src={data.img} alt="img" style={{ width: 65, heigth: 65, marginLeft: 10 }} />
              </div>
            </Description>
            <Description term="优惠券">{data.coupon ? '￥' + data.coupon : '无'}</Description>
            {deq ? (
              <React.Fragment>
                <Description term="优惠券数量">
                  ￥{data.coupon_info.coupon_total_quantity}
                </Description>
                <Description term="招商ID">{data.zs_duo_id}</Description>
                <Description term="商品价格">￥{data.price}</Description>
                <Description term="佣金">{data.commission_rate}</Description>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Description term="商品价格">￥{data.price}</Description>
                <Description term="招商ID">{data.zs_duo_id}</Description>
              </React.Fragment>
            )}
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="订单编号">{data.p_order_id}</Description>
            <Description term="订单状态">
              <Badge status={data.state_color} text={data.state_desc} />
            </Description>
            <Description term="来源">推广编号{data.task_id}</Description>
            <Description term="订单价格">{data.order_price}</Description>
            {deq ? '' : <Description term="返现金额">￥{data.rebate_price}</Description>}
          </DescriptionList>
          <div className={styles.evaluate}>
            <Description style={{ width: '34.3%' }}>
              <div className={styles.pro_img}>
                <p className={styles.S_title}>用户评价: </p>
                {data.proof_images.length === 0
                  ? '未上传'
                  : data.proof_images.length > 0 &&
                    data.proof_images.map(e => (
                      <img src={e} style={{ width: 100, height: 100, margin: '0 0px 20px 10px' }} />
                    ))}
              </div>
            </Description>
            <Description style={{ width: '50%' }}>
              <div className={styles.pro_img}>
                <p className={styles.S_title}>试用报告: </p>
                {data.real_images.length === 0 ? (
                  '未上传'
                ) : (
                  <span>
                    {data.trial_experience}
                    <br />
                    {data.real_images.length > 0 &&
                      data.real_images.map(e => (
                        <img src={e} style={{ width: 100, height: 100, margin: '10px 0 20px' }} />
                      ))}
                  </span>
                )}
              </div>
            </Description>
          </div>
          {/* <Modal
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
              </Modal> */}

          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="订单进度" style={{ marginBottom: 32 }}>
            <div style={{ paddingLeft: 16 }}>
              <p>{data.paid_datetime ? '下单: ' + data.paid_datetime : ''}</p>
              <p>{data.ordered_datetime ? '付款: ' + data.ordered_datetime : ''}</p>
              <p>{data.harvest_time ? '收货: ' + data.harvest_time : ''}</p>
              {/**<p>{data.proof_time ? '免单: ' + data.proof_time : ''}</p>*/}
            </div>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProductDetail;
