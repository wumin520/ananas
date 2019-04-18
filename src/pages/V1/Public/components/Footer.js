import React, { PureComponent } from 'react';
import styles from './Footer.less';

class Footer extends PureComponent {
  state = {};

  render() {
    return (
      <div className={styles.bg_footer}>
        <div className={styles.footer}>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.title}>超多客</div>
              <ul>
                <li>1111</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
