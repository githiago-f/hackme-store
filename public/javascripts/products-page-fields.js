const params = new URL(location.href).searchParams;
const sortByContainer = document.getElementById("sortByContainer"),
  orderContainer = document.getElementById("orderContainer"),
  searchField = document.getElementById('search');
if(params.has('product')) {
  searchField.value = params.get('product');
}
let showOtherFilters = false;
document.getElementById("toggle").onclick = function () {
  sortByContainer.hidden = showOtherFilters;
  orderContainer.hidden = showOtherFilters;
  showOtherFilters = !showOtherFilters;
};
