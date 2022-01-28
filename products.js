const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;

    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
Load Category Products
=============
 */
const categoryCenter = document.querySelector(".category__center");
const viewallbtn = document.querySelector("#view-all");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
});

const displayProductItems = (items) => {
  let displayProduct = items.slice(0, 6).map(
    (product) => ` 
                  

                  <div class="project-card" data-aos="zoom-out-up"  data-aos-duration="2000">
                    <div class="card__header">
                      <img src=${product.image} alt="product">
                    </div>
                    <div class="card__footer">
                      <h3>${product.title}</h3>
                    
                      <a href="${product.live}" target="_blank"><button type="submit" class="product__btn"> <i class="fas fa-satellite-dish"></i><span>Live</span></button></a>
                      <a href="${product.git}" target="_blank"><button type="submit" class="product__btn"> <i class="fab fa-github-alt"></i> <span>Git repo</span></button></a>
                    </div>
                  </div>
                
                  `
  );

  displayProduct = displayProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
view all
=============
 */

const viewBtn = document.querySelector("#viewme");
const viewBtn2 = document.querySelector("#viewme2");
//

viewBtn.addEventListener("click", async function () {
  viewBtn.style.display = "none";
  viewBtn2.style.display = "block";

  const products = await getProducts();
  displayAllProductItems(products);
});

viewBtn2.addEventListener("click", async function () {
  viewBtn.style.display = "block";
  viewBtn2.style.display = "none";

  const products = await getProducts();
  displayProductItems(products);
});
const displayAllProductItems = (items) => {
  let displayAllProduct = items.map(
    (product) => `
    <div class="project-card data-aos="zoom-out-up" data-aos-duration="2000">
    <div class="card__header">
      <img src=${product.image} alt="product">
    </div>
    <div class="card__footer">
      <h3>${product.title}</h3>
    
      <a href="${product.live}" target="_blank"  ><button type="submit" class="product__btn"> <i class="fas fa-satellite-dish"></i><span>Live</span></button></a>
      <a href="${product.git}" target="_blank"><button type="submit" class="product__btn"> <i class="fab fa-github-alt"></i> <span>Git repo</span></button></a>
    </div>
  </div>
                  `
  );

  displayAllProduct = displayAllProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayAllProduct;
  }
};

// const viewBtn = document.querySelectorAll(".view-btn");
// const viewContainer = document.getElementById("view-all-btn");

// if (viewContainer) {
//   viewContainer.addEventListener("click", async (e) => {
//     const target = e.target.closest(".view-num");
//     if (!target) return;

//     const id = target.dataset.id;
//     const products = await getProducts();

//     if(id){

//       let viewProducts = products.filter((product) =>{

//         if(id === "view-all-8"){

//         }
//       })
//     }
//   });
// }

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          viewBtn.style.display = "none";

          return product;
        }
      });

      if (id === "All") {
        displayProductItems(products);
        viewBtn.style.display = "block";
      } else {
        displayProductItems(menuCategory);
      }
    }
  });
}

/*
=============
Product Details Left
=============
 */
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

["mouseover", "touchstart"].forEach((event) => {
  if (picContainer) {
    picContainer.addEventListener(event, (e) => {
      const target = e.target.closest("img");
      if (!target) return;
      const id = target.id.slice(3);
      changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
    });
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // change the main image
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // add to the active image
  picList[n - 1].classList.add("img-active");
  //   update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", (e) => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach((btn) => {
        // remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // hide other active
      Array.from(contents).forEach((content) => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}
