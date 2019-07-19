import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import { Table, Card, Row, Col, Input, Button, Form, Select, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Plan.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

let params = {
  page: 1, // 翻页参数
  task_id: 0, // 推广编号
  sh_id: 0,
  goods_id: 0, // 商品id
  state: -1,
  type: 30, // 推广类型 30-收藏商品 31-收藏店铺
};

@connect(({ promotion, loading }) => ({
  collectData: promotion.collectData,
  loading: loading.effects['promotion/collectData'],
}))
@Form.create()
class Collect extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        dataIndex: 'nick_name',
        key: 'nick_name',
        title: '用户昵称',
        width: 90,
      },
      {
        key: 'task_id',
        dataIndex: 'task_id',
        title: '推广编号',
        width: 120,
      },
      {
        key: 'sh_name',
        dataIndex: 'sh_name',
        title: '商户名称',
        width: 120,
      },
      {
        title: '商品',
        width: 143,
        render: val => {
          return (
            <a
              className={styles.pro}
              href={val.goods_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.title}</span>
            </a>
          );
        },
      },
      {
        title: '上传时间',
        dataIndex: 'proof_time',
        key: 'proof_time',
        width: 160,
      },
    ];
  }

  componentDidMount() {
    params.type = 30;
    this.getListData(params);
  }

  // 接口
  getListData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/collectData',
      payload: params,
    });
  };

  // 查询
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      params.page = 1;
      params.task_id = values.task_id || 0;
      params.sh_id = values.sh_id || 0;
      params.goods_id = values.goods_id || 0;
      params.state = values.state || -1;
      this.getListData(params);
    });
  };

  // 重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    params.page = 1;
    params.sh_id = 0;
    params.task_id = 0;
    params.goods_id = 0;
    params.state = -1;
    this.getListData(params);
  };

  onChange = page => {
    params.page = page;
    this.getListData(params);
  };

  radioGroupOnChange = e => {
    params.type = e.target.value;
    params = {
      page: 1,
      task_id: 0,
      goods_id: 0,
      state: -1,
      type: e.target.value,
    };
    this.getListData(params);
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { collectData } = this.props;
    const stateSelect = collectData.state_select;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="推广编号">
              {getFieldDecorator('task_id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          {params.type === '31' ? (
            <Col md={5} sm={24}>
              <FormItem label="店铺id">
                {getFieldDecorator('sh_id')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          ) : (
            <Col md={5} sm={24}>
              <FormItem label="商品id ">
                {getFieldDecorator('goods_id')(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          )}
          <Col md={5} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('state')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="全部"
                  onChange={this.selectTypeChange}
                >
                  {stateSelect.length &&
                    stateSelect.map(e => (
                      <Option key={e.value} value={e.value}>
                        {e.name}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    // 表格数据
    const { collectData } = this.props;
    let { columns } = this;
    const dpColumns = [
      {
        title: '用户昵称',
        dataIndex: 'nick_name',
        key: 'nick_name',
        width: 90,
      },
      {
        title: '推广编号',
        dataIndex: 'task_id',
        key: 'task_id',
        width: 90,
      },
      {
        key: 'goods_id',
        title: '店铺编号',
        width: 120,
        dataIndex: 'goods_id',
      },
      {
        title: '店铺',
        width: 143,
        render: val => {
          return (
            <a
              className={styles.pro}
              href={val.goods_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={val.img} alt="a" style={{ width: 50, heigth: 50, marginRight: 5 }} />
              <span className={styles.goodsName}> {val.title}</span>
            </a>
          );
        },
      },
      {
        title: '上传时间',
        dataIndex: 'proof_time',
        key: 'proof_time',
        width: 160,
      },
    ];

    if (params.type === '31') {
      columns = dpColumns;
    }
    const content = <div />;
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup onChange={this.radioGroupOnChange} defaultValue="30">
          <RadioButton value="30">商品收藏</RadioButton>
          <RadioButton value="31">店铺收藏</RadioButton>
        </RadioGroup>
      </div>
    );

    return (
      <PageHeaderWrapper title="收藏列表" content={content}>
        <div className={styles.standardList}>
          <Card className={styles.customStyleCard} extra={extraContent}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                rowKey={item => item.id}
                columns={columns}
                dataSource={collectData.list}
                pagination={{
                  defaultCurrent: 1,
                  current: collectData.page_info.current_page,
                  pageSize: collectData.page_info.per_page,
                  total: collectData.page_info.total_num,
                  onChange: this.onChange,
                }}
              />
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Collect;
