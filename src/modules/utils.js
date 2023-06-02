import axios from "axios";

function search(prods, term) {
    let filtered = prods.filter((prod) => {
        return prod.name.toLowerCase().includes(term.toLowerCase());
    });
    return filtered;
}

async function remove_filter(prods) {
  let originalProds = [];
  await axios
    .get("http://localhost:8080/GetAllProducts")
    .then((res) => {
      originalProds = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return originalProds;
}

function filter(prods, filterOps) {
  // the following code will check which properties are not null and will filter the products accordingly
  let filtered = prods;
  for (let key in filterOps) {
    if (filterOps[key] !== null && key !== "price") {
      filtered = filtered.filter((prod) => prod[key] === filterOps[key]);
    } else if (key === "price") {
      console.log("hi from else");
      filtered = filtered.filter(
        (prod) =>
          prod[key] >= filterOps[key][0] && prod[key] <= filterOps[key][1]
      );
      return filtered;
    }
  }
  return filtered;
}

function sort(prods, sortParam) {
  if (sortParam === "PRICE: HIGH TO LOW") {
    return prods.sort((a, b) => b.price - a.price);
  } else if (sortParam === "PRICE: LOW TO HIGH") {
    return prods.sort((a, b) => a.price - b.price);
  }
}

export { search, filter, sort, remove_filter };
