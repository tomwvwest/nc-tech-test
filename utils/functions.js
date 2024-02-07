exports.convertToCorrectSizeFormat = (arr) => {
  if(!Array.isArray(arr)) return [];

  return arr.map(abbreviation => {
    let title = 'Small';
    if(abbreviation === 'md') title = 'Medium'
    else if(abbreviation === 'lg') title = 'Large'
    else if(abbreviation === 'gt') title = 'Giant'

    return {
      id : abbreviation,
      title 
    }
  })
}

exports.convertNumToCardId = (num) => {
  if(isNaN(num)) return 'Error - not a number';
  if(num > 999) return 'Error - invalid number';

  const numString = num.toString()
  if(numString.length === 1) return 'card00' + numString
  if(numString.length === 2) return 'card0' + numString
  if(numString.length === 3) return 'card' + numString
}