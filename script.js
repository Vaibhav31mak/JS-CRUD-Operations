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

function renderProducts(){
    let product_list=getProducts();
    let productHTML = document.querySelector(".products .row");
    if(!productHTML) return;
    
    productHTML.innerHTML = '';
    product_list.forEach(product => {
        productHTML.innerHTML+=`
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100">
                <img src="./images/" class="card-img-top product-img" alt="Product image">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product['product-name']}</h5>
                    <p class="card-text">
                        ${product['product-desc']}
                    </p>
                    <p class="card-price mt-auto fw-bold">₹${product['product-price']}</p>
                    <div class="d-flex">
                        <button class="btn btn-warning me-2" onclick="updateProduct(${product['product_id']})">Edit</button>
                        <button class="btn btn-danger ms-2" onclick="deleteProduct(${product['product_id']})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}

function addProduct(){
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
    product_list.push({"product-id": Date.now() ,"product-name": product_name.value, "product-price": product_price.value, "product-desc": product_desc.value});
    localStorage.setItem("product-list",JSON.stringify(product_list));
    renderProducts();
}

renderProducts();