import { DEFAULT_CONFIG, OK } from './constants'

describe('constants', () => {
  describe('OK', () => {
    it('should be 200', () => {
      expect(OK).toBe(200)
    })
  })
  describe('DEFAULT_CONFIG', () => {
    it('should have english as default language', () => {
      expect(DEFAULT_CONFIG.language).toBe('en')
    })
  })
})
