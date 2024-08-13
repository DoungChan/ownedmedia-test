// utils/formatDate.js

export function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    // Check if the date is valid
    if (isNaN(date)) {
      throw new Error('Invalid date format');
    }
  
    // Get the month and day
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Return the date in the desired format: M/D/YYYY
    return `${month}/${day}/${year}`;
  }
  