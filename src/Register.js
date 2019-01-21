import React from 'react'
import {
  Form, Input, InputNumber, InputGroup, Row, Col, Checkbox, Button
} from 'antd';
import { connect } from 'react-redux'
import { Auth } from './actions'
import Address from './Address.js'

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log({username: values.email, password: values.password})
        this.props.login({username: values.email, password: values.password})
      }
    });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  validatePersonnummer = (rule, value, callback) => {
    if(value > Math.pow(10,11)) {
      let sum = ''
      for(let i = 2; i < (value + '').length - 1; i++) {
        let b = (i % 2) ? 1 : 2
        sum += b*((value + '')[i]) + ''
      }
      let a = 0
      for(var i = 0; i < sum.length; i++) a += parseInt(sum[i])
      let p = (10 - (a % 10)) % 10
      if(value % 10 !== p) {
        callback('Ogiltigt personnummer')
      } else callback()
    }
    callback('Ogiltigt personnummer')
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        // xs: { span: 7, offset: 1 },
        sm: { span: 7, offset: 0 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0,
        },
        sm: {
          span: 17,
          offset: 7,
        },
      },
    };

    return (
      <Row type="flex" justify="center"
      >
        <Col
          xs= {{
            span: 24,
          }}
          sm={{
            span: 20
          }}
          md={{
            span: 15
          }}
          lg={{
            span: 11
          }}
        >
          <Form
            className="register"
            style={{ padding: 30 }} onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Personnummer"
            >
              {getFieldDecorator('personnummer', {
                rules: [{
                  required: true, message: 'Please input your personnummer!',
                }, {
                  validator: this.validatePersonnummer,
                }],
              })(
                <InputNumber placeholder="YYYYMMDDXXXX" style={{width: '100%'}} type="personnummer" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              style={{width: '100%'}}
              label="Address"
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: 'Please input address!'
                }]
              })(<Address />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                rules: [{
                  required: true, message: 'Please accept the TOS'
                }]
              	}, {
                	valuePropName: 'checked',
              })(
                <Checkbox>I have read the <a href="/">agreement</a></Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(Auth.login(credentials))
    // createInstance: instance => dispatch(Instances.createInstance(instance))
  }
}

export default connect(null, mapDispatchToProps)(WrappedRegistrationForm)

// export default WrappedRegistrationForm