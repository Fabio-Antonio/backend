const Color = require('../models/color');


const Arreglos = async (productos)=>{

    const productos1=[];
    const productos2=[];

    for(let i = 0 ;i<4; i++ ){
      productos1[i] = productos[0][i];
   }

   for(let i = 4 ;i<8; i++ ){
       productos2[i] = productos[0][i];
    }
    return {
        productos1,
        productos2
    }
}


const Arreglos_productos = async (productos)=>{

    const productos1=[];
    const productos2=[];
    const produc=[];
    var product;
    var cont=0;
    
   
    for(let i = 0 ;i<8; i++ ){
      
        product=productos[0][i];


        if(product){

            if(i>0){
                produc.push(product.producto);
               
                if(produc[i].nombre_producto==produc[i-1].nombre_producto){
                    produc[i-1]= null;
                }
            
            }else{
                produc[i]=product.producto;
            }      

        }else{
            produc[i]=null;
        }
    }

      for(i=0;i<7;i++){

          if(produc[i]){

            if(cont<4){
            
                productos1.push(produc[i]);
                cont++;
          }else{
            
                productos2.push(produc[i]);
                           
          }
          }
         
          
      }
        
          
           
        

  
 
    return {
        productos1,
        productos2
    }
}



const Array_Color = async (uid)=>{
    
    const color = await Color.findById(uid);
      return color;
}


const Array_isEmpty = async (Arreglo)=>{


     if(Arreglo[0] == null){
         return 0;
     }else{
         return Arreglo[0].total;
     }


}


 const Array_total = async(pedidos)=>{
         let cantidad = 0;
         let precio  = 0;
         let total =0;
         let pedido =null;
         
         for(let i =0 ; i<pedidos.length;i++){
             pedido=pedidos[i];
             cantidad= pedido.cantidad;
             precio=pedido.precio;

             total=total+(cantidad*precio);
           
         }

         return total;
 }



 const Array_pedidos_correo = async(pedidos)=>{
     let pedido=[];
     

     for(let i=0; i<pedidos.length;i++){
       
          if(pedidos[i].nombre_producto){
             pedido.push(pedidos[i].nombre_producto+" cantidad: "+pedidos[i].cantidad);
          }

     }

     return pedido;
 }

module.exports={
    Arreglos,
    Array_Color,
    Array_total,
    Array_isEmpty,
    Arreglos_productos,
    Array_pedidos_correo
}