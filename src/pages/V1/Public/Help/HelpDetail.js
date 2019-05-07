import React, { PureComponent } from 'react';
import { Menu, List, Card, Table, Breadcrumb } from 'antd';
import { router } from 'umi';
import HeadNav from '../components/HeadNav';
import DetailHeader from './components/DetailHeader';
import Footer from '../components/Footer';
import 'antd/dist/antd.css';
import styles from './HelpDetail.less';

const { SubMenu } = Menu;

class HelpDetail extends PureComponent {
  columnsStatic = [
    {
      title: '类型',
      width: 100,
      dataIndex: 'type',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
  ];

  dataStatic = [
    {
      key: '1',
      type: '所有商品',
      desc:
        '情趣用品不展示（避孕套除外）；商品必须包邮，页面信息应与拍下邮费信息一致（偏远地区：新疆、西藏、内蒙古、青海、广西、海南、甘肃除外），特殊商品另作考虑；商品所售规格必须与评价描述相符；',
    },
    {
      key: '2',
      type: '图片',
      desc: '商品主图如附带信息，请和实际推广信息相同，请勿出现图片价格与实际价格不符的情况；',
    },
    {
      key: '3',
      type: '佣金',
      desc: '商品开始推广后和佣金值必须与实际相符；',
    },
    {
      key: '4',
      type: '短标题',
      desc: `不得出现无意义内容；内容必须与实际商品、商品规格等相符；`,
    },
  ];

  columns = [
    {
      title: '违规阶段',
      dataIndex: 'r1',
      render: (value, row, index) => {
        const obj = {
          children: value,
          row,
          props: {},
        };
        obj.props.rowSpan = index === 0 ? 3 : 1;
        return obj;
      },
    },
    {
      title: '违规类型',
      dataIndex: 'r2',
    },
    {
      title: '违规行为',
      dataIndex: 'r3',
    },
    {
      title: '扣信誉分',
      dataIndex: 'r4',
    },
  ];

  data = [
    {
      key: '1',
      r1: '活动过程',
      r2: '商品价格类',
      r3: '1.在推广有效期内，更改活动商品价格/佣金比例;2.活动商品价格虚高',
      r4: '每人次扣1分',
    },
    {
      key: '2',
      // r1: '活动过程',
      r1: '上下架类',
      r2: '活动期间内商品未保持上架状态（除合理情形且商家提供充分的书面证明材料外',
      r3: '每人次扣2分',
    },
    {
      key: '3',
      // r1: '活动过程',
      r1: '下单类',
      r2: '1、引导用户错误购买（包括购买非发布页面所示商品、赠品等情形;2、引导用户使用其他渠道购买',
      r3: '每人次扣2分',
    },
    {
      key: '4',
      r1: '平台规则',
      r2: '私下拉群',
      r3: '1、引导用户加入商家创建的QQ、微信群;2、在和用户聊天过程中提及超多客等',
      r4: '每人次扣1分',
    },
    {
      key: '5',
      r1: '其他行为',
      r2: '其他恶意行为',
      r3: '其他恶意行为造成用户或者平台损失的',
      r4: '根据情况酌情扣1-12分',
    },
  ];

  columnsTitle = [
    {
      title: '扣分节点',
      dataIndex: 'pointDeduct',
    },
    {
      title: '放单-好评试用推广',
      dataIndex: 'backQ',
    },
    {
      title: '平台官方推荐',
      dataIndex: 'recommend',
    },
    {
      title: '提现',
      dataIndex: 'withdraw',
    },
    {
      title: '冻结账号',
      dataIndex: 'freeze',
    },
  ];

  columnsData = [
    {
      key: '1',
      pointDeduct: '满12分',
      backQ: '限制',
      recommend: '不限制',
      withdraw: '不限制',
      freeze: '不限制',
    },
    {
      key: '2',
      pointDeduct: '满24分',
      backQ: '限制',
      recommend: '限制',
      withdraw: '不限制',
      freeze: '不限制',
    },
    {
      key: '3',
      pointDeduct: '满36分',
      backQ: '限制',
      recommend: '限制',
      withdraw: '限制',
      freeze: '不限制',
    },
    {
      key: '4',
      pointDeduct: '超出36分',
      backQ: '限制',
      recommend: '限制',
      withdraw: '限制',
      freeze: '限制',
    },
  ];

  columnsStaticRule = [
    {
      title: '',
      dataIndex: 'name',
      render: (value, row, index) => {
        const obj = {
          children: value,
          row,
          props: {},
        };

        obj.props.rowSpan = 0;

        const valObj = {
          0: 3,
          3: 4,
          7: 2,
          9: 1,
        };
        if ({}.hasOwnProperty.call(valObj, index)) obj.props.rowSpan = valObj[index];

        return obj;
      },
    },
    {
      title: '处罚分类',
      dataIndex: 'item',
    },
    {
      title: '活动要求',
      dataIndex: 'require',
      render: (value, row, index) => {
        const obj = {
          children: <a onClick={this.goRule.bind(this)}>{value}</a>,
          row,
          props: {},
        };
        obj.props.rowSpan = index === 0 ? 10 : 0;
        return obj;
      },
    },
    {
      title: '不符合活动要求的处罚规定',
      dataIndex: 'punish',
    },
  ];

  dataStaticRule = [
    {
      key: '1',
      name: '任务过程',
      item: '商品价格类',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣1分',
    },
    {
      key: '2',
      name: '任务过程',
      item: '上下架类',
      punish: '每次扣2分',
    },
    {
      key: '3',
      name: '任务过程',
      item: '下单类',
      punish: '每次扣2分',
    },
    {
      key: '4',
      name: '发货过程',
      item: '发货时间',
      punish: '每次扣2分',
    },
    {
      key: '5',
      name: '发货过程',
      item: '商品质量',
      punish: '每次扣3分',
    },
    {
      key: '6',
      name: '发货过程',
      item: '错发漏发',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣1分',
    },
    {
      key: '7',
      name: '发货过程',
      item: '收货评价',
      punish: '每次扣2分',
    },
    {
      key: '8',
      name: '平台规则',
      item: '私下拉群',
      require: '与 《超多客商家处罚规则一致》',
      punish: '每次扣3分',
    },
    {
      key: '9',
      name: '平台规则',
      item: '商家规范',
      punish: '每次扣2分',
    },
    {
      key: '10',
      name: '其他行为',
      item: '其他恶意行为',
      punish: '根据情况每次扣1~12分',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      clickIndex: '1', // 控制菜单显示相应的问题列表
      globalKey: 1, // 控制答案的显示
      visible: {
        isVisible: 'block',
        proVisible: 'none',
      }, // 控制问题和答案的显示
      routers: '入驻须知',
      OpenKeys: 'sub1', // 默认打开第一个菜单项
      defaultSelectedKeys: '1', // 默认选中第一个
    };
  }

  componentWillMount() {
    const { location } = this.props;
    const { query } = location;
    this.setState({
      OpenKeys: query.OpenKeys,
      defaultSelectedKeys: query.SelectedKeys,
      clickIndex: query.SelectedKeys,
    });
    // 根据上个页面传的key值决定显示问题答案
    if (query.key) {
      const queryKey = parseInt(query.key, 0);
      this.setState({
        globalKey: queryKey,
        visible: {
          isVisible: 'none',
          proVisible: 'block',
        },
      });
    }

    if (query.SelectedKeys === '1') {
      this.setState({
        routers: '入驻须知',
      });
    } else if (query.SelectedKeys === '2') {
      this.setState({
        routers: '商品规范',
      });
    } else if (query.SelectedKeys === '3') {
      this.setState({
        routers: '违规规则',
      });
    } else if (query.SelectedKeys === '4') {
      this.setState({
        routers: '常见问题',
      });
    } else if (query.SelectedKeys === '5') {
      this.setState({
        routers: '联系我们',
      });
    } else if (query.SelectedKeys === '6') {
      this.setState({
        routers: '意见反馈',
      });
    }
  }

  // 点击菜单
  handleClick = e => {
    this.setState({
      clickIndex: e.key,
      visible: {
        isVisible: 'block',
        proVisible: 'none',
      },
      routers: e.item.props.children,
    });
  };

  // 点击问题
  goAnswer = item => {
    this.setState({
      globalKey: item.key,
      visible: {
        isVisible: 'none',
        proVisible: 'block',
      },
    });
  };

  goRule = () => {
    router.push('/CapitalManage/rulecdk');
  };

  render() {
    const { clickIndex, globalKey, visible, routers, defaultSelectedKeys, OpenKeys } = this.state;
    const { isVisible, proVisible } = visible;
    const EnterData = [
      {
        key: 1,
        title: '1. 系统检测商品硬性条件',
        answer: `好评试用推广商品要求：1.	属于拼多多商品，商品上架中 2.	推广多多进宝，状态必须为推广中 3.	临期商品不得提审`,
        fb_time: '2019-4-25',
      },
      {
        key: 2,
        title: '2. 商家放单推广要求及流程',
        answer:
          '为了让优质商品得到优先展示，同时提高人工审核效率，提交商品必须符合本规范要求的内容，否则不支持提交。已发布上线商品，由于商品相关信息变化导致不符合商品提交规范或存在违规情况，大淘客有权对暂停推广排期。由此造成的一切影响及后果，由商家自行承担责任。',
        fb_time: '2019-4-25',
      },
      {
        key: 3,
        title: '3. 超多客招商入驻要求',
        fb_time: '2019-4-25',
      },
    ];
    const StandardData = [
      {
        key: 4,
        title: '1. 商品推广及上架规范',
        fb_time: '2019-4-25',
      },
      {
        key: 5,
        title: '2. 商品信息编辑说明',
        fb_time: '2019-4-25',
      },
      {
        key: 6,
        title: '3. 商品状态异常及保护规则',
        fb_time: '2019-4-25',
      },
    ];

    const illegalData = [
      {
        key: 7,
        title: '1. 放单信用分规则',
        fb_time: '2019-4-25',
      },
      {
        key: 8,
        title: '2. 商家违规限制及账号冻结',
        fb_time: '2019-4-25',
      },
      {
        key: 9,
        title: '3. 不良商家投诉流程',
        fb_time: '2019-4-25',
      },
    ];
    const problemData = [
      {
        key: 10,
        title: '1. 提交的商品必须包邮吗？',
        answer: '放单商品必须全国包邮（少数偏远地区、港澳台除外）。',
        fb_time: '2019-4-25',
      },
      {
        key: 11,
        title: '2. 推广怎么收费？',
        answer: '仅需支付返给用户的货款费用，服务费限时免费。',
        fb_time: '2019-4-25',
      },
    ];

    const winHeight = document.body.clientHeight - 660;
    /* eslint-disable */
    return (
      <div className={styles.help_page}>
        <HeadNav />
        <DetailHeader />
        <div className={styles.help_detail}>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={[OpenKeys]}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span>商家入驻</span>}>
              <Menu.Item key="1">入驻须知</Menu.Item>
              <Menu.Item key="2">商品规范</Menu.Item>
              <Menu.Item key="3">违规规则</Menu.Item>
            </SubMenu>
            {/* <SubMenu key="sub2" title={<span>通知公告</span>}>
              <Menu.Item key="4">公告</Menu.Item>
            </SubMenu> */}
            <SubMenu key="sub2" title={<span>常见问题</span>}>
              <Menu.Item key="4">常见问题</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span>客服中心</span>}>
              <Menu.Item key="5">联系我们</Menu.Item>
              <Menu.Item key="6">意见反馈</Menu.Item>
            </SubMenu>
          </Menu>

          <div className={styles.enterMessage} style={{ minHeight: winHeight }}>
            <Breadcrumb>
              <Breadcrumb.Item>帮助中心</Breadcrumb.Item>
              <Breadcrumb.Item>
                {clickIndex > 0 && clickIndex <= 3
                  ? '商家入驻'
                  : clickIndex === '4'
                  ? '常见问题'
                  : clickIndex === '5' || clickIndex === '6'
                  ? '客服中心'
                  : ''}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>{routers}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ display: isVisible }}>
              {clickIndex === '1' ? (
                <List
                  itemLayout="horizontal"
                  dataSource={EnterData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a onClick={this.goAnswer.bind(this, item)} className={styles.list}>
                            {item.title}
                          </a>
                        }
                      />
                      <div className={styles.list}>{item.fb_time}</div>
                    </List.Item>
                  )}
                />
              ) : clickIndex === '2' ? (
                <List
                  itemLayout="horizontal"
                  dataSource={StandardData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a onClick={this.goAnswer.bind(this, item)} className={styles.list}>
                            {item.title}
                          </a>
                        }
                      />
                      <div className={styles.list}>{item.fb_time}</div>
                    </List.Item>
                  )}
                />
              ) : clickIndex === '3' ? (
                <List
                  itemLayout="horizontal"
                  dataSource={illegalData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a onClick={this.goAnswer.bind(this, item)} className={styles.list}>
                            {item.title}
                          </a>
                        }
                      />
                      <div className={styles.list}>{item.fb_time}</div>
                    </List.Item>
                  )}
                />
              ) : clickIndex === '4' ? (
                <List
                  itemLayout="horizontal"
                  dataSource={problemData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a onClick={this.goAnswer.bind(this, item)} className={styles.list}>
                            {item.title}
                          </a>
                        }
                      />
                      <div className={styles.list}>{item.fb_time}</div>
                    </List.Item>
                  )}
                />
              ) : clickIndex === '5' ? (
                <div>
                  <Card title="联系我们" bordered={false} style={{ width: 872 }}>
                    <p>咨询时间： 9:30-18:30 （周六周日正常审核商品）</p>
                  </Card>
                </div>
              ) : (
                <Card title="意见反馈" bordered={false} style={{ width: 872 }}>
                  <p>感谢您宝贵的意见和建议！反馈邮箱：wang.xiao@qianka.com</p>
                </Card>
              )}
            </div>
            <div style={{ display: proVisible, width: '100%' }}>
              {globalKey === 10 ? (
                <Card title={problemData[0].title} bordered={false}>
                  <p>{problemData[0].answer}</p>
                </Card>
              ) : globalKey === 11 ? (
                <Card title={problemData[1].title} bordered={false}>
                  <p>{problemData[1].answer}</p>
                </Card>
              ) : globalKey === 1 ? (
                <Card title={EnterData[0].title} bordered={false}>
                  <p>好评试用推广商品要求：</p>
                  <p>1. 属于拼多多商品，商品上架中</p>
                  <p>2. 推广多多进宝，状态必须为推广中</p>
                  <p>3. 临期商品不得提审</p>
                </Card>
              ) : globalKey === 2 ? (
                <Card title={EnterData[1].title} bordered={false}>
                  <p>
                    为了让优质商品得到优先展示，同时提高人工审核效率，提交商品必须符合本规范要求的内容，否则不支持提交。
                  </p>
                  <p>
                    已发布上线商品，由于商品相关信息变化导致不符合商品提交规范或存在违规情况，大淘客有权对暂停推广排期。由此造成的一切影响及后果，由商家自行承担责任。{' '}
                  </p>
                  <Table
                    columns={this.columnsStatic}
                    dataSource={this.dataStatic}
                    bordered
                    pagination={false}
                  />
                  <p style={{ marginTop: 10 }}>
                    后续会进行不断的新增和修改，超多客官方保留解释的权利！
                  </p>
                </Card>
              ) : globalKey === 3 ? (
                <Card title={EnterData[2].title} bordered={false}>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>一、申请须知</p>
                    <p>
                      用户进入超多客官网后，在导航栏顶部可以看到“登录/注册”入口菜单，注册登录后，点击“商家入驻”，输入商家相关的信息，入驻成功后即可进入放单中心页面，使用你的超多客账号密码即可登录放单系统。(
                      <span style={{ color: 'red' }}>
                        注意：这些信息提交后不可修改，请确认无误后再提交
                      </span>
                      )
                    </p>
                    <p>
                      1、入驻申请资料一旦提交则不能再次进行修改，故请在提交资料前仔细检查保证资料的准确性及真实性。
                    </p>
                    <p>2、入驻后，请优先了解《超多客放单基本规范》后再进行放单操作！</p>
                    <p>3、资质提交必须保证真实有效，任何时间发现资质作假，将永久取消入驻资格！</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
                      二、放单行为规范要求
                    </p>
                    <p>
                      优质好单是畅销的基础，也是平台发展的关键，我们始终希望超多客能够成为好单的聚集地，我们特别欢迎有一定实力的商家入驻，放单用户应能够：
                    </p>
                    <p>① 有相应的经验辨别好单；</p>
                    <p>② 认真负责，能够对自己发布的单子及时监督并承担责任；</p>
                    <p>③ 能够遵守平台放单规则，以严谨的态度放单</p>
                  </div>
                  <p>
                    为了保证平台商品提交质量和保障第三方利益，平台新入驻账号，需进行考核，考核具体要求如下：
                    <br />
                    账号自入驻起，信用分为100，信用分过低会影响放单中心相关功能的使用，请参考信用分规则。
                  </p>
                  <p>若对此规则有其他疑问，请咨询招商了解。</p>
                </Card>
              ) : globalKey === 4 ? (
                <Card title={StandardData[0].title} bordered={false}>
                  <p>
                    为保证单子质量，提高审单效率，我们对放单商品的主图、长图、文案做了如下规范，请按照规范提交合格的图文信息，该部分信息不规范将会被直接拒绝，并影响未来的放单权限。
                  </p>
                  <div style={{ marginBottom: 30 }}>
                    <p style={{ fontWeight: 600, fontSize: 16 }}>1.主图规范</p>
                    <p>商品主图直接呈现在超多客平台上，至关重要，要求图片精美，突出主题。</p>
                    <p style={{ color: 'red' }}>以下情况的主图为不合格，审核一定不通过：</p>
                    <p>① 图片有边框、水印、留白；</p>
                    <p>② 图片上文字过多，图文无关，文字包含拉人信息等，图片出现商品尺寸标注；</p>
                    <p>③ 商品展示不完整，仅展示局部，不能凸显主题；</p>
                    <p>④ 主图为多张小图拼接，有明显的修图痕迹；</p>
                    <p>⑤ 主图中赠品面积过大，超过主要商品</p>
                    <p>⑥ 图片上出现过多标签、牛皮癣广告等；</p>
                    <p>⑦ 图片山寨或盗用他人图片。</p>
                  </div>
                  <div style={{ marginBottom: 30 }}>
                    <p style={{ fontWeight: 600, fontSize: 16 }}>2.短标题规范</p>
                    <p style={{ color: 'red' }}>短标题应注意一下几个方面：</p>
                    <p>① 长度尽量控制在15字以内，越短越好；</p>
                    <p>② 短标题内容应精炼明了，拒绝重复性的堆叠或雷同性的文字；</p>
                    <p>③ 食品类（零食、水果、饮料、茶叶等等）必须标明重量或体积；</p>
                    <p>
                      ④ 洗护日用品（洗发水、沐浴露、洗衣液、面膜、各类化妆品）必须标明数量或容量；
                    </p>
                    <p>⑤ 部分衣物需标明数量（袜子、打底裤、内裤等）</p>
                  </div>
                  <div style={{ marginBottom: 30 }}>
                    <p style={{ fontWeight: 600, fontSize: 16 }}>3.推广规范</p>
                    <p style={{ color: 'red' }}>推广过程中应注意以下几个方面：</p>
                    <p>① 佣金不能随意变化；</p>
                    <p>② 商品价格不能修改；</p>
                    <p>③ 请保持商品是上架状态且有在多多进宝中推广；</p>
                  </div>
                </Card>
              ) : globalKey === 5 ? (
                <Card title={StandardData[1].title} bordered={false}>
                  <p>
                    目前超多客商品信息均来源于拼多多平台，仅支持商品主图及短标题的修改，不支持文案等推广内容的编辑，后期将对商品信息进行自定义输出，更佳精细化的展示商品的特色，以供用户能有更深刻美好的印象，提高商品转化率
                  </p>
                </Card>
              ) : globalKey === 6 ? (
                <Card title={StandardData[2].title} bordered={false}>
                  <p>
                    为了保障推广双方的利益，推广期间商品不得发生下架、删除、佣金变化、价格变化等异常，如商家违规，将按影响的用户数扣除商家的信用分，异常期间造成的损失由商家承担
                  </p>
                </Card>
              ) : globalKey === 7 ? (
                <Card title={illegalData[0].title} bordered={false}>
                  <Table
                    columns={this.columns}
                    dataSource={this.data}
                    bordered
                    pagination={false}
                  />
                  <p style={{ marginTop: 30, fontWeight: 600 }}>特别说明：</p>
                  <p>
                    1、超多客为保障双方资金和交易安全，超多客有权根据实际情况暂时或者永久限制商家使用部分功能。若商家需要解除限制的，需根据超多客的要求提供相应证明材料并提供相应的保证措施。
                  </p>
                  <p>
                    2、若商家存在交易纠纷未处理完成且拒不处理的，在交易纠纷处理完毕前，超多客有权停止商家在超多客平台发布任何活动。
                  </p>
                  <p>
                    3、若商家存在违规行为的，超多客有权未经商家许可，直接终止违规行为相关的活动。
                  </p>
                  <p>
                    4、人次是指商家违规行为所影响的用户人数，如商家一次违规行为影响了一个用户，则视为1人次（即每人次）。具体举例如下：
                  </p>
                  <p style={{ paddingLeft: 20 }}>
                    举例1：商家的商品在广告有效期内无故下架一次，导致当天有10个用户购买过程受到影响，则扣除10*50=500元，对应分数扣除10分；
                  </p>
                  <p style={{ paddingLeft: 20 }}>
                    举例2：商家的商品广告有效期内无故下架两次，第一次下架导致5个用户购买过程受到影响，第二次下架导致4个用户购买过程受到影响，则扣除（5+4）*50=450元，对应分数扣除9分。
                  </p>
                </Card>
              ) : globalKey === 8 ? (
                <Card title={illegalData[1].title} bordered={false}>
                  <Table
                    columns={this.columnsTitle}
                    dataSource={this.columnsData}
                    bordered
                    pagination={false}
                  />
                  <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <p>
                      限制放单：指卖家无法在平台发布活动（满24分每2天只能发布一次活动，满36分每月只能发布5次活动）
                    </p>
                    <p>商品平台不做任何推荐：卖家商品无法获得平台任何资源的推荐</p>
                    <p>提现：满36分提现受限，2个月内不能提现，超出36分不能使用提现功能</p>
                    <p>冻结账号：均不能使用，请联系招商办理解冻</p>
                  </div>
                  <Table
                    columns={this.columnsStaticRule}
                    dataSource={this.dataStaticRule}
                    bordered
                    pagination={false}
                  />
                </Card>
              ) : (
                <Card title={illegalData[2].title} bordered={false} style={{ width: 872 }}>
                  <p>因下列原因造成第三方及用户损失，第三方可以向超多客提出投诉：</p>
                  <p>1、商家多次更改佣金造成用户利益受损严重；</p>
                  <p>2、商家提供的商品质量差；</p>
                  <p>3、商家提供临期商品；</p>
                  <p>为了保证商家正常推广，避免无法挽回的后果及损失，请按规则上传商品及放单！</p>
                </Card>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default HelpDetail;
