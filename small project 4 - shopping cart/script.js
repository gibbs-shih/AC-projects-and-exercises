// 3.變數宣告
const menu = document.getElementById('menu')
const cart = document.getElementById('cart')
const totalAmount = document.getElementById('total-amount')
const button = document.getElementById('submit-button')

// const productData = [
//   {
//     id: "product-1",
//     imgUrl:
//       "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     name: "馬卡龍",
//     price: 90
//   },
//   {
//     id: "product-2",
//     imgUrl:
//       "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     name: "草莓",
//     price: 60
//   },
//   {
//     id: "product-3",
//     imgUrl:
//       "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     name: "奶茶",
//     price: 100
//   },
//   {
//     id: "product-4",
//     imgUrl:
//       "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     name: "冰咖啡",
//     price: 180
//   }
// ];
let productData = []
let cartItems = []
let total = 0

// 4.GET API 菜單產品資料
axios.get('https://ac-w3-dom-pos.firebaseio.com/products.json')
  .then( res => {
    productData = res.data
    displayProduct(productData)
})
  .catch( err => {
    console.log(err)
})


// 5.將產品資料加入菜單區塊
// displayProduct(productData);

function displayProduct(products) {
  products.forEach(product => menu.innerHTML += `
    <div class="col-3">
       <div class="card">
          <img src=${product.imgUrl} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <a href="#" class="btn btn-primary" id=${product.id}>加入購物車</a>
          </div>
        </div>
      </div>
  `)
}

// 6.加入購物車
function addToCart(event) {
  // 找到觸發event的node元素，並得到其產品id
  const id = event.target.id
  // 在productData的資料裡，找到點擊的產品資訊，加入 cartItems
  const addedProduct = productData.find(product => product.id === id)
  const name = addedProduct.name
  const price = addedProduct.price
  // 加入購物車變數cartItems 分：有按過、沒按過
  const targetItem = cartItems.find(item => item.id === id) 
  if (targetItem) {
    targetItem.quantity += 1
  } else {
    cartItems.push({
      id, // id: id, 
      name, // name: name,
      price: price,
      quantity: 1,
    })
  }
  // 畫面顯示購物車清單
  cart.innerHTML = cartItems.map(item => `
  <li class="list-group-item">${item.name} X ${item.quantity} 小計：${item.price * item.quantity}</li>
  `).join('')
  // 計算總金額
  calculateTotal(price)
}

// 7.計算總金額
function calculateTotal (amount) {
  total += amount
  totalAmount.textContent = total
}
// 8.送出訂單
function submit() {
  alert(`感謝購買\n總金額：${total}`)
  reset()
}

// 9.重置資料
function reset() {
  totalAmount.textContent = "--"
  total = 0
  cart.innerHTML = null
  cartItems = []
}

// 10. 加入事件監聽
menu.addEventListener('click', addToCart)
button.addEventListener('click', submit)