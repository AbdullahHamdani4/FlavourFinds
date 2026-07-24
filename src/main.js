import "./style.css";
import "./hamburgers.css";
// import { createLogger } from "vite";

const hamburger = document.querySelector(".hamburger");
const cardsContainer = document.querySelector(".cards");
const mobileNavbarrContainer = document.querySelector(".mobileNavbarrContainer");
const allNavigation = document.querySelector(".allNavigation");
const BurgersNavigation = document.querySelector(".BurgersNavigation");
const steaksNavigation = document.querySelector(".steaksNavigation");
const pizzaNavigation = document.querySelector(".pizzaNavigation");
const drinksNavigation = document.querySelector(".drinksNavigation");
const dessertsNavigation = document.querySelector(".dessertsNavigation");
const addRecipe = document.querySelector(".addRecipe")
const bookMarks = document.querySelector(".bookMarks")
const searchBar = document.querySelector(".searchBar");
const cartList = document.querySelector(".cartList");
const cartTotal = document.querySelector(".cartTotal")
let recentActiveTab = allNavigation;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || [];
let totalItems = 0
window.deleteCartItemBtn = deleteCartItemBtn;
window.addToCart = addToCart;




const cartLiRender = () => {
   let cartHTML = cart.map((eachItem) => {
      return `<li class="py-1 sm:py-1 w-full flex justify-between items-center px-1 ">
              <div class="flex items-center gap-2 bg-[#1B1613] border border-[#3A2F27] rounded-sm p-2 w-[92%] ml-2 relative max-w-[89%]">
                <div class="shrink-0">
                  <img class="w-8 h-8 rounded-full"
                    src="${eachItem.img}"
                    alt="Neil image">
                </div>
                <div class="min-w-0 ms-2 flex-1">
                  <p class="font-bold text-base truncate text-[#F1E4D0] w-[80%]">
                     ${eachItem.name}
                  </p>
                  <p class="text-[12px] text-[#8a7d68] truncate w-[90%] ">
                    ${eachItem.description}
                  </p>
                </div>
                <div class="text-sm text-[#C99A44] font-semibold absolute right-1">
                  $${eachItem.price}
                </div>
              </div>
              <div class="deleteBtn cursor-pointer px-1 w-[8%]" onclick="deleteCartItemBtn(this,${eachItem.id})">
                <i class="fa-solid fa-trash text-[#de362a] text-lg" ></i>
              </div>
            </li>`
   });
   cartList.innerHTML = cartHTML.join("");
}
const cardTotalUsingReduce = () => {
   let cartTotalUsingReduce = totalPrice.reduce((accu, currval) => {
      return accu + currval
   }, 0);
   cartTotal.textContent = `$${cartTotalUsingReduce}`;
   localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
}
const returnCard = (data) => {
   let ratingStar = "⭐".repeat(data.rate);
   return `
      <div class="card h-auto w-67.5 bg-[#241D18] rounded-lg shadow-[0_18px_45px_rgba(0,0,0,.10),0_6px_18px_rgba(0,0,0,.06)] font-sans relative border border-[#4A3C30]">
            <img src=${data.img} alt="" class="h-35 w-full rounded-t-lg" onerror=" this.src='/Images/default Image.jpg'">
            <h3 class="text-[14px] font-semibold font-oswald text-[#F1E4D0] m-0.5 mt-2 ml-1.5 uppercase truncate">${data.name}</h3>
            <p class="font-inter text-[#8a7d68] text-[11.5px]  ml-1.5 mb-1  font-normal truncate">${data.dsc}</p>
             <span class="rating bg-[#1B1613] text-[#C99A44] px-2 py-1 font-black rounded-sm text-[13px] absolute top-1 left-1 border border-[#C99A44]">${ratingStar}</span>
            <div class="cardEnd flex px-2  items-center justify-between w-full mt-2 mb-1.5">
              <span class="text-[#C99A44] font-semibold text-[15px] ml-1 font-jetbrains">Price:$${data.price}</span>
              <button class="bg-[#E2622D] xhover:bg-[#C24D1F] transition duration-150 text-[#1B1613] py-1.5 px-2.5 rounded-sm text-[11.5px]" onclick="addToCart(this)"><i class="fa-solid fa-cart-shopping mr-0.5"></i>Add to Cart</button>
            </div>
          </div>
      `
}

if (cart !== []) {
   cartLiRender();
}
cardTotalUsingReduce()



const activeTabCheck = (activeTab) => {
   switch (activeTab.toLowerCase()) {
      case "all":
         allNavigation.style.backgroundColor = "#E2622D"
         allNavigation.style.color = "#1B1613"
         if (recentActiveTab !== allNavigation) {
            recentActiveTab.style.backgroundColor = "#241D18"
            recentActiveTab.style.color = "#C99A44"
         }
         recentActiveTab = allNavigation;
         break;
      case "burgers":
         BurgersNavigation.style.backgroundColor = "#E2622D";
         BurgersNavigation.style.color = "#1B1613";
         if (recentActiveTab !== BurgersNavigation) {
            recentActiveTab.style.backgroundColor = "#241D18"
            recentActiveTab.style.color = "#C99A44"
         }
         recentActiveTab = BurgersNavigation;
         break;
      case "steaks":
         steaksNavigation.style.backgroundColor = "#E2622D";
         steaksNavigation.style.color = "#1B1613";
         if (recentActiveTab !== steaksNavigation) {
            recentActiveTab.style.backgroundColor = "#241D18"
            recentActiveTab.style.color = "#C99A44"
         }
         recentActiveTab = steaksNavigation;
         break;
      case "pizzas":
         pizzaNavigation.style.backgroundColor = "#E2622D";
         pizzaNavigation.style.color = "#1B1613";
         if (recentActiveTab !== pizzaNavigation) {
            recentActiveTab.style.backgroundColor = "#241D18"
            recentActiveTab.style.color = "#C99A44"
         }
         recentActiveTab = pizzaNavigation;
         break; l
      case "drinks":
         drinksNavigation.style.backgroundColor = "#E2622D";
         drinksNavigation.style.color = "#1B1613";
         if (recentActiveTab !== drinksNavigation) {
            recentActiveTab.style.backgroundColor = "#241D18"
            recentActiveTab.style.color = "#C99A44"
         }
         recentActiveTab = drinksNavigation;
         break;
      case "desserts":
         dessertsNavigation.style.backgroundColor = "#E2622D";
         dessertsNavigation.style.color = "#1B1613";
         if (recentActiveTab !== dessertsNavigation) {
            recentActiveTab.style.backgroundColor = "#241D18"
            recentActiveTab.style.color = "#C99A44"
         }
         recentActiveTab = dessertsNavigation;
         break;
      case "":
         recentActiveTab.style.backgroundColor = "#241D18";
         recentActiveTab.style.color = "#C99A44"
         break;
      default:
         break;
   }
}

hamburger.addEventListener("click", () => {
   hamburger.classList.toggle("is-active");
   if (hamburger.classList.contains("is-active")) {
      mobileNavbarrContainer.classList.toggle("hidden");
      requestAnimationFrame(() => {
         mobileNavbarrContainer.classList.remove("max-h-0");
         mobileNavbarrContainer.classList.remove("opacity-0");
         mobileNavbarrContainer.classList.add("max-h-[112px]");
         mobileNavbarrContainer.classList.add("opacity-100");
      })
   } else {

      mobileNavbarrContainer.classList.remove("max-h-[112px]");
      mobileNavbarrContainer.classList.remove("opacity-100");
      mobileNavbarrContainer.classList.add("max-h-0");
      mobileNavbarrContainer.classList.add("opacity-0");

      setTimeout(() => {
         mobileNavbarrContainer.classList.toggle("hidden");
      }, 300)

   }

});



function deleteCartItemBtn(item, id, price) {

   //Remove elements from ui
   item.parentElement.remove();

   //Remove element from localstorage
   let indexOfItem = cart.findIndex(each => each.id == id);
   cart.splice(indexOfItem, 1);
   totalItems -= 1;


   //Minus price from local storage and ui
   let indexOfPrice = totalPrice.findIndex(each => each == price);
   totalPrice.splice(indexOfPrice, 1);
   cardTotalUsingReduce()
   localStorage.setItem("cart", JSON.stringify(cart))
}
function addToCart(product) {
   cart.push({
      id: totalItems += 1,
      name: product.parentElement.parentElement.querySelector("h3").textContent,
      price: (product.parentElement.querySelector("span").textContent).replace(/\D/g, ""),
      img: product.parentElement.parentElement.querySelector("img").src,
      description: product.parentElement.parentElement.querySelector("p").textContent
   });
   localStorage.setItem("cart", JSON.stringify(cart))
   totalPrice.push(Number((product.parentElement.querySelector("span").textContent).replace(/\D/g, "")));
   cartLiRender()
   cardTotalUsingReduce()
   Toastify({
      text: "Item successfully added to cart",
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
         background: "#241D18",
         color: "#F1E4D0",
         border: "1px solid #3A2F27",
         borderLeft: "4px solid #E2622D",
         borderRadius: "4px",
         fontFamily: "'Inter', sans-serif",
         fontSize: "13px",
      },
      onClick: function () { }
   }).showToast();
}


//Api Fetch
const apiData = async (category, searchBarTrigger) => {
   cardsContainer.scrollTo({
      top: 0,
      behavior: "instant"
   })
   try {
      const response = await fetch(`https://free-food-menus-api-two.vercel.app/${category.toLowerCase()}`);
      const data = await response.json();
      if (!searchBarTrigger) {
         if (category == "All") {
            const { burgers, steaks, pizzas, drinks, desserts } = data;
            const allData = [];
            const burgerMappedData = burgers.map((data) => {
               return returnCard(data)
            });
            const steaksMappedData = steaks.map((data) => {
               return returnCard(data)
            });
            const pizzasMappedData = pizzas.map((data) => {
               return returnCard(data)
            });
            const drinksMappedData = drinks.map((data) => {
               return returnCard(data)
            });
            const dessertsMappedData = desserts.map((data) => {
               return returnCard(data)
            });
            allData.push(burgerMappedData, drinksMappedData, steaksMappedData, pizzasMappedData, dessertsMappedData);
            const allDataInHTML = allData.map((each) => {
               return each.join("")
            })
            cardsContainer.innerHTML = allDataInHTML.join("");
         } else {
            let mappedData = data.map((data) => {
               return returnCard(data)
            })
            cardsContainer.innerHTML = mappedData.join("")
         };
      } else {
         const { burgers, steaks, pizzas, drinks, desserts } = data;
         const allData = [];
         const modifiedSearchBarTrigger = searchBarTrigger.trim().toLowerCase();
         const burgerMappedData = burgers.filter((data) => {
            if (data.name.toLowerCase().includes(modifiedSearchBarTrigger)) {
               return data
            }
         }).map((data) => {
            return returnCard(data)
         });
         const steaksMappedData = steaks.filter((data) => {
            if (data.name.toLowerCase().includes(modifiedSearchBarTrigger)) {
               return data
            }
         }).map((data) => {
            return returnCard(data)
         });
         const pizzasMappedData = pizzas.filter((data) => {
            if (data.name.toLowerCase().includes(modifiedSearchBarTrigger)) {
               return data
            }
         }).map((data) => {
            return returnCard(data)
         });
         const drinksMappedData = drinks.filter((data) => {
            if (data.name.toLowerCase().includes(modifiedSearchBarTrigger)) {
               return data
            }
         }).map((data) => {
            return returnCard(data)
         });
         const dessertsMappedData = desserts.filter((data) => {
            if (data.name.toLowerCase().includes(modifiedSearchBarTrigger)) {
               return data
            }
         }).map((data) => {
            return returnCard(data)
         });
         allData.push(burgerMappedData, drinksMappedData, steaksMappedData, pizzasMappedData, dessertsMappedData);
         const allDataInHTML = allData.map((each) => {
            return each.join("")
         })
         cardsContainer.innerHTML = allDataInHTML.join("");
         let totalLength = 0
         allDataInHTML.forEach((each) => {
            totalLength += each.length
         })
         totalLength ? "" : cardsContainer.innerHTML = '<p class="text-2xl font-semibold">Items not found </p>'
      }

   } catch (error) {
      console.log(error);
   }
}

apiData("All")

// Event Listeners
allNavigation.addEventListener("click", () => {
   apiData("All")
   activeTabCheck("all")
})
BurgersNavigation.addEventListener("click", () => {
   apiData("Burgers")
   activeTabCheck("burgers")
})
steaksNavigation.addEventListener("click", () => {
   apiData("Steaks")
   activeTabCheck("steaks")
})
pizzaNavigation.addEventListener("click", () => {
   apiData("Pizzas")
   activeTabCheck("pizzas")
})
drinksNavigation.addEventListener("click", () => {
   apiData("Drinks")
   activeTabCheck("drinks")
})
dessertsNavigation.addEventListener("click", () => {
   apiData("Desserts")
   activeTabCheck("desserts")
});
searchBar.addEventListener("input", () => {
   if (searchBar.value.trim()) {
      apiData("All", searchBar.value);
      activeTabCheck("")
   } else {
      allNavigation.style.backgroundColor = "#E2622D";
      allNavigation.style.color = "#1B1613"

      apiData("All")
   }
});
addRecipe.addEventListener("click", () => {
   Swal.fire("Coming Soon...");
});
bookMarks.addEventListener("click", () => {
   Swal.fire("Coming Soon...");
});

