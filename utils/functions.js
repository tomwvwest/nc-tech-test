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