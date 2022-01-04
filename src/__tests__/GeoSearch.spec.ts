import { GeoSearch } from '../GeoSearch'
import { testApiKey, testCustomConfig, testDefaultConfig, testUrls } from './__helpers__/config.spec-helper'

const instance = new GeoSearch('123456')

describe('GeoSearch', () => {
  testApiKey(instance)

  testDefaultConfig(instance)

  testCustomConfig(new GeoSearch('123456', { language: 'da' }), { language: 'da' })

  testUrls(instance)

  describe('autoComplete', () => {
    it('should throw an error if `input` is not provided', () => {
      instance.autoComplete('')
        .catch(err => expect(err.message).toEqual('Missing input'))
    })

    it.todo('should call the correct url')

    it.todo('should invoke `this.formatAutoCompleteResponse`')
  })

  describe('place', () => {
    it.todo('should throw an error if `placeId` is not provided')

    it.todo('should call the correct url')

    it.todo('should return an object with `longitude, latitude, latitudeDelta, longitudeDelta`',)
  })

  describe('calculateDeltas', () => {
    it.todo('should subtract viewport.ne.lat from viewport.sw.lat')

    it.todo('should subtract viewport.ne.lng from viewport.sw.lng')

    it.todo('should return an object with `longitudeDelta` and `latitudeDelta`')
  })

  describe('fetch', () => {
    it('should be defined', () => {
      expect(instance.fetch).toBeDefined()
    })

    it('should throw an error if this.apiKey is not defined', () => {
      instance.apiKey = undefined
      instance.fetch('no-url')
        .catch(err => expect(err.message).toEqual('Missing apiKey'))
    })

    it.todo('should call the correct url')

    it.todo('should throw an Error if status is not `OK`')

    it.todo('should return the response in JSON format')
  })

  describe('formatAutoCompleteResponse', () => {
    const responses = instance.formatAutoCompleteResponse([{
      place_id: 'p-1',
      structured_formatting: {
        main_text: 'Main Text 1',
        secondary_text: 'Secondary Text 1'
      }
    }, {
      place_id: 'p-2',
      structured_formatting: {
        main_text: 'Main Text 2',
        secondary_text: 'Secondary Text 2'
      }
    }])
    it('should transofrm prediction[0].structured_formatting.main_text to mainText', () => {
      expect(responses[0].mainText).toBeDefined()
      expect(responses[0].mainText).toBe('Main Text 1')
    })

    it('should transform prediction[0].structured_formatting.secondary_text to secondary_text', () => {
      expect(responses[0].secondaryText).toBeDefined()
      expect(responses[0].secondaryText).toBe('Secondary Text 1')
    })

    it('should transform prediction[0].place_id to placeId', () => {
      expect(responses[0].placeId).toBeDefined()
      expect(responses[0].placeId).toBe('p-1')
    })

    it('should return an array of responses', () => {
      expect(Array.isArray(responses)).toBe(true)
      expect(responses).toHaveLength(2)
    })
  })
})
