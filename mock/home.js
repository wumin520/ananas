const taskInfo = {
  total_amount: 2000,
  total_money: 10000,
};

const orderInfo = {
  total_order_num: 2000,
  daily_order_num: 20,
  week_rate: '12%',
  week_up: 1,
  day_rate: '11%',
  day_up: 1,
};

const commentInfo = {
  good_comment_num: 200,
  good_comment_rate: '20%',
};

const creditInfo = {
  credit_score: 200,
  credit_desc: '信用良好，无限制',
};

const echartData = {
  taskInfo,
  orderInfo,
  commentInfo,
  creditInfo,
};

const taskList = [
  {
    task_id: 2222,
    goods_name: '商品名称',
    img: 'xxx.jpg',
    created_at: '2019-03-03 00:00:00',
    price: '￥20.00',
    coupon_price: 200,
    state: '1',
    total_amount: 200,
    order_num: 100,
    comment_num: 80,
    c_service_num: 10,
  },
];

const hotRank = [
  {
    rank: 1,
    goods_name: '商品名称',
    img: 'http://xxx.jpg',
    order_num: 2000,
    day_rate: '20%',
    day_up: 1,
  },
];

const orderList = [
  {
    p_order_id: 22222,
    goods_name: '商品名称',
    img: 'xxx.jpg',
    state: '1',
    ordered_datetime: '2019-02-10 00:00:00',
  },
];

const indexData = {
  echartData,
  taskList,
  hotRank,
  orderList,
};

export default {
  'GET /api/web/home': indexData,
};
