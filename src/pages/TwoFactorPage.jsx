import { ArrowLeftOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Input, Space, Typography } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { mockVerify2FA, mockResend2FA } from '../services/mockAuth.js'
import { useEffect, useRef, useState } from 'react'
import LogoSymbol from '../components/LogoSymbol.jsx'
import ScreenSubtitle from '../components/ScreenSubtitle.jsx'
import { UiButton } from '../components/UiControls.jsx'

const { Title, Text } = Typography

export default function TwoFactorPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputsRef = useRef([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const mutation = useMutation({
    mutationFn: ({ code }) => mockVerify2FA({ code, email: state?.email }),
    onSuccess: () => navigate('/success'),
  })
  const resendMutation = useMutation({ mutationFn: mockResend2FA })

  const [seconds, setSeconds] = useState(45)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const codeValue = code.join('')
  const isComplete = codeValue.length === 6

  const onChangeDigit = (index, value) => {
    const sanitized = value.replace(/\D/g, '').slice(0, 1)
    const next = [...code]
    next[index] = sanitized
    setCode(next)

    if (mutation.isError) mutation.reset()
    if (sanitized && index < 5) inputsRef.current[index + 1]?.focus()
  }

  const onKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const next = [...code]
      next[index - 1] = ''
      setCode(next)
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="centered-page">
      <Card className="auth-card">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', left: 32, top: 32 }}
        />

        <div className="brand">
          <LogoSymbol size={24} />
          Company
        </div>

        <Title level={3} className="screen-title">Two-Factor Authentication</Title>
        <ScreenSubtitle>Enter the 6-digit code from the Google Authenticator app</ScreenSubtitle>

        <div className="otp-inputs">
          {code.map((digit, index) => (
            <div className="otp-box" key={`digit_${index}`}>
              <Input
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit}
                onChange={(e) => onChangeDigit(index, e.target.value)}
                onKeyDown={(e) => onKeyDown(index, e)}
                inputMode="numeric"
                maxLength={1}
                status={mutation.isError ? 'error' : ''}
              />
            </div>
          ))}
        </div>

        {mutation.isError && (
          <Text type="danger" style={{ marginTop: 4, display: 'block' }}>
            {mutation.error.title || 'Invalid code'}
          </Text>
        )}

        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          {mutation.isError && (
            <Alert type="error" showIcon message={mutation.error.title} description={mutation.error.message} />
          )}

          {isComplete ? (
            <UiButton
              type="primary"
              block
              loading={mutation.isPending}
              onClick={() => mutation.mutate({ code: codeValue })}
            >
              Continue
            </UiButton>
          ) : (
            <Text style={{ textAlign: 'center' }}>
              {seconds > 0 ? (
                <>Get a new code in 00:{String(seconds).padStart(2, '0')}</>
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    setSeconds(45)
                    resendMutation.mutate()
                  }}
                  loading={resendMutation.isPending}
                >
                  Get a new code
                </Button>
              )}
            </Text>
          )}

          {resendMutation.isError && (
            <Alert type="error" showIcon message={resendMutation.error.title} description={resendMutation.error.message} />
          )}
        </Space>
      </Card>
    </div>
  )
}


