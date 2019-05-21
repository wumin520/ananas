import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Divider, Modal, Carousel, Icon } from 'antd';
import DescriptionList from '@/components/DescriptionList';
// import ModelPop from './components/ModelPop';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProductDetail.less';

const { Description } = DescriptionList;
const statusMap = ['error', 'processing', 'warning', 'success'];
@connect(({ order, loading }) => ({
  fansDetail: order.fansDetail,
  loading: loading.effects['order/fansDetail'],
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
      type: 'order/fansDetail',
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
    const { loading, fansDetail } = this.props;
    const { modal1Visible } = this.state;
    const { data } = fansDetail;
    const content = <div />;
    return (
      /* eslint-disable */
      <PageHeaderWrapper title="收藏详情" loading={loading} content={content}>
        <Card bordered={false}>
          <DescriptionList size="large" title="商品/店铺信息" style={{ marginBottom: 32 }}>
            <Description term="商品/店铺id">{data.goods_id}</Description>
            <Description term="商品/店铺名称" className={styles.pro_name}>
              {data.title}
            </Description>
            <Description>
              <div className={styles.pro_img}>
                <p>商品/店铺主图: </p>
                <img src={data.img} alt="img" style={{ width: 65, heigth: 65, marginLeft: 10 }} />
              </div>
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="关注信息" style={{ marginBottom: 32 }}>
            <Description term="用户昵称">{data.p_order_id}</Description>
            <Description term="凭证状态">
              <Badge status={statusMap[data.state]} text={data.state_desc} />
            </Description>
            <Description term="来源">推广编号{data.task_id}</Description>
            <Description term="上传时间">{data.order_price}</Description>
          </DescriptionList>
          <p>
            关注凭证:
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
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProductDetail;
