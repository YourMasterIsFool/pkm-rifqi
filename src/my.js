// const btn_add = document.querySelectorAll(".card .btn-add-cart");
// const delete_sweep = document.querySelectorAll(".card .btn-clear");
// const btn_addItems = document.querySelectorAll(".card .btn-add");
// const btn_removeItems = document.querySelectorAll(".card .btn-remove");
// const items = document.querySelectorAll(".card .items");
// const itemsNumber = document.querySelectorAll(".items .number");

// for (let i=0; i<btn_add.length; i++) {
//   btn_add[i].addEventListener("click", event => {
//     displayItems(i);
//     event.target.style.display = "none";
//   });

//   delete_sweep[i].addEventListener("click", event=> {
//     btn_add[i].style.display = "block";
//     items[i].classList.remove("flex");
//     items[i].classList.add("hidden");

//   })
//   btn_addItems[i].onclick = function () {addItems(i)};

//   btn_removeItems[i].onclick = function() {
//     removeItems(i);
//   }
// }

// function displayItems(i) {
//   items[i].classList.remove("hidden");
//   items[i].classList.add("flex");
// }

// let number = 1;
// function addItems(i) {
//   console.log("yo");
//   number+=1;
 
//   itemsNumber[i].innerHTML = number;
// }

// function removeItems(i){
//   number--;
//   if(number < 1){
//    btn_add[i].style.display = "block"; 
//    items[i].classList.remove("flex");
//    items[i].classList.add("hidden");
//   }
//   else {
//     itemsNumber[i].innerHTML = number;
//   }
  

// }

// var cart_clicked = false;
// document.querySelector(".cart .header").addEventListener("click", event => {
//   cart_clicked = !cart_clicked;
//   console.log(cart_clicked);
//   const cart = document.querySelector(".cart").classList.add("anm-increase-height");

//   if (cart_clicked) {
//     document.querySelector(".cart").classList.remove("anm-decrease-height");
//     document.querySelector(".cart").classList.add("anm-increase-height");
//   }
//   else {
//     document.querySelector(".cart").classList.remove("anm-increase-height");
//     document.querySelector(".cart").classList.add("anm-decrease-height");
//   }
 
// })


const CartItem = Vue.component('cart-item', 
	{
		props: ["item", "carts", "items"],
		template: `<div class="cart-item px-2 py-4">
			<div class="cart-desc items-center flex justify-between">
				<div class="">
					<h2 class="text-xl font-bold">
						{{item.title}}
					</h2>
					<p class=" text-sm mt- opacity-60">
						Rp {{item.price}}
					</p>
					 
				</div>
				<img :src="item.image" class="w-20 h-20 rounded-md mr-4 shadow" alt="">
			</div>
			<div  class="items flex  justify-between w-full h-12 mt-2  mb-2">
              <div>
                <button @click="clearCarts(item.index)" class="btn btn-clear"><span class="material-icons">delete_sweep</span></button>
                
              </div>
                <div>

            <button @click="removeItems(item.index)" class="btn btn-remove"><span class="material-icons">remove</span></button>
            <span class="number mx-2">{{item.count}}</span>
              <button @click="addItems(item.index)" class="btn btn-add"><span class="material-icons">add</span></button>
                </div>	
            </div>

            <hr>
		</div>
		
		`,
		methods: {
			addItems(id){
		 	this.item.count++;
		},
		removeItems(id){
			this.item.count -= 1;	
			const index = this.getIndex(this.item.id);
			
			const btn_add_cart = document.querySelectorAll(".card .btn-add-cart")[this.item.id];
			const btn_remove_cart = document.querySelectorAll(".card .items")[this.item.id];

			console.log(btn_add_cart);
			if(this.item.count < 1) {
				btn_remove_cart.style.display = 'none';
				btn_add_cart.style.display = "block";	
				this.carts.splice(index, 1);
			}
			console.log(this.item);
		},
		clearCarts(id){

			const index = this.getIndex(this.item.id);
			const btn_add_cart = document.querySelectorAll(".card .btn-add-cart")[this.item.id];
			const btn_remove_cart = document.querySelectorAll(".card .items")[this.item.id];
		
			btn_remove_cart.style.display = 'none';
			btn_add_cart.style.display = "block";

			
			this.carts.splice(index, 1);
		},

		getIndex(id){
			return this.carts.map(obj=>obj.id).indexOf(id);
		},
		
		},

	});


const Cart= Vue.component('cart', {
	components:{
	'cart-item': CartItem,
	},
	props: ["showCart", "carts", "items"],
	template: `<div class="cart">
        <div @click="showcart(event)" class="header flex flex-col justify-center">
            <h3 class="text-center font-bold text-white"><span class="material-icons">
              shopping_cart
            </span> Cart</h3>
        </div>
        <div class="body w-full h-full px-4 py-2">
         <cart-item :items="items" v-for="item in carts" :carts="carts" :item="item"></cart-item>
         <button @click="openPayment()" v-bind:style="{ display:[carts.length==0?'none':'block']}" class="btn w-full h-8 mb-20" >
         	payment
         </button>
        </div>
      </div>`,
   methods: {
   	showcart(event) {
   		this.showCart = !this.showCart;
   		const classess = document.querySelector(".cart").classList;
   		if(this.showCart) {
   			classess.remove("anm-decrease-height");
   			classess.add("anm-increase-height");
   		}
   		else {
   			classess.remove("anm-increase-height");
   			classess.add("anm-decrease-height");
   		}
   	},
   	payment() {
   		var text = "";
   		for(let i=0; i<this.carts.length; i++){
   			const item = this.carts[i];
   			const title = `product: $title`;
   		}
   		location.href=`https://api.whatsapp.com/send?phone=6281331992211&text=`+text;
   	},
   	openPayment(){
   		const modal = document.querySelector(".modal");
   		modal.style.display="block";
   	}
   }
})

var cardItem = Vue.component("card-item", {
	props: ["item", "index", "carts", "number", "showBtncart", "showBtnitem"],
	template: `<div class="card">
          <div class="images">
            <img :src="item.images" class="w-full h-auto rounded-md" alt="">
          </div>
          <div class="description px-1 md:px-2 mt-1 md:mt-2 ">
            <div class="title text-2xl font-bold">{{item.title}}</div>
            <p class="price mt-1 md:mt-2">Rp. {{item.price}}</p>
            <p class="text mt-2 md:mt-4">{{item.desc}}</p>
            <div style="display:none;" class="items   justify-between w-full h-12 mt-4 md:mt-6 mb-2">
              <button @click="removeCart(index)" class="w-full text-white btn-remove-cart">
              	<span class="material-icons">
              		delete_sweep
              	</span>
              	Remove Item
              </button>
            </div>
            <button  @click="addCart(index, event)" class="btn btn-add-cart w-full h-12 mt-4 md:mt-6"> <span class="material-icons icon">add_shopping_cart</span> Buy</button>
          </div>
        </div>`,

	methods: {
		addCart(id, $event){

			$event.target.style.display = 'none';
			document.querySelectorAll(".card .items")[id].style.display = 'flex';

			if(this.carts.length==0 || this.carts.map(obj=>obj.id).indexOf(id) === -1) {
				this.carts.push({
				"id": id,
				"title": this.item.title,
				"price": this.item.price,
				"count": 1,
				"image": this.item.images,
				"total": 0,

				});
			}
			console.log("clicked");
			
		},
	
		removeCart(id){
			const remove_cart = document.querySelectorAll(".card .items")[id];
			remove_cart.style.display = 'none';
			const index = this.carts.map(obj=>obj.id).indexOf(id);
			this.carts.splice(index, 1);

			document.querySelectorAll(".card .btn-add-cart")[id].style.display = "block";

		}

	
	},
});


var vue = new Vue({
  el: "#app",
  componets: {
  	'card-item': cardItem,
  	'cart': Cart,
  },
  data: {
  	// erros: {
  	// 	full_name:false,
  	// 	address:false,
  	// 	phone_number:false,
  	// },
  	full_name: null,
  	address: null,
  	phone_number: null,
  	items:[
  	{
  			images: "src/images/dummy.png",
  			title: "Teh",
  			price: 10000,
  			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris orci. Duis maximus sodales augue, sed mollis leo rutrum sed."
  		},
  		{
  			images: "src/images/dummy.png",
  			title: "Teh",
  			price: 10000,
  			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris orci. Duis maximus sodales augue, sed mollis leo rutrum sed."
  		},

  		{
  			images: "src/images/teh_cengkeh.jpg",
  			title: "Teh",
  			price: 10000,
  			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris orci. Duis maximus sodales augue, sed mollis leo rutrum sed."
  		}
  		],
  	carts: [

  	],
  	total: 0,
  	showcart: false,
  
	},
	methods: {

		payment(e){
		
		},
		closeModal(){
			const modal = document.querySelector(".modal");
			if(event.target == modal){
				modal.style.display = "none";
			}
		},
		btnCloseModal(){
			const modal = document.querySelector(".modal");
			modal.style.display = 'none';
		},
		bayar(){
			var item = "";


			this.carts.map(element=> {
				const item_name = element.title;
				const item_price = element.price;
				const item_subtotal = element.total;
				item+=`\nbarang: ${item_name} \n harga: ${item_price} \n subtotal: ${item_subtotal}`;
			})

			const message = `nama : ${this.full_name} \n alamat: ${this.address} \n no. telp ${this.phone_number} \n ${item} \n\n ${this.totalPrice}`;
			
			location.href="https://api.whatsapp.com/send?phone=6285156300157&text="+message;

		}
	},

	computed: {
		totalPrice() {
			
			return this.carts.reduce((acc, item)=>acc+item.total,0);
		},
		errors(){
			return {

			}
		}
	},
	watch: {
		'carts': {
			handler(newValue, oldValue){
				newValue.forEach((item)=> {
					item.total = item.price*item.count;
				})
			},
			deep:true
		},
		errors(){
			alert("computed changed")
		}

	},
	created:function(){
		window.addEventListener("click", this.closeModal);
	},
	destroyed:function(){
		window.addEventListener("click", this.closeModal);
	}

});

