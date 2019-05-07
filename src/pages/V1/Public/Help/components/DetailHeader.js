import React, { PureComponent } from 'react';
import Link from 'umi/link';
import styles from './DetailHeader.less';

class DetailHeader extends PureComponent {
  constructor() {
    super();
    this.state = {
      // isLogin: false,
      fixTop: false,
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { scrollTop } = document.documentElement;
    if (scrollTop > 32) {
      this.setState({
        fixTop: true,
      });
    } else {
      this.setState({
        fixTop: false,
      });
    }
  };

  render() {
    const { fixTop } = this.state;
    // const {
    //   currentUser: { state },
    //   currentUser,
    // } = this.props;

    // const phoneStr = currentUser.phone
    //   ? `${currentUser.phone.substr(0, 3)}****${currentUser.phone.substr(7)}`
    //   : '';

    return (
      <div className={`${styles.marketNav} ${fixTop ? styles.navFixtop : ''}`}>
        <div className={styles.nav}>
          <div className={styles.nav_left}>
            <Link to="/web/index">
              <img
                className={styles.logoImg}
                src="https://cdn.youlianyc.com/image/static/80177b5561be4401729b60666c74a07e5e459d34.jpg"
                alt=""
              />
            </Link>
            <div className={styles.line}>line</div>
            <div className={styles.title}>帮助中心</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailHeader;
