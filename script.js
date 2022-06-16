modelQT = 1;
cart=[];
let modalKey = 0;

// CRIANDO UMA CONSTANT PARA EVITAR USAR O NOME DOS ELEMENTOS COMPLETO REPETITIVAMENTE 

// usa c pra quando quiser o querySelector
const c = (el) => document.querySelector(el);
// usa cs pra quando quiser o querySelectorAll
const cs = (el) => document.querySelectorAll(el);

// ..............................................................

// o primeiro parametro pode ser qualquer nome que vc quiser
// o segundo parametro é o correto usar o nome index e ele se refere aos elementos dentro do json

 pizzaJson.map((item, index)=>{

      // Declarei a variavel / pequei as classes do elemento que quero fazer o clone/ clonei e dicionei o true pois ele esta com display nonne no css
      let pizzaItem = c('.models .pizza-item').cloneNode(true);

      pizzaItem.setAttribute('data-key',index);
     
      pizzaItem.querySelector('.pizza-item--img img').src= item.img;
      pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
      pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
      pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    
      pizzaItem.querySelector('a').addEventListener('click', (e)=>{
// A partir do elemento "a" ele vai procurar o elemento mais proximo chamado 'pizzaItem' atraves do closest  quando achar o botao vai pegar o elemento data-key ao clicar no btn
// o terget se refere ao proprio elemento a
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modelQT=1;

        modalKey = key;
  
       c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
       c('.pizzaBig img').src = pizzaJson[key].img;
       c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
       c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
       c('.pizzaInfo--size.selected').classList.remove('selected');
       
       cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
           if(sizeIndex == 2){
               size.classList.add('selected');

           }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
       
    });

        c('.pizzaInfo--qt').innerHTML =modelQT;  


        e.preventDefault();
        c('.pizzaWindowArea').style.opacity=0;
        c('.pizzaWindowArea').style.display="flex";
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity=1;

        },200);

      })

       // O append serve para ir adiconando os elementos e não sobrepor igual ao innerhtml
       document.querySelector('.pizza-area').append( pizzaItem );
       

 });


        // EVENTOS DO MODAL

        function closeModal(){
            c('.pizzaWindowArea').style.opacity= 0 ;
            setTimeout(()=>{

                c('.pizzaWindowArea').style.display='none';

            },500);
            
        }

        cs('.pizzaInfo--cancelButton , .pizzaInfo--cancelMobileButton').forEach((item)=>{
            item.addEventListener('click', closeModal);
        });



        c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
        if( modelQT > 1){
            modelQT--
            c('.pizzaInfo--qt').innerHTML =modelQT;    
        }   
        
       });
 

        c('.pizzaInfo--qtmais').addEventListener('click', ()=>{

            modelQT++
            c('.pizzaInfo--qt').innerHTML =modelQT;  
        });

        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
       
             size.addEventListener('click' , (e)=>{
            
                c('.pizzaInfo--size.selected').classList.remove('selected');
               size.classList.add('selected');
             });
        
     });

     c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    
 

    let  size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let indentifier = pizzaJson[modalKey].id + '@' +size;

let key = cart.findIndex((item)=>{
    return item.indentifier == indentifier
});
      if(key > -1){

        cart[key].qt += modelQT;

      }else{
    cart.push({
            indentifier,
            id:pizzaJson[modalKey].id,
            size:size,
            qt:modelQT

        });
    }   
        updateCart()
        closeModal();

        });   
c('.menu-openner').addEventListener('click',()=>{
if(cart.length > 0 ){
    c('aside').style.left = '0';
}
});
c('.menu-closer').addEventListener('click',()=>{
   
        c('aside').style.left = '100vw';
 
    });

    function updateCart(){
        c('.menu-openner span').innerHTML = cart.length;
            if(cart.length > 0){
                c('aside').classList.add('show')
                c('.cart').innerHTML='';

                let subtotal=0 
                let desconto=0 
                let total=0  

                for (let i in cart){
                let pizzaItem = pizzaJson.find((item)=>{
                    return item.id == cart[i].id
                 });
                 subtotal += pizzaItem.price * cart[i].qt;

                 let pizzaSizeName;

                 switch(cart[i].size){

                    case 0:
                        pizzaSizeName = 'P';
                    break
                    
                    case 1:
                        pizzaSizeName = 'M';
                    break
                    
                    case 2:
                        pizzaSizeName = 'G';
                    break

                 }

                let cartItem = c('.models .cart--item').cloneNode(true);
             

                let pizzaName =`${pizzaItem.name} (${pizzaSizeName})`;
                
              cartItem.querySelector('img').src= pizzaItem.img;
              cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
              cartItem.querySelector('.cart--item--qt').innerHTML= cart[i].qt;
              cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{

                if(cart[i].qt > 1){    
                    cart[i].qt--;
                    }else{
                       cart.splice(i,1);
                    }
                updateCart()

            });
             
              cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                   
                    cart[i].qt++
                  
                    updateCart()
              });
              
                c('.cart').append(cartItem);
            }

            desconto = subtotal* 0.1;
            total = subtotal - desconto;

            c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
            c('.total  span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

            }else{
                c('aside').classList.remove('show')
                c('aside').style.left = '100vw';
            }
        

    }