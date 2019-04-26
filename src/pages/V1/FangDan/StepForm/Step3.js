import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Input, DatePicker, message, Alert, Empty, Table, Form } from 'antd';
import router from 'umi/router';
import moment from 'moment';
// import styles from './style.less';

const dateFormat = 'YYYY-MM-DD';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: true,
  };

  /* eslint-disable */
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const event = e.target;
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values, event });
    });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, index, handleSave, ...restProps } = this.props;

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `请输入推广数量`,
                      },
                    ],
                    //   const num = this.schedulesHash[key] || '';
                    initialValue: record[dataIndex] || '',
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                      placeholder="请输入数量"
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

@connect(({ form, loading }) => ({
  taskId: form.taskId,
  schedules: form.schedules,
  startTime: form.startTime,
  endTime: form.endTime,
  goodsDetail: form.goodsDetail,
  submitting: loading.effects['form/publishTask'],
}))
class Step3 extends React.PureComponent {
  state = {};

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '推广排期',
        dataIndex: 'day',
        width: '40%',
      },
      {
        title: '投放数量',
        dataIndex: 'amount',
        editable: true,
      },
    ];
  }

  // 推广日期改变时
  rangePicker = (date, dateString) => {
    // const startDate = date && date[0];
    const endDate = date && date[1];
    const startTime = dateString[0];
    const endTime = dateString[1];
    const sdate = moment(startTime);
    const { schedules } = this.props;
    if (endDate > sdate.add(7, 'days')) {
      message.warning('最多选择7天进行排期');
      return;
    }
    // 将日期数据放进表格
    this.startTimeTemp = startTime;
    this.endTimeTemp = endTime;
    const minDate = moment(startTime);
    const maxDate = moment(endTime);
    let { index } = this.state;
    const data = [];
    while (minDate <= maxDate) {
      data.push({
        key: index,
        day: minDate.format(dateFormat),
        amount: '请输入数量',
      });
      minDate.add(1, 'days');
      /* eslint-disable */
      this.setState({
        index: index++,
      });
    }
    this.setState({ schedules: data });
    if (!this.startTimeTemp) {
      message.warning('请先选择合适的推广日期');
      return;
    }
    this.makeScheduleData(this.startTimeTemp, this.endTimeTemp);
  };

  // 一键排期
  // toSchedule = () => {
  //   if (!this.startTimeTemp) {
  //     message.warning('请先选择合适的推广日期');
  //     return;
  //   }
  //   this.makeScheduleData(this.startTimeTemp, this.endTimeTemp);
  // };

  makeScheduleData = (startTime, endTime) => {
    const { dispatch, schedules } = this.props;
    this.schedulesHash = this.schedulesHash || {};

    if (startTime) {
      this.startTimeTemp = startTime;
      this.endTimeTemp = endTime;
    }

    for (let i = 0; i < schedules.length; i += 1) {
      const item = schedules[i];
      this.schedulesHash[item.day] = item.amount;
    }
    let index = 1;
    const arr = [];
    const a = moment(startTime);
    const b = moment(endTime);
    const obj = {};
    while (b >= a) {
      // key开始时间
      const key = a.format(dateFormat);
      if (!this.schedulesHash[key]) {
        this.schedulesHash[key] = '';
      }
      const value = this.schedulesHash[key];
      obj[key] = value;
      arr.push({
        key: index,
        day: key,
        amount: value,
      });
      a.add(1, 'days');
      /* eslint-disable */
      this.setState({
        index: index++,
      });
    }
    // 数据值更新
    this.schedulesHash = obj;
    dispatch({
      type: 'form/setScheduleTime',
      payload: {
        startTime,
        endTime,
        schedules: arr,
      },
    });
  };

  // planNumChange = (e, date) => {
  //   const { schedules, dispatch, startTime, endTime } = this.props;
  //   const { value } = e.target;
  //   console.log('planNumChange==>value',value);
  //   // 数据没改变
  //   if (this.schedulesHash[date] === value || /[^\d]/gi.test(value)) {
  //     return;
  //   }
  //   const schedule = schedules.find(item => {
  //     return item.day === date;
  //   });
  //   schedule.amount = value;
  //   this.schedulesHash[date] = value;
  //   dispatch({
  //     type: 'form/setScheduleTime',
  //     payload: {
  //       startTime,
  //       endTime,
  //       schedules,
  //     },
  //   });
  // };

  onValidateForm = () => {
    let valid = true;
    let isLtZero = false;
    const arr = Object.keys(this.schedulesHash);
    for (let i = 0; i < arr.length; i += 1) {
      const key = arr[i];
      const value = this.schedulesHash[key];
      if (!value) {
        valid = false;
        break;
      } else if (value < 1) {
        isLtZero = true;
      }
    }
    // console.log(arr, valid, this.props);
    if (!this.startTimeTemp || arr.length < 1) {
      message.error('请先选择推广日期进行排期');
      return;
    }
    if (isLtZero) {
      message.error('你填写的投放数量必须 > 0');
      return;
    }
    if (!valid) {
      message.error('你还有投放数量没有填写完成哦～');
      return;
    }
    const { dispatch, goodsDetail, startTime, endTime, schedules, taskId } = this.props;
    dispatch({
      type: 'form/publishTask',
      payload: {
        title: goodsDetail.title,
        goods_id: goodsDetail.goods_id,
        category_id: goodsDetail.category_id,
        images: goodsDetail.detailImgRecordUrl,
        start_time: startTime,
        end_time: endTime,
        plan_info: schedules,
        task_id: taskId,
      },
    });
    // router.push('/fangdan/step-form/pay');
  };

  componentWillMount = () => {
    console.log('componentWillMount -> ', this.props);
    const { startTime, endTime } = this.props;
    this.makeScheduleData(startTime, endTime);
  };

  /* eslint-desable */
  handleSave = row => {
    const { schedules, dispatch, startTime, endTime } = this.props;
    const { event } = row;
    const newData = [...schedules];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ schedules: newData });

    const { value } = event;
    const date = item.day;
    // 数据没改变
    if (this.schedulesHash[date] === value || /[^\d]/gi.test(value)) {
      return;
    }
    const schedule = schedules.find(item => {
      return item.day === date;
    });
    schedule.amount = value;
    this.schedulesHash[date] = value;
    dispatch({
      type: 'form/setScheduleTime',
      payload: {
        startTime,
        endTime,
        schedules,
      },
    });
  };
  render() {
    const { schedules } = this.props;
    const { submitting, startTime, endTime } = this.props;
    const startDate = startTime && moment(startTime);
    const endDate = endTime && moment(endTime);
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    // const validRange = [startDate, endDate];
    // console.log('render', this.props);

    // const dateFullCellRender = m => {
    //   const date = m.date();
    //   if (m > endDate || m < startDate) {
    //     return '';
    //   }
    //   const key = m.format(dateFormat);
    //   const num = this.schedulesHash[key] || '';

    //   return (
    //     <div style={{ padding: '10px' }}>
    //       <div style={{ borderTop: '1px solid #e8e8e8', textAlign: 'right' }}>
    //         <div>{date}</div>
    //         <div style={{ textAlign: 'left', marginTop: '20px' }}>投放数量：</div>
    //         <Row>
    //           <Col span={24}>
    //             <Input
    //               type="number"
    //               min={1}
    //               value={num}
    //               className="col-16"
    //               placeholder="请输入"
    //               size="small"
    //               addonAfter="份"
    //               onChange={e => {
    //                 this.planNumChange(e, key);
    //               }}
    //             />
    //           </Col>
    //         </Row>
    //       </div>
    //     </div>
    //   );
    // };
    const disabledDate = date => {
      const now = moment().add(-1, 'days');
      if (date < now) {
        return true;
      }
      return false;
    };
    const description = (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        1、想权重大，单量一定要设计为稳定增长趋势（递增）。
        <br />
        2、建议投放周期为3~7天 <br />
        注意：请记住上面的两个重点，让自己的店铺快速提升转化率和人气销量。
      </div>
    );

    const onPrev = () => {
      router.push('/fangdan/step-form/confirm');
    };
    this.planSum = 0;
    const countPlanSum = () => {
      const arr = Object.keys(this.schedulesHash);
      for (let i = 0; i < arr.length; i += 1) {
        const key = arr[i];
        const value = this.schedulesHash[key] || 0;
        this.planSum += parseInt(value, 10);
      }
      return this.planSum;
    };

    return (
      <Fragment>
        <Alert
          style={{ marginTop: '30px' }}
          message="温馨提示"
          description={description}
          type="info"
          showIcon
        />
        <Row gutter={0} style={{ marginTop: '30px' }}>
          <Col span={2}>推广日期：</Col>
          <Col span={6}>
            <DatePicker.RangePicker
              defaultValue={startDate ? [startDate, endDate] : []}
              disabledDate={disabledDate}
              onChange={this.rangePicker}
            />
          </Col>
          {/* <Col offset={8}>
            <Button onClick={this.toSchedule} type="primary">
              一键排期
            </Button>
          </Col> */}
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={6} style={{ marginBottom: 10 }}>
            推广数量：{countPlanSum()}
          </Col>
        </Row>

        {startDate ? (
          // <Calendar
          //   className={styles.calendarCdk}
          //   value={startDate}
          //   validRange={validRange}
          //   dateFullCellRender={dateFullCellRender}
          // />
          <Table
            components={components}
            bordered
            dataSource={schedules}
            columns={columns}
            pagination={false}
          />
        ) : (
          <Empty style={{ margin: '20px auto 120px' }} description="请选择推广日期后进行一键排期" />
        )}
        <Row style={{ margin: '20px auto 50px' }}>
          <Col push={11}>
            <Button
              type="primary"
              size="default"
              onClick={this.onValidateForm}
              loading={submitting}
            >
              下一步
            </Button>
            <Button onClick={onPrev} size="default" style={{ marginLeft: 8 }}>
              上一步
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Step3;
