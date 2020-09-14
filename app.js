console.log("connected");

const filterInput = document.querySelector("#filter")

const nameInput = document.querySelector("#product-name")

const priceInput = document.querySelector("#product-price")

const submit = document.querySelector("#submit-btn")

//const deleted = document.querySelector("#delete-btn")

const productListUl = document.querySelector(".collection")

const msg = document.querySelector('#msg')

//const lis = document.querySelectorAll('li')

let productItems = [];

function getData(product){
    //console.log(product);
    if(product.length>0){
        msg.innerHTML='';
        product.forEach(data=>{
            let li = document.createElement('li');
            li.className = "list-group-item"
            li.classList.add('collection-item')
            li.id= `product-${data.key}`
            li.innerHTML = `<strong>${data.name}</strong>
            <span class="price">-$${data.price}</span>
            <i class="fa fa-trash float-right delete-product"></i>`;
    
            productListUl.appendChild(li)
    
        })
    }else{
        msg.innerHTML='products are not available';
    }
    
}

getData(productItems)


submit.addEventListener('click', (event)=>{
    event.preventDefault()
    const name = nameInput.value;
    const price = priceInput.value;
    
    let key;
    if(productItems.length==0){
        key = 0;
    }else{
        key = productItems[productItems.length-1].key+1;
    }

    if(name==='' || price ===''){
        alert("Please fill up necessary information")
    }
    else{
        
        productItems.push({
            name,
            price,
            key
        })
        productListUl.innerHTML='';
        
        getData(productItems)
        nameInput.value = '';
        priceInput.value = '';
    }
})

productListUl.addEventListener('click', (event)=>{
    //console.log(event.target);
    if(event.target.classList.contains('delete-product')){
        //event.target.parentElement.remove()
        const target = event.target.parentElement
        event.target.parentElement.parentElement.removeChild(target);

        //removing id from the store
        const id = Number(target.id.split('-')[1])
        //console.log(typeof id);
        const result = productItems.filter((product)=>{
            return product.key !== id;
        });
        //console.log(result);
        productItems=result;

    }
})


filterInput.addEventListener('keyup', (event)=>{
    //console.log('filter');

    let text = event.target.value.toLowerCase();
    //console.log(text);
    let textSplit = text.split('')
    //console.log(textSplit);
    let textSplitLength = textSplit.length
    ///console.log(textSplitLength);
    document.querySelectorAll('li').forEach((product)=>{
        const productName = product.firstElementChild.textContent.toLowerCase();
        //console.log(productName);
        let productSearch = productName.split('')
        //console.log(productSearch);
        // if(productName.indexOf(text) == -1){
        //     product.style.display = 'none'
        // }else{
        //         product.style.display = 'block'
        // }
        for(let i = 0;i<textSplitLength;i++){
            if(textSplit[i]===productSearch[i]){ 
                product.style.display = 'block'
            }
            else{
                product.style.display = 'none'
            }
        }




   })

})


