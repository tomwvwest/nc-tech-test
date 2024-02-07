const { convertToCorrectSizeFormat, convertNumToCardId } = require("../../utils/functions")

describe('convertToCorrectSizeFormat', () => {
  test('returns empty array when passed anything other than an array', () => {
    expect(convertToCorrectSizeFormat('')).toEqual([])
    expect(convertToCorrectSizeFormat({})).toEqual([])
    expect(convertToCorrectSizeFormat(500)).toEqual([])
  })
  test('returns correct array when passed array of suitable size ids', () => {
    expect(convertToCorrectSizeFormat(['sm'])).toEqual([{
      "id": "sm",
      "title": "Small"
    }])
    expect(convertToCorrectSizeFormat(['md', 'lg'])).toEqual([{
      "id": "md",
      "title": "Medium"
    },{
      "id": "lg",
      "title": "Large"
    }])
    expect(convertToCorrectSizeFormat(['sm', 'md', 'lg', 'gt'])).toEqual([ {
      "id": "sm",
      "title": "Small"
    },
    {
      "id": "md",
      "title": "Medium"
    },
    {
      "id": "lg",
      "title": "Large"
    },
    {
      "id": "gt",
      "title": "Giant"
    }])
  })
})

describe('convertNumToCardId', () => {
  test('if passed a non-number, return "Error - not a number"', () => {
    expect(convertNumToCardId('test')).toBe('Error - not a number')
  })
  test('if number is over 999, return "Error - invalid number"', () => {
    expect(convertNumToCardId(1000)).toBe('Error - invalid number')
  })
  test('if number is under 999, return correct cardId', () => {
    expect(convertNumToCardId(1)).toBe('card001')
    expect(convertNumToCardId(10)).toBe('card010')
    expect(convertNumToCardId(100)).toBe('card100')
  })
})