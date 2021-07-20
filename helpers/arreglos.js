const Color = require('../models/color');


const Arreglos = async (productos)=>{

    const productos1=[];
    const productos2=[];
   
    for(let i = 0 ;i<4; i++ ){
      productos1[i] = productos[i];
   }

   for(let i = 4 ;i<8; i++ ){
       productos2[i] = productos[i];
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

module.exports={
    Arreglos,
    Array_Color,
    Array_total
}