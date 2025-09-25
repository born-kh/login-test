// Mocked authentication service 

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))



export async function mockLogin({ email, password }) {
  await sleep(800)

  if (Math.random() < 0.1) {
    throw Object.assign(new Error('Network request failed'), {
      title: 'Network error',
      message: 'Please check your connection and try again.',
    })
  }

  if (!email || !password) {
    const err = new Error('Validation error')
    err.title = 'Form validation failed'
    err.message = 'Email and password are required.'
    throw err
  }

  if (email.endsWith('@blocked.com')) {
    const err = new Error('Locked out')
    err.title = 'Account locked'
    err.message = 'Too many failed attempts. Try again later.'
    throw err
  }

  if (email.includes('2fa')) {
    return { next: '2fa', debug: 'Use code 131311 to pass' }
  }

  if (password !== 'password123') {
    const err = new Error('Invalid credentials')
    err.title = 'Invalid email or password'
    err.message = 'Double-check your credentials and try again.'
    throw err
  }

  return { next: 'success' }
}

export async function mockVerify2FA({ code }) {
  await sleep(700)

  if (Math.random() < 0.1) {
    throw Object.assign(new Error('Network request failed'), {
      title: 'Network error',
      message: 'Temporary connectivity issue. Please retry.',
    })
  }

  if (!code || code.length !== 6) {
    const err = new Error('Invalid code')
    err.title = 'Code is incomplete'
    err.message = 'Enter the 6-digit code.'
    throw err
  }

  if (code !== '131311') {
    const err = new Error('Wrong code')
    err.title = 'Incorrect code'
    err.message = 'The code you entered is not correct.'
    throw err
  }

  return { ok: true }
}

export async function mockResend2FA() {
  await sleep(500)
  if (Math.random() < 0.1) {
    const err = new Error('Could not send code')
    err.title = 'Send failed'
    err.message = 'Please try again in a few seconds.'
    throw err
  }
  return { ok: true, message: 'A new code has been generated.' }
}


