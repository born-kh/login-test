import { Button, Card, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function SuccessPage() {
  const navigate = useNavigate()
  return (
    <div className="centered-page">
      <Card className="auth-card">
        <Result
          status="success"
          title="You're in!"
          subTitle="Authentication flow completed successfully."
          extra={<Button type="primary" onClick={() => navigate('/login')}>Log out</Button>}
        />
      </Card>
    </div>
  )
}


