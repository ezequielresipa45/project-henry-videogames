// validaciones.js

export function validateInputName(inputName) {
    if (inputName.length < 3 || inputName.length > 30) {
      return false; 
    }
    return true;
  }


  export function validateInputDescription(inputDescription) {
    if (inputDescription.length < 5 || inputDescription.length > 200) {
      return false; 
    }
    return true;
  }

  export function isValidDate (dateStr){
    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!isValidFormat.test(dateStr)) {
      return false;
    }
  
    let year = Number(dateStr.substring(0, 4));
    let month = Number(dateStr.substring(5, 7) -1);
    let day = Number(dateStr.substring(8, 10));
  
    let date = new Date(year, month, day);
  
    if (date.getFullYear() === year && 
        date.getMonth() === month &&
        date.getDate() === day ) {
          return true;
        }
  
    return false;
  };


  export function isValidURL(urlString) {
    // Input check
    if (!urlString) return false;
  
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    if(regexp.test(urlString)) {
      // Tests if the end of the string is .jpg
      if (urlString.endsWith('.jpg')) {
          return true;
      }
      else return false;
    }
    else return false;
  }
  