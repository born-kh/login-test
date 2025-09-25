import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Alert, Card, Form, Space, Typography } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { mockLogin } from '../services/mockAuth.js'
import LogoSymbol from '../components/LogoSymbol.jsx'
import { UiButton, UiInput, UiPassword } from '../components/UiControls.jsx'
import ScreenSubtitle from '../components/ScreenSubtitle.jsx'

const { Text, Title } = Typography

export default function LoginPage() {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: mockLogin,
    onSuccess: (result, variables) => {
      if (result.next === '2fa') {
        navigate('/2fa', { state: { email: variables.email } })
      } else if (result.next === 'success') {
        navigate('/success')
      }
    },
  })

  return (
    <div className="centered-page">
      <Card className="auth-card">
        <div className="brand">
          <LogoSymbol size={24} />
          Company
        </div>
        <Title level={3} className="screen-title">Sign in to your account to continue</Title>

        <Form
          layout="vertical"
          onFinish={(values) => loginMutation.mutate(values)}
          disabled={loginMutation.isPending}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Email is not valid' },
            ]}
            style={{marginBottom: 16}}
          >
            <UiInput prefix={<MailOutlined />} placeholder="Email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            style={{marginBottom: 16}}
          >
            <UiPassword prefix={<LockOutlined />} placeholder="Password" autoComplete="current-password" />
          </Form.Item>

          <Space direction="vertical" style={{ width: '100%' }} size={12}>
            {loginMutation.isError && (
              <Alert type="error" showIcon message={loginMutation.error.title} description={loginMutation.error.message} />
            )}
            <UiButton type="primary" htmlType="submit" block loading={loginMutation.isPending}>
              Log in
            </UiButton>
          </Space>
        </Form>

        {loginMutation.data?.debug && (
          <Text type="secondary" style={{ display: 'block', marginTop: 12 }}>{loginMutation.data.debug}</Text>
        )}
      </Card>
    </div>
  )
}


