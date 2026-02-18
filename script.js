console.log("start")
var addProductHTML=document.querySelector('.create-product').innerHTML;

function getProducts(){
    try {
        let product_list = localStorage.getItem("product-list");
        if(!product_list) return [];
        product_list = JSON.parse(product_list);
        if(!Array.isArray(product_list)){
            product_list=[];
        }
        return product_list;
    } catch(e) {
        localStorage.removeItem("product-list");
        return [];
    }
}

function renderProducts(products){
    let product_list=products||getProducts();
    let productHTML = document.querySelector(".products .row");
    if(!productHTML) return;
    
    productHTML.innerHTML = '';
    product_list.forEach(product => {
        productHTML.innerHTML+=`
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100">
                <img src="./images/product.webp" class="card-img-top product-img" alt="Product image">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product['product-name']}</h5>
                    <p class="card-text">
                        ${product['product-desc']}
                    </p>
                    <p class="card-price mt-auto fw-bold">₹${product['product-price']}</p>
                    <div class="d-flex">
                        <button type="button" class="btn btn-warning me-2" onclick="updateProduct(${product['product-id']})">Edit</button>
                        <button type="button" class="btn btn-danger ms-2" onclick="deleteProduct(${product['product-id']})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}

function addToLocalStorage(product_list){
    localStorage.setItem("product-list",JSON.stringify(product_list));
    renderProducts();
}

function addProduct(product_id){
    let validations = 0;
    product_name = document.getElementById("product-name");
    if(product_name.value.trim().length < 3){
        let validate_product_name=document.getElementById("validate-product-name");
        validate_product_name.innerHTML="Length should be >= 3";
        validate_product_name.style.color="red";
        validations++;
    }
    
    // product_image = document.getElementById("product-image");
    // if(product_image.files.length === 0){
    //     let validate_product_image=document.getElementById("validate-product-image");
    //     validate_product_image.innerHTML="Image is required";
    //     validate_product_image.style.color="red";
    //     validations++;
    // }
    
    product_price = document.getElementById("product-price");
    if(product_price.value == ""){
        let validate_product_price=document.getElementById("validate-product-price");
        validate_product_price.innerHTML="Price required";
        validate_product_price.style.color="red";
        validations++;
    }

    product_desc = document.getElementById("product-desc");
    if(product_desc.value.trim().length<10){
        let validate_product_desc=document.getElementById("validate-product-desc");
        validate_product_desc.innerHTML="Length should be >= 10";
        validate_product_desc.style.color="red";
        validations++;
    }

    if(validations>0) return;

    // let file = product_image.files[0];
    // let reader = new FileReader();
    // reader.onload = function(e){
    //     let product_list=getProducts();
    //     product_list.push({"product-name": product_name.value, "product-image": e.target.result, "product-price": product_price.value, "product-desc": product_desc.value})
    //     localStorage.setItem("product-list", JSON.stringify(product_list));
    //     console.log(product_list);
    // };
    // reader.readAsDataURL(file);
    let product_list=getProducts();
    product_list.push({"product-id": (product_id||Date.now()) ,"product-name": product_name.value, "product-price": product_price.value, "product-desc": product_desc.value});
    addToLocalStorage(product_list);
    product_name.value="";
    product_price.value="";
    product_desc.value="";
}

renderProducts();

function deleteProduct(product_id){
    console.log("delete "+ product_id);
    let product_list=getProducts();
    console.log(product_list);
    product_list=product_list.filter(product=>product['product-id']!=product_id);
    console.log(product_list);
    addToLocalStorage(product_list);
}

function updateProduct(product_id){
    console.log(product_id);
    let product_list=getProducts();
    const product = product_list.find(product => product['product-id'] == product_id);
    console.log(product);
    let qs=document.querySelector(".create-product")
    let productHTML=qs.innerHTML;
    console.log(productHTML);
    qs.innerHTML=`
                <div class="row">
                    <div class="col-12 col-sm-4 form-group mb-2">
                        <input type="text" id="product-name" class="form-control" placeholder="Product Name" value=${product['product-name']}>
                        <p id="validate-product-name"></p>
                    </div>
                    <div class="col-12 col-sm-4 form-group mb-2">
                        <form id="uploadForm" enctype="multipart/form-data">
                            <input type="file" id="product-image" accept="image/*" class="form-control" aria-label="Product Image">
                        </form>
                        <p id="validate-product-image"></p>
                    </div>
                    <div class="col-12 col-sm-4 form-group mb-2">
                        <input type="number" id="product-price" class="form-control" placeholder="Product Price" value=${product['product-price']}>
                        <p id="validate-product-price"></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-8 form-group">
                        <textarea class="form-control" id="product-desc" placeholder="Product Description">${product['product-desc']}</textarea>
                        <p id="validate-product-desc"></p>
                    </div>
                    <div class="col-12 col-sm-4 col-xxl-2 mt-2 form-group">
                        <button class="btn btn-primary form-control" onclick="editThisProduct(${product_id})"> Edit Product </button>
                    </div>
                </div>
    `
}

function editThisProduct(product_id){
    console.log("edit this product");
    deleteProduct(product_id);
    addProduct(product_id);
    let qs=document.querySelector(".create-product");
    console.log(qs.innerHTML);
    qs.innerHTML=addProductHTML;
}

function filterSearch(){
    let filter_bar=document.getElementById("filter");
    filter_bar.addEventListener("input", ()=>{
        let filter=document.getElementById("filter").value.trim().toLowerCase();
        let product_list=getProducts();
        product_list = product_list.filter(product=>{
            let name=product['product-name'].toLowerCase();
            let price=product['product-price'].toLowerCase();
            let id=product['product-id'];
            let desc=product['product-desc'].toLowerCase();
            console.log(name, id, desc, price);
            if(name.includes(filter)||id.toString().includes(filter)||price.includes(filter)||desc.includes(filter)){
                console.log(true);
                return true;
            }
            return false;
        });
        console.log(product_list);
        renderProducts(product_list);
    })
}

filterSearch();

function sortBy(){
    let selectSortBy=document.getElementById("select-sort");
    selectSortBy.addEventListener("change", (e)=>{
        console.log("inside sortby event");
        let sort_by=e.target.value;
        let product_list=getProducts();
        switch(sort_by){
            case "":
                break;
            case "product-id":
                console.log("id");
                product_list.sort((product1,product2) => {
                    if(product1['product-id']<product2['product-id']) return -1;
                    if(product1['product-id']>product2['product-id']) return 1;
                    return 0;
                });
                break;
            case "product-name":
                console.log("name");
                product_list.sort((product1,product2) => {
                    name1=product1['product-name'].toLowerCase();
                    name2=product2['product-name'].toLowerCase();
                    if(name1<name2) return -1;
                    if(name1>name2) return 1;
                    return 0;
                });
                break;
            case "product-price":
                console.log("price");
                product_list.sort((product1,product2) => {
                    return product1['product-price']-product2['product-price'];
                });
                break;
            default:
                console.log("Selection Error");
                break;
        }
        console.log(product_list);
        renderProducts(product_list);
    })
}

sortBy();

console.log("end")