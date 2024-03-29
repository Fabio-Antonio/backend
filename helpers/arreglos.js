
const Producto= require('../models/productos');
const Productos = require('../models/productos');

const Arreglos = (productos)=>{

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
    var produc=null;
    var product;
    var cont=0;
    
   
    for(let i = 0 ;i<8; i++ ){
      
        product=productos[0][i];

          if(i<4){
            if(product){
                produc= await Producto.findOne({nombre_producto: product});
                productos1.push(produc);
            }  else{
                productos1.push(null);
            }
            
          }else{

            if(product){
                produc= await Producto.findOne({nombre_producto: product});
                productos2.push(produc);
            }  else{
                productos2.push(null);
            }

          }
                
      }
        
    return {
        productos1,
        productos2
    }
}

const Array_isEmpty = (Arreglo)=>{


     if(Arreglo[0] == null){
         return 0;
     }else{
         return Arreglo[0].total;
     }


}


 const Array_total = (pedidos)=>{
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



 const Array_pedidos_correo = (pedidos)=>{
     let pedido=[];
     

     for(let i=0; i<pedidos.length;i++){
       
          if(pedidos[i].nombre_producto){
             pedido.push(pedidos[i].nombre_producto+" cantidad: "+pedidos[i].cantidad);
          }

     }

     return pedido;
 }

const getRecentProducts= async(recentCart)=>{
    let productsId=[]
    
      recentCart.map((item)=>{
          productsId.push(item.id);
      });
   return await Producto.find().where('id').in(productsId).exec();
      
 }


module.exports={
    Arreglos,
    Array_total,
    Array_isEmpty,
    Arreglos_productos,
    Array_pedidos_correo,
    getRecentProducts
}