import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import Footer from '../components/Footer';
import 'antd/dist/antd.css';
import styles from './HelpDetail.less';

const { SubMenu } = Menu;

class HelpDetail extends PureComponent {
  state = {};

  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <div>
        <div className={styles.help_detail}>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span>商家入驻</span>}>
              <Menu.Item key="1">入驻须知</Menu.Item>
              <Menu.Item key="2">商品规范</Menu.Item>
              <Menu.Item key="3">违规规则</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>通知公告</span>}>
              <Menu.Item key="4">公告</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span>常见问题</span>}>
              <Menu.Item key="5">常见问题</Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" title={<span>客服中心</span>}>
              <Menu.Item key="6">联系我们</Menu.Item>
              <Menu.Item key="7">意见反馈</Menu.Item>
            </SubMenu>
          </Menu>
          <div />
        </div>
        <Footer />
      </div>
    );
  }
}
export default HelpDetail;
