type Config = {
  env: string;
  isProd: boolean,
  production: {
    api_endpoint: string
  },
  staging: {
    api_endpoint: string
  },
  development: {
    api_endpoint: string
  }
}

const config: Config = {
  env: "production",
  isProd: process.env.NODE_ENV === "production" || false,
  production: {
    api_endpoint: 'https://newsapi.org/v2/top-headlines'
  },
  staging: {
    api_endpoint: "https://newsapi.org/v2/top-headlines"
  },
  development: {
    api_endpoint: ''
  }
}

export default config;
