import { testApiKey, testCustomConfig, testDefaultConfig } from './__helpers__/config.spec-helper'
import { useGeoSearch } from '../useGeoSearch'

describe('useGeoSearch', () => {
  testApiKey(useGeoSearch('123456'))
  testDefaultConfig(useGeoSearch('123456'))
  testCustomConfig(useGeoSearch('123456', { language: 'da' }), { language: 'da' })
})
