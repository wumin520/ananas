import React, { PureComponent } from 'react';
import { Menu, List, Card, Table, Breadcrumb } from 'antd';
import { router } from 'umi';
import HeadNav from '../components/HeadNav';
import DetailHeader from './components/DetailHeader';
import Footer from '../components/Footer';
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
      title: '放单-试用推广',
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
      routers: '认证须知',
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
        routers: '认证须知',
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
    } else if (query.SelectedKeys === '9') {
      this.setState({
        routers: '公告  /  发布时间：2019-7-30 14:00',
      });
    }
  }

  // 点击菜单
  handleClick = e => {
    let routerValue = '';
    if (e.key === '9') {
      routerValue = `${e.item.props.children}  /  发布时间：2019-7-30 14:00`;
    } else {
      routerValue = e.item.props.children;
    }
    this.setState({
      clickIndex: e.key,
      visible: {
        isVisible: 'block',
        proVisible: 'none',
      },
      routers: routerValue,
    });
    console.log('key===>>', e.key);
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
        answer: `试用推广商品要求：1.	属于拼多多商品，商品上架中 2.	推广多多进宝，状态必须为推广中 3.	临期商品不得提审`,
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
        title: '3. 超多客招商认证要求',
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
            <SubMenu key="sub4" title={<span>通知公告</span>}>
              <Menu.Item key="9">公告</Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" title={<span>商家认证</span>}>
              <Menu.Item key="1">认证须知</Menu.Item>
              <Menu.Item key="2">商品规范</Menu.Item>
              <Menu.Item key="3">违规规则</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>常见问题</span>}>
              <Menu.Item key="4">常见问题</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span>客服中心</span>}>
              <Menu.Item key="5">联系我们</Menu.Item>
              <Menu.Item key="6">意见反馈</Menu.Item>
            </SubMenu>
            <Menu.Item key="7">广告服务协议</Menu.Item>
            <Menu.Item key="8">商家vip服务协议</Menu.Item>
          </Menu>

          <div className={styles.enterMessage} style={{ minHeight: winHeight }}>
            <Breadcrumb>
              <Breadcrumb.Item>帮助中心</Breadcrumb.Item>
              <Breadcrumb.Item>
                {clickIndex > 0 && clickIndex <= 3
                  ? '商家认证'
                  : clickIndex === '4'
                  ? '常见问题'
                  : clickIndex === '5' || clickIndex === '6'
                  ? '客服中心'
                  : clickIndex === '9'
                  ? '通知公告'
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
              ) : clickIndex === '6' ? (
                <Card title="意见反馈" bordered={false} style={{ width: 872 }}>
                  <p>感谢您宝贵的意见和建议！反馈邮箱：wang.xiao@qianka.com</p>
                </Card>
              ) : clickIndex === '7' ? (
                <Card title="广告服务协议" bordered={false} style={{ width: 872 }}>
                  <p>
                    甲方：
                    <br />
                    乙方：极单（上海）科技有限公司
                    <br />
                    甲乙双方依据《中华人民共和国广告法》、《中华人民共和国合同法》及国家有关法律、法规的规定，在公平、平等、自愿、等价有偿、诚实信用的基础上，经友好协商，现就超多客首焦合作相关事宜达成一致意见。为明确双方权利、义务关系，特签订合同如下，以资信守。
                    <br />
                    <br />
                    第一条：合作原则、目标
                    <br />
                    1.1
                    欢迎您参加“超多客”软件技术服务合作合作，您接受本协议即意味着您同意遵照本协议的规定参加“超多客”的软件技术服务合作活动；
                    <br />
                    1.2 本协议由“甲方（商家）”： 与“乙方”：极单（上海）科技有限公司共同订立。
                    <br />
                    <br />
                    第二条：合作内容；
                    <br />
                    2.1 发布期限：自 年 月 日起至 月 日止；
                    <br />
                    2.2
                    甲方根据本合同约定的软件技术服务合作时间及价位，向乙方支付相应的软件技术服务合作费用。
                    <br />
                    2.3
                    活动审查：乙方有权审查甲方发布的内容和形式，对违反广告法和相关法律规定的广告内容和形式，乙方有权要求甲方作出修改，在修改之前乙方有权暂时终止甲方的违法活动发布。待审查通过后恢复活动发布，但发布期限不予以顺延。
                    <br />
                    2.4 甲方应在本合同签订之日起三天内向乙方指定微信账户支付软件技术服务合作费用。
                    <br />
                    收款人：极单（上海）科技有限公司
                    <br />
                    <br />
                    第三条：甲方权利义务
                    <br />
                    3.1
                    甲方必须在乙方为其实施活动上线之前，确保软件技术服务合作费用的到账。否则乙方有权暂时停止活动上线发布服务，直到甲方付清合同费用之后恢复上线，在此期间发布期限不予以顺延，仍按合同约定期限计算发布期限。
                    <br />
                    3.2
                    甲方在活动发布前向乙方提供所需的全部资料。甲方保证其提供全部信息内容(包括但不限于文字与图片稿件、图标及链接等)
                    是真实的、合法的和正当的，不侵犯任何第三方的合法权益，任何由该内容引起之争议、诉求、纠纷均与乙方无关，且应由甲方自行承担相关法律责任。如因此给乙方造成经济损失的，乙方有权立即撤除软件技术服务合作，且乙方由此造成的经济损失由甲方负责赔偿（包括但不限于乙方自身的损失，对第三方作出的赔偿，为实现追偿权利而支付的调查取证费用、公证费、律师费、差旅费等全部费用）。对于有国家强制性、限制性的信息内容规定的，甲方提供的信息应符合国家规定。
                    <br />
                    3.3甲方不得违反以下规则，否则乙方将无条件清退，终生无法合作，同时将依法追究其法律责任。
                    <br />
                    (1)禁止甲方对商品的性能、功能、质量、销售状况、用户评价、曾获荣誉等作虚假或者引人误解的商业宣传，欺骗、误导消费者。
                    <br />
                    (2)禁止甲方实际发货商品与活动报名商品不一致，发放产品的质量、商品规格、净含量、质量等与活动报名商品存在偏差，禁止虚假描述、拍A发B给中奖的超多客买家。
                    <br />
                    (3)甲方在使用乙方平台进行营销活动过程中，应当遵循自愿、平等、公平、诚信的原则，遵守法律和商业道德。
                    <br />
                    3.4甲方在支付软件技术服务合作费用后，有权要求乙方按合同约定提供相应的位置并发布相应时间的软件技术服务合作。
                    <br />
                    <br />
                    第四条：乙方权利义务
                    <br />
                    4.1
                    乙方有权按约收取甲方的软件技术服务合作费用，并在确认费用到账后，按合同约定向甲方提供软件技术服务合作；
                    <br />
                    <br />
                    第五条：不可抗力
                    <br />
                    5.1
                    由于不能预见、不能避免并不能克服的原因，致使本合同不能履行或不能完全履行时，遇到上述不可抗力的一方，应立即书面通知合同对方，并应在不可抗力发生后15个自然日内，向合同对方提供经不可抗力事件发生地区公证机构出具的证明合同不能履行或需要延期履行、部分履行的有效证明文件，由合同双方按不可抗力事件对履行合同影响的程度协商决定是否解除合同，或者部分免除履行合同的责任，或者延期履行合同。
                    <br />
                    5.2
                    出现不可抗力事件时，知情方应及时、充分地向对方以书面形式发通知，并告知对方该类事件对本合同可能产生的影响，并应当在合理期限内提供相关证明。
                    <br />
                    5.3
                    由于以上所述不可抗力事件致使合同的部分或全部不能履行或延迟履行，则双方于彼此间不承担任何违约责任。
                    <br />
                    <br />
                    第六条：保密条款
                    <br />
                    6.1
                    未经合同对方书面同意，任何一方对本合同和各方相互提供的资料、信息（包括但不限于商业秘密、技术资料、图纸、数据以及与业务有关的客户的信息及其他信息等）负保密责任，并不得向任何人泄露本合同的条款的任何内容以及本合同的签订及履行情况，以及通过签订和履行本合同而获知的对方及对方关联公司的任何信息。
                    <br />
                    6.2 本合同有效期内及终止后，本保密条款仍具有法律效力。
                    <br />
                    6.3
                    任何一方因泄密而导致合同对方遭受损失的，泄密方应向对方支付合同总额20﹪的违约金，违约金不足以赔偿合同对方损失的，应按合同对方的实际损失赔偿。
                    <br />
                    <br />
                    第七条：协议的变更、解除、终止
                    <br />
                    7.1
                    涉及合同内容的变更，需双方协商一致并签订相应补充协议，任何一方不得随意变更、解除或终止合同。
                    <br />
                    7.2 协议期满后自动终止。
                    <br />
                    <br />
                    第八条：协议生效及其他
                    <br />
                    8.1 本协议的任何修改或补充需遵循双方协商一致原则。
                    <br />
                    8.2 本协议一式两份，双方各执一份，具有同等效力。
                    <br />
                    8.3 本协议自双方签字盖章之日起生效。
                    <br />
                    8.4
                    合同履行过程中如产生争议，由双方协商解决；协商不成的，由乙方所在地人民法院管辖。
                  </p>
                </Card>
              ) : (
                <Card title="商家vip服务协议" bordered={false} style={{ width: 872 }}>
                  <p>
                    一、 声明与承诺
                    <br />
                    （一）欢迎使用超多客网站商家VIP会员服务（以下简称为“服务”），超多客在此特别提醒用户（您）在使用本网站商家VIP会员服务时必须事先认真阅读本服务条款中各条款，包括免除或者限制超多客责任的免责条款及对用户的权利限制，以决定接受或不接受本声明全部条款。
                    <br />
                    <br />
                    （二）您确认，在您注册成为商家VIP会员服务用户以及接受本服务之前，您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即表示您同意遵循本协议的所有约定。如果您不同意接受全部的条款和条件，那么您将不能接受和使用本服务。当您完成注册并点击本协议下方“同意”键时，将表示对本声明全部条款的无异议接受，并同意接受本声明各项条款的约束。
                    <br />
                    <br />
                    （三）您同意，超多客有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公告，不再单独通知您，且毋须征得您的事先同意。变更后的协议和规则一经在网站公布后，立即自动生效。您可随时登录超多客网查阅最新版服务条款。如您不同意相关变更，应当立即停止使用商家VIP会员服务。您若继续使用商家VIP会员服务，即表示您接受经修订的协议和规则。
                    <br />
                    <br />
                    （四）您声明，在您同意接受本协议并加入成为商家VIP会员服务用户时，您是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本协议内容不受您所属国家或地区的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。
                    <br />
                    <br />
                    二、 商家VIP会员服务介绍
                    <br />
                    商家VIP会员服务是超多客商家会员提高品牌和诚信形象的标志，既是商家在超多客诚信认证的过程，也是成为超多客VIP会员商家的标志。开通商家VIP会员服务后，即可点亮VIP会员显示标志，商家的品牌形象随之提升，以达到让更多的消费者信任商家的产品以及有效提升商家销售业绩的目的。可优先得到首页免费的展示位置，关注度也可高出5～10倍；
                    <br />
                    <br />
                    三、 使用规则
                    <br />
                    （一）用户在申请使用超多客网站商家VIP会员服务时，必须向超多客提供准确的个人资料，如个人资料有任何变动，必须及时更新。如果会员提供的信息不真实、不准确、不及时或不完整，或超多客网站有合理的理由怀疑其真实性、准确性、及时性和完整性，超多客则有权中止或终止会员的会员资格并拒绝会员使用任何现有的服务及以后可能提供的功能或服务。
                    <br />
                    <br />
                    （二）用户在使用超多客网站诚信宝服务过程中，必须遵循以下原则：
                    <br />
                    1、在使用商家VIP会员服务过程中实施的所有行为均遵守国家法律法规，不违背社会公共利益或公共道德，不损害他人的合法权益。您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，超多客不负任何直接或间接的责任。
                    <br />
                    2、在使用商家VIP会员服务过程中实施的所有行为必须按照超多客各项规则的规定和要求，如有违反行为，超多客将有权中止或终止该服务。
                    <br />
                    3、在与其他会员交易过程中，遵守诚实信用原则，不采取不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。
                    <br />
                    4、不发布国家禁止销售的或限制销售的商品或服务信息；不发布涉嫌侵犯他人知识产权或其它合法权益的商品或服务信息；不发布违背社会公共利益或公共道德的商品或服务信息；不发布其它涉嫌违法或违反本协议及各类规则的信息。
                    <br />
                    5、不以虚构或歪曲事实的方式不当评价其他会员，不采取不正当方式制造或提高自身的信用度，不采取不正当方式制造或提高（降低）其他会员的信用度；
                    <br />
                    6、用户不得以任何形式擅自转让或授权他人使用自己在本网站的年费服务。用户有义务确保在本网站网上交易平台上登录物品、发布的交易信息真实、准确，无误导性。
                    <br />
                    7.商家不得违反以下规则，否则极单（上海）科技有限公司将无条件清退相应商家，终生无法合作，同时将依法追究其法律责任。
                    <br />
                    (1)禁止商家对商品的性能、功能、质量、销售状况、用户评价、曾获荣誉等作虚假或者引人误解的商业宣传，欺骗、误导消费者。
                    <br />
                    (2)禁止商家实际发货商品与活动报名商品不一致，发放产品的质量、商品规格、净含量、质量等与活动报名商品存在偏差，禁止虚假描述、拍A发B给中奖的超多客买家。
                    <br />
                    (3)商家在使用超多客平台进行营销活动过程中，应当遵循自愿、平等、公平、诚信的原则，遵守法律和商业道德。
                    <br />
                    8.活动发布时，可能会产生的活动费用。
                    <br />
                    9、本网站没有义务对所有用户的注册资料、所有的交易行为以及与交易有关的其他事项进行全面审查，但如发生以下情形，本网站有权限制用户的活动、向用户核实有关资料、发出警告通知、暂时中止、无限期地中止及拒绝向该用户提供服务。
                    <br />
                    (1)用户违反本协议或因被提及而纳入本协议的文件；
                    <br />
                    (2)存在用户或其他第三方通知本网站，认为某个用户或具体交易事项存在违法或不当行为，并提供相关证据，而本网站无法联系到该用户核证或验证该用户向本网站提供的任何资料。
                    <br />
                    (3)存在用户或其他第三方通知本网站，认为某个用户或具体交易事项存在违法或不当行为，并提供相关证据。本网站以普通非专业交易者的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为可能对本网站用户或本网站造成财务损失或法律责任。
                    <br />
                    <br />
                    （三）商家审批用户时不能审批内部员工、亲朋好友等虚假用户；必须确保发给用户的返利商品与返利活动页面的描述一致；必须确保用户到指定平台模拟购买时，返利商品单价与返利活动页面的返利担保金一致；在活动期间在未告知用户其正在做推广的情况下，不可诱导用户通过链接拍付返利商品；不得向申请返利的用户提出无理要求，如强行要求用户进行推广、分享、或者打全5分等行为；若商家违反上述内容，超多客将有权调用、曝光和处理用户在超多客的所有信息，并不退予商家一切款项。
                    <br />
                    <br />
                    四、协议终止
                    <br />
                    （一）超多客有权根据需要不时地制订、修改本协议及/或各类规则，服务条款一旦发生变动，公司将会在页面提示修改内容。修订后的条款内容自公告时起生效，并成为本协议的一部分。用户若在本协议修改之后，仍继续使用本网站，则视为用户接受和自愿遵守修订后的协议。本网站行使修改或中断服务时，不需对任何第三方负责。用户要继续使用超多客网站诚信宝服务需要两方面的确认：
                    <br />
                    1、首先确认超多客网站服务条款及其变动。
                    <br />
                    2、同意接受所有的服务条款限制。
                    <br />
                    <br />
                    （二）超多客网站保留随时修改或中断服务而不需通知用户的权利。超多客修改或中断服务的权利，超多客不需对用户或第三方负责；
                    <br />
                    <br />
                    （三）如用户向本网站提出注销本网站注册用户身份，需经本网站审核同意，由本网站注销该注册用户，用户即解除与本网站的协议关系，但本网站仍保留下列权利：
                    <br />
                    <br />
                    1、用户注销后，本网站有权保留该用户的资料,包括但不限于以前的用户资料。
                    <br />
                    2、用户注销后，如用户在注销前在本网站交易平台上存在违法行为或违反本协议的行为，本网站仍可行使本协议所规定的权利。
                    <br />
                    <br />
                    （四）如存在下列情况，本网站可以通过注销用户的方式终止服务：
                    <br />
                    1、在用户违反本协议相关规定时，本网站有权终止向该用户提供服务。本网站将在中断服务时通知用户；
                    <br />
                    2、一旦本网站发现用户注册资料中主要内容是虚假的，本网站有权随时终止为该用户提供服务；
                    <br />
                    3、本协议终止或更新时，用户未确认新的协议的；
                    <br />
                    4、其它本网站认为需终止服务的情况。
                    <br />
                    5、商家因为产品出现三无问题和用户发生纠纷的（无生产日期、无质量合格证以及无生产厂家等来路不明的产品），经超多客核查情况属实的，立即终止服务。
                    <br />
                    <br />
                    五、本网站的责任范围
                    <br />
                    （一）当用户接受该协议时，用户应明确了解并同意：用户使用本网站的风险由用户个人负担。本网站是在现有技术基础上提供的。包括但不限于对服务的可适用性，没有错误或疏漏，持续性，准确性，可靠性，适用于某一特定用途之类的保证，声明或承诺。超多客对服务所涉的技术和信息的有效性、准确性、可靠性、稳定性和及时性均不作承诺和保证。
                    <br />
                    <br />
                    （二）本网站提供与其它互联网上的网站或资源的链接，用户可能会因此链接至其它运营商经营的网站，但不表示本网站与这些运营商有任何关系。其它运营商经营的网站均由各经营者自行负责，不属于本网站控制及负责范围之内。对于存在或来源于此类网站或资源的任何内容、广告、产品或其它资料，本网站亦不予保证或负责。因使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、物品或服务所产生的任何损害或损失，本网站不负任何直接或间接的责任。
                    <br />
                    <br />
                    （三）不论是否可以预见，不论是源于何种形式的行为，超多客不对由以下原因造成的任何特别的、直接的、间接的、惩罚性的、突发性的或有因果关系的损害或其他任何损害（包括但不限于利润或利息的损失，营业中断，资料灭失）承担责任。该条款可以扩展到法律所排斥的或不受法律约束的范畴。
                    <br />
                    1、使用或不能使用本服务。
                    <br />
                    2、通过本服务购买或获取任何商品，样品，数据，信息或进行交易等，或其他可替代上述行为的行为而产生的费用。
                    <br />
                    3、未经授权的存取或修改数据或数据的传输。
                    <br />
                    4、第三方通过服务所作的陈述或行为。
                    <br />
                    5、其它因与服务相关事件，包括疏忽等，所造成的损害。
                    <br />
                    6、本网站不受干扰、能够及时提供、安全可靠或免于出错。
                    <br />
                    7、本服务使用权的取得结果是正确或可靠的。
                    <br />
                    <br />
                    六、知识产权
                    <br />
                    超多客是所有权利的拥有者，本网站及本网站所使用的任何相关软件、程序、内容，包括但不限于作品、图片、档案、资料、网站构架、网站版面的安排、网页设计、经由本网站或广告商向用户呈现的广告或资讯，均由本网站或其它权利人依法享有相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。
                    <br />
                    <br />
                    七、争议解决方式
                    <br />
                    （一）本协议及其修订本的有效性、履行和与本协议及其修订本效力有关的所有事宜，将受中华人民共和国法律管辖，任何争议仅适用中华人民共和国法律。
                    <br />
                    （二）本协议签订地为中国上海市。因本协议所引起的用户与超多客的任何纠纷或争议，首先应友好协商解决，协商不成的，用户在此完全同意将纠纷或争议提交超多客所在地管辖权的人民法院诉讼解决。
                    <br />
                    <br />
                    八、其他
                    <br />
                    （一）本协议构成双方对本协议的约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。
                    <br />
                    （二）如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
                    <br />
                    （三）本协议中的标题仅为方便而设，在解释本协议时应被忽略。
                    <br />
                    （四）如果本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除。但本协议的其余条款在不影响协议目的的情况下仍应有效并且有约束力。
                  </p>
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
                  <p>试用推广商品要求：</p>
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
                      用户进入超多客官网后，在导航栏顶部可以看到“登录/注册”入口菜单，注册登录后，点击“商家认证”，输入商家相关的信息，认证成功后即可进入放单中心页面，使用你的超多客账号密码即可登录放单系统。(
                      <span style={{ color: 'red' }}>
                        注意：这些信息提交后不可修改，请确认无误后再提交
                      </span>
                      )
                    </p>
                    <p>
                      1、认证申请资料一旦提交则不能再次进行修改，故请在提交资料前仔细检查保证资料的准确性及真实性。
                    </p>
                    <p>2、认证后，请优先了解《超多客放单基本规范》后再进行放单操作！</p>
                    <p>3、资质提交必须保证真实有效，任何时间发现资质作假，将永久取消认证资格！</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
                      二、放单行为规范要求
                    </p>
                    <p>
                      优质好单是畅销的基础，也是平台发展的关键，我们始终希望超多客能够成为好单的聚集地，我们特别欢迎有一定实力的商家认证，放单用户应能够：
                    </p>
                    <p>① 有相应的经验辨别好单；</p>
                    <p>② 认真负责，能够对自己发布的单子及时监督并承担责任；</p>
                    <p>③ 能够遵守平台放单规则，以严谨的态度放单</p>
                  </div>
                  <p>
                    为了保证平台商品提交质量和保障第三方利益，平台新认证账号，需进行考核，考核具体要求如下：
                    <br />
                    账号自认证起，信用分为100，信用分过低会影响放单中心相关功能的使用，请参考信用分规则。
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
