import { Input, Button, theme } from 'antd'

export function UiInput(props) {
  const { token } = theme.useToken()
  return (
    <Input
      {...props}
      style={{
        height: 40,
        fontFamily: token.fontFamily,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG,
        ...props.style,
      }}
    />
  )
}

export function UiPassword(props) {
  const { token } = theme.useToken()
  return (
    <Input.Password
      {...props}
      style={{
        height: 40,
        fontFamily: token.fontFamily,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG,
        ...props.style,
      }}
    />
  )
}

export function UiButton(props) {
  const { token } = theme.useToken()
  return (
    <Button
      {...props}
      style={{
        height: 40,
        fontFamily: token.fontFamily,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG,
        ...props.style,
      }}
    />
  )
}


