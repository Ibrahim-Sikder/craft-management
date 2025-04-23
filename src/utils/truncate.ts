const truncateText = (text: string | undefined | null, limit: number): string => {
    if (!text || typeof text !== "string") {
      return ""; // Return an empty string if text is null, undefined, or not a string
    }
  
    if (text.length <= limit) {
      return text; // No need to truncate
    }
  
    // Split the text into words
    const words = text.split(" ");
    let truncatedText = "";
    let currentLineLength = 0;
  
    for (const word of words) {
      // Check if adding the word exceeds the limit
      if (currentLineLength + word.length + 1 > limit) {
        // End the line with ellipsis if it's the first truncation
        if (truncatedText) truncatedText += "...";
        break;
      }
      // Add the word to the line
      if (currentLineLength > 0) {
        truncatedText += " ";
        currentLineLength += 1;
      }
      truncatedText += word;
      currentLineLength += word.length;
    }
  
    return truncatedText;
  };
  
  export default truncateText;
  