const { convertToCorrectSizeFormat } = require("../../utils/functions")

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