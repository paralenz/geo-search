import { CIRCOMFERENCE, DEFAULT_CONFIG, HTTP_STATUS_OK, ONE_DEFREE_OF_LATITUDE_IN_METERS } from '../constants'

describe('constants', () => {
  describe('HTTP_STATUS_OK', () => {
    it('should be 200', () => {
      expect(HTTP_STATUS_OK).toBe(200)
    })
  })
  describe('DEFAULT_CONFIG', () => {
    it('should have english as default language', () => {
      expect(DEFAULT_CONFIG.language).toBe('en')
    })
  })

  describe('CIRCOMFERENCE', () => {
    it('should be 40075', () => {
      expect(CIRCOMFERENCE).toEqual(40075)
    });
  });
  describe('ONE_DEFREE_OF_LATITUDE_IN_METERS', () => {
    it('should be 111320', () => {
      expect(ONE_DEFREE_OF_LATITUDE_IN_METERS).toEqual(111320)
    });
  });
})
