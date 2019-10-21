import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Row, Button, notification } from 'antd';
import Card from '@components/Card'

function ForgotPassword({ form, sendForgottonPasswordMail, forgotPasswordEmailSent}){
  const { getFieldDecorator } = form
  const [ notificationSent, setNotificationSent ] = useState(false)

  const openNotification = (title, icon) => {
    notification.open({
      message: title,
      icon,
    });
  };

  //If the email responsable for resetting email has been sent, show notification
  if(forgotPasswordEmailSent === true && notificationSent === false ){
    openNotification('Återställnings-email skickat!', <Icon type="check-circle" style={{ color: 'green' }} />)
    setNotificationSent(true)
  }

  return(
    <Row
      type="flex"
      justify="center"
    >
      <Card
        style={{
          marginTop: 24,
          width: "100%",
          maxWidth: 400,
        }}
        title="Återställ lösenord"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            form.validateFieldsAndScroll((err, values) => {
              if (!err) {
                sendForgottonPasswordMail({
                  email: values.email,
                })
              }
            })
          }}
        >
          <p style={{marginTop: -8, marginBottom: 30}}>
            Ange in din email nedanför så skickar vi ett mail till dig som du kan återställa ditt lösenord med! <span role="img" aria-label="smile">😊</span>
          </p>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: "Ange ditt email."
              }]
            })(
              <Input
                placeholder={"Email"}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            )}
          </Form.Item>

          <Form.Item style={{marginBottom: 0}}>
            <Button
            style={{width: '100%'}}
            type="primary"
            htmlType="submit">
              Skicka
            </Button>
          </Form.Item>
          <Link to="/logga-in" style={{fontSize: 12, marginTop: 4}}>
            Tillbaka till inloggning
          </Link>
        </Form>
      </Card>
    </Row>
  )
}

export default Form.create()(ForgotPassword)
