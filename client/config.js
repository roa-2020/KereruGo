const environments = {
  development: '/api/v1',
  test: '/api/v1',
  production: '/api/v1',
  integration: '',
  deployment: '',
  build: ''
}

const env = process.env.NODE_ENV || 'development'

export const baseApiUrl = environments[env]
