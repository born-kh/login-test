import { Typography, theme } from 'antd'

export default function ScreenSubtitle({ children }) {
  const { token } = theme.useToken()
  return (
    <Typography.Text
      style={{
        display: 'block',
        textAlign: 'center',
        color: '#6b7280',
        fontWeight: 400,
        fontFamily: token.fontFamily,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG,
      }}
    >
      {children}
    </Typography.Text>
  )
}


