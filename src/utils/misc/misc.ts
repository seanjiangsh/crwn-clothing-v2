export const getImageUrl = (catetoryTitle: string, itemId: string) => {
  const title = catetoryTitle.toLowerCase();
  return `/assets/images/${title}/${itemId}.png`;
};
