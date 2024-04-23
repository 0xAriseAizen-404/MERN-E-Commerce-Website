// Add a product to localStorage
export const addFavouriteToLocalStorage = (product) => {
  const favourites = getFavouritesFromLocalStorage();
  if (!favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
};
// Revmoe a product from localStorage
export const removeFavouriteFromLocalStorage = (productId) => {
  const favourites = getFavouritesFromLocalStorage();
  const updatedFavourites = favourites.filter((p) => p._id !== productId);
  localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
};
// Retrieve a product from localStorage
export const getFavouritesFromLocalStorage = () => {
  const favouritesJSON = localStorage.getItem("favourites");
  return favouritesJSON ? JSON.parse(favouritesJSON) : [];
};
