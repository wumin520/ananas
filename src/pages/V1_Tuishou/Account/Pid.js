import React, { Component } from 'react';
import { Table, Modal, notification } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ pid, loading }) => ({
  pid,
  loading: loading.effects['pid/queryPidTaskList'],
}))
class Pid extends Component {
  state = {};

  componentDidMount() {
    const {
      dispatch,
      location: { query },
    } = this.props;
    if (query.code) {
      dispatch({
        type: 'pid/queryAuthorizeResult',
        payload: {
          code: query.code,
        },
      }).then(res => {
        this.openNotification(res);
      });
    }
    this.queryPidTaskList();
    this.openNotification({
      status: 'fail',
      state: 0,
      message: '您绑定的授权帐号 15185768791 有效期预计2019-06-20 10:34:08',
    });
  }

  queryPidTaskList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'pid/queryPidTaskList',
    });
  };

  openNotification = result => {
    /* eslint-disable */
    const message = result.state === 1 ? '已成功！' : result.state === 0 ? '请注意！' : '出错了！';
    const type = result.state === 1 ? 'success' : result.state === 0 ? 'warn' : 'error';
    notification[type]({
      duration: null,
      message,
      description: (
        <React.Fragment>
          <div>{result.message}</div>
          <a onClick={this.jumpToAuthorize} href="javascript:;">
            {result.state === 1 ? '更换授权' : '绑定授权'}
          </a>
        </React.Fragment>
      ),
    });
  };

  showAuthorizeModal = () => {
    Modal.warning({
      // centered: true,
      title: '请先绑定多多进宝',
      content: '',
      okText: '前往授权',
      onOk: () => {
        this.jumpToAuthorize();
      },
    });
  };

  jumpToAuthorize = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'pid/jumpToAuthorize',
      payload: {
        redirect_uri: encodeURIComponent(window.location.href),
      },
    }).then(res => {
      if (res.status === 'ok') {
        window.open(res.payload.open_url);
      }
    });
  };

  bindPid = record => {
    const {
      pid: { state },
      dispatch,
    } = this.props;
    if (state.state === 0) {
      this.showAuthorizeModal();
    } else {
      dispatch({
        type: 'pid/bindPid',
        payload: {
          type: record.type,
        },
      }).then(() => {
        this.queryPidTaskList();
      });
    }
  };

  render() {
    const {
      pid: { list },
    } = this.props;
    console.log(list, 'list -> ');
    const columns = [
      {
        title: 'pid用途',
        dataIndex: 'name',
        width: 300,
        key: 'name',
      },
      {
        title: '选用pid',
        dataIndex: 'p_id',
        width: 300,
        key: 'age',
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        render: (text, record) => (
          /* eslint-disable */
          <span>
            {record.p_id ? (
              '已添加'
            ) : (
              <a onClick={this.bindPid.bind(this, record)} href="javascript:;">
                一键添加pid
              </a>
            )}
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="pid配置" content=" ">
        <Table
          style={{ background: '#fff' }}
          columns={columns}
          dataSource={list}
          pagination={false}
          bordered
        />
      </PageHeaderWrapper>
    );
  }
}

export default Pid;
