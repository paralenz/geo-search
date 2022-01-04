import { testApiKey, testCustomConfig, testDefaultConfig, testUrls } from './spec-helper/config.spec-helper'
import { useGeoSearch } from '../useGeoSearch'

describe('useGeoSearch', () => {
  testApiKey(useGeoSearch('123456'))
  testDefaultConfig(useGeoSearch('123456'))
  testCustomConfig(useGeoSearch('123456', { language: 'da' }), { language: 'da' })

  testUrls(useGeoSearch('123456'))
})
