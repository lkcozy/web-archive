enum ConfigKey {
  shouldShowRecent = 'config/should_show_recent',
  aiTag = 'config/ai_tag',
}

interface AITagConfig {
  enable: boolean
  tagLanguage: 'en' | 'zh'
  apiUrl: string
  apiUrlPath: string
  apiKey: string
  model: string
}

export { ConfigKey, AITagConfig }
