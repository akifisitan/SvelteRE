// Function to add arbitrary delay for testing slow connections
export const delay = async (seconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
