import "./style.css";
import "./hamburgers.css";
// import { createLogger } from "vite";

const hamburger = document.querySelector(".hamburger");
const cardsContainer = document.querySelector(".cards");
const mobileNavbarrContainer = document.querySelector(".mobileNavbarrContainer");
const allNavigation = document.querySelector(".allNavigation");
const BurgersNavigation = document.querySelector(".BurgersNavigation");
const SteaksNavigation = document.querySelector(".SteaksNavigation");
const pizzaNavigation = document.querySelector(".pizzaNavigation");
const drinksNavigation = document.querySelector(".drinksNavigation");
const dessertsNavigation = document.querySelector(".dessertsNavigation");
const addRecipe=document.querySelector(".addRecipe")
const bookMarks=document.querySelector(".bookMarks")
const searchBar = document.querySelector(".searchBar");
const cartList=document.querySelector(".cartList");
let recentActiveTab=allNavigation;
let cart=[];
 const activeTabCheck=(activeTab)=>{
    switch (activeTab.toLowerCase()) {
      case "all":
         allNavigation.style.backgroundColor="#f1e3e3"
          recentActiveTab.style.backgroundColor="#fff";
         recentActiveTab=allNavigation;
         break;
      case "burgers":
         BurgersNavigation.style.backgroundColor="#f1e3e3";
         recentActiveTab.style.backgroundColor="#fff"
         recentActiveTab=BurgersNavigation;
         break;
      case "steaks":
         SteaksNavigation.style.backgroundColor="#f1e3e3";
         recentActiveTab.style.backgroundColor="#fff"
         recentActiveTab=SteaksNavigation;
         break;
      case "pizzas":
         pizzaNavigation.style.backgroundColor="#f1e3e3";
         recentActiveTab.style.backgroundColor="#fff"
         recentActiveTab=pizzaNavigation;
         break;
      case "drinks":
         drinksNavigation.style.backgroundColor="#f1e3e3";
         recentActiveTab.style.backgroundColor="#fff"
         recentActiveTab=drinksNavigation;
         break;
      case "desserts":
         dessertsNavigation.style.backgroundColor="#f1e3e3";
         recentActiveTab.style.backgroundColor="#fff"
         recentActiveTab=dessertsNavigation;
         break;
      case "":
         recentActiveTab.style.backgroundColor="#fff"
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
function deleteCartItemBtn(item) {
   item.parentElement.remove();
};
window.deleteCartItemBtn=deleteCartItemBtn;

const addToCart=(product)=>{
    cart.push({
       name:product.parentElement.parentElement.querySelector("h3").textContent,
      price:(product.parentElement.querySelector("span").textContent).replace(/\D/g, ""),
      img:product.parentElement.parentElement.querySelector("img").src,
      description:product.parentElement.parentElement.querySelector("p").textContent
   });
   let cartHTML=cart.map((eachItem)=>{
   return `
      <li class="py-1 sm:py-1 w-full flex justify-between items-center px-2">
              <div class="flex items-center w-[85%] shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-1.5 rounded-[10px]">
                <div class="shrink-0">
                  <img class="w-8 h-8 rounded-full"
                    src="${eachItem.img}"
                    alt="Neil image">
                </div>
                <div class="flex-1 min-w-0 ms-2">
                  <p class="font-bold text-xl truncate">
                     ${eachItem.name}
                  </p>
                  <p class="text-sm truncate font-light">
                    ${eachItem.description}
                  </p>
                </div>
                <div class="inline-flex items-center font-bold text-xl">
                  $${eachItem.price}
                </div>
              </div>
              <div class="deleteBtn" onclick="deleteCartItemBtn(this)">
                <i class="fa-solid fa-delete-left text-[red]" ></i>
              </div>
            </li>
   `
   });
  cartList.innerHTML=cartHTML.join("")
}
window.addToCart=addToCart;
const returnCard = (data) => {
    let ratingStar="⭐".repeat(data.rate);
   return `
      <div class="card h-86 w-76 bg-[#FFFFFF] rounded-[20px] shadow-[0_18px_45px_rgba(0,0,0,.10),0_6px_18px_rgba(0,0,0,.06)] font-sans relative">
            <img src=${data.img} alt="" class="h-[60%] w-full rounded-t-[20px]" onerror=" this.src='/Images/default Image.jpg'">
            <h3 class="text-[20px] font-semibold text-[#1F2937] ml-1.5 mt-1">${data.name}</h3>
            <p class="text-[#6B7280] text-[14px]  ml-1.5 mb-1">${data.dsc}</p>
             <span class="rating bg-[#F6C244] text-[#ffffff] px-2 py-1 font-black rounded-2xl text-[13px] absolute top-2 left-1.5">${ratingStar}</span>
            <div class="cardEnd flex px-2  items-center absolute bottom-1.5  justify-between w-full">
              <span class="text-[#111827] font-semibold text-[18px] ml-1">Price:$${data.price}</span>
              <button class="bg-[#e92d1f] xhover:bg-[#DC3C31] transition duration-150 text-[#FFFFFF] shadow-[0_12px_24px_rgba(239,75,63,.35)] py-2 px-3 rounded-2xl text-[14px]" onclick="addToCart(this)"><i class="fa-solid fa-cart-shopping mr-0.5"></i>Add to Cart</button>
            </div>
          </div>
      `
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
SteaksNavigation.addEventListener("click", () => {
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
   if(searchBar.value.trim()) {
      apiData("All", searchBar.value);
       activeTabCheck("")
   }  else {allNavigation.style.backgroundColor="#f1e3e3"
      apiData("All")
   }
});
addRecipe.addEventListener("click",()=>{
   Swal.fire("Coming Soon...");
});
bookMarks.addEventListener("click",()=>{
   Swal.fire("Coming Soon...");
});

