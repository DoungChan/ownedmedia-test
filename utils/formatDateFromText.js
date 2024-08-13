
export function formatDateFromText(text) {
    // Extract the date part before '•'
    const datePart = text.split(' •')[0];
    
    // Create a Date object from the extracted date part
    const date = new Date(datePart);
  
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
  