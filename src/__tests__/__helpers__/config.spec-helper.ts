import { ApiKey, GeoSearchConfig } from '../../index'
import { DEFAULT_CONFIG } from '../../constants'

export const testApiKey = (instance: {apiKey: ApiKey}) => {
  it('[apiKey]: should define this.apiKey', () => {
    expect(instance.apiKey).toBeDefined()
  })
}

export const testDefaultConfig = (instance: {apiKey: ApiKey, config: GeoSearchConfig}) => {
  it('[config]: should define this.config', () => {
    expect(instance.config).toBeDefined()
  })
  it('[config]: should set the default config', () => {
    expect(instance.config).toEqual(DEFAULT_CONFIG)
  })
}

export const testCustomConfig = (instance: {apiKey: ApiKey, config: GeoSearchConfig}, config: GeoSearchConfig) => {
  it('[custom]: should define this.config', () => {
    expect(instance.config).toBeDefined()
  })
  it('[custom]: should set the default config', () => {
    expect(instance.config).toEqual(config)
  })
}
