import { GeoSearch } from '../GeoSearch'
import { testApiKey, testCustomConfig, testDefaultConfig } from './__helpers__/config.spec-helper'

const instance = new GeoSearch('123456')



describe('GeoSearch', () => {
  testApiKey(instance)

  testDefaultConfig(instance)

  testCustomConfig(new GeoSearch('123456', { language: 'da' }), { language: 'da' })

  describe('autoComplete', () => {
    it('should throw an error if `input` is not provided', () => {
      instance.autoComplete('')
        .catch(err => expect(err.message).toEqual('Missing input'))
    })

    it.todo('should invoke this.fetch')

    it.todo('should invoke `this.formatAutoCompleteResponse`')
  })

  describe('place', () => {
    it.todo('should throw an error if `placeId` is not provided')

    it.todo('should call the correct url')

    it.todo('should return an object with `longitude, latitude, latitudeDelta, longitudeDelta`',)
  })

  describe('coodrinates', () => {
    it('should return coordinates for Amalienborg', () => {
      const geometry = {
        location: { lat: 55.6840588, lng: 12.5930201 },
        viewport: {
            northeast: { lat: 55.6854331, lng: 12.5961361 },
            southwest: { lat: 55.68239509999999, lng: 12.5902225 }
        }
      }
      const expected = {
        latitude: 55.6840588,
        longitude: 12.5930201,
        latitudeDelta: 0.0030380000000107543,
        longitudeDelta: 0.005913600000001296
      }
      expect(instance.coordinates(geometry)).toEqual(expected)
    });

    it('should return coordinates for Russley Golf Club and Function Centre in New Zealand', () => {
      const geometry = {
        location: { lat: -43.495388, lng: 172.5560607 },
        viewport: {
          northeast: {
            lat: -43.4943529197085,
            lng: 172.5571392802915
        },
        southwest: {
            lat: -43.4970508802915,
            lng: 172.5544413197085
        }
        }
      }
      const expected =   {
        latitude: -43.495388,
        longitude: 172.5560607,
        latitudeDelta: 0.00269796058300642,
        longitudeDelta: 0.0026979605829922093
      }
    
      expect(instance.coordinates(geometry)).toEqual(expected)
    });
    
    it('should return coordinates for Lucaya Beach on Grand Bahama', () => {
      const geometry = {
        location: {
            lat: 26.5095771,
            lng: -78.6417355
        },
        viewport: {
            northeast: {
                lat: 26.51310155302695,
                lng: -78.63598467128065
            },
            southwest: {
                lat: 26.5041461387956,
                lng: -78.6479901551412
            }
        }
    }
      const expected =   {
        latitude: 26.5095771,
        latitudeDelta: 0.008955414231348158,
        longitude: -78.6417355,
        longitudeDelta: 0.012005483860548338,
      }
    
      expect(instance.coordinates(geometry)).toEqual(expected)
    });
  });

  describe('calculateDeltas', () => {
    it('should return correct delta values', () => {
      const viewport = {
        northeast: { lat: 55.6854331, lng: 12.5961361 },
        southwest: { lat: 55.68239509999999, lng: 12.5902225 }
      }
      const expected = {
        latitudeDelta: 0.0030380000000107543,
        longitudeDelta: 0.005913600000001296
      }
      expect(instance.calculateDeltas(viewport)).toEqual(expected)
    })
  })

  describe('deltaCompensation', () => {
    it('should return 360', () => {
      expect(instance.deltaCompensation({
        southwest: { lat: 0, lng: 55 },
        northeast: { lat: 0, lng: 12 },
      })).toEqual(360)      
    });
    
    it('should return 0', () => {
      expect(instance.deltaCompensation({
        northeast: { lat: 0, lng: 55 },
        southwest: { lat: 0, lng: 12 },
      })).toEqual(0)
    });
  });

  describe('fetch', () => {
    it('should be defined', () => {
      expect(instance.fetch).toBeDefined()
    })

    it.todo('should call the correct url')

    it.todo('should throw an Error if status is not `OK`')

    it.todo('should return the response in JSON format')
  })

  describe('formatAutoCompleteResponse', () => {
    const responses = instance.formatAutoCompleteResponse([
      {
      place_id: 'p-1',
      structured_formatting: {
        main_text: 'Main Text 1',
        secondary_text: 'Secondary Text 1'
      }
    },
    {
      place_id: 'p-2',
      structured_formatting: {
        main_text: 'Main Text 2',
        secondary_text: 'Secondary Text 2'
      }
    }
  ])
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
