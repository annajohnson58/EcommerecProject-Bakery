import p1_img from "./product_1.jpg";

import p3_img from "./product_3.png";

import p5_img from "./product_5.jpg";
import UilUsdSquare from "./sales1.png"
import UilMoneywithdrawal from "./in.png"

let data_product=[{
    id:1,
    name:"cheese cake",
    category:"cake",
    image:p1_img,
    new_price:50.0,
    old_price:80.0,

},

{
    id:3,
    name:"brown cake",
    category:"cake",
    image:p3_img,
    new_price:50.0,
    old_price:80.0,

},

{
    id:5,
    name:"choclate cake",
    category:"cake",
    image:p5_img,
    new_price:50.0,
    old_price:80.0,

}];


export default data_product;

// export const CardsData =[
//     {
// title:"Total Sales",
// color:{
//     background:'white',
//     boxShadow:"0px 10px 20px 0px #e0c6f5",
// },
// barValue:70,
// value:"25,970",
// png:UilUsdSquare,
// series:[{
//     name:"Total sales",

// data:[31,40,28,5142,109,100],
   
// }
// ],},
// {
//     title:"Revenue",
//     color:{
//         background:'white',
//         boxShadow:"0px 10px 20px 0px #e0c6f5",
//     },
//     barValue:80,
//     value:"14,970",
//     png:UilMoneywithdrawal,
//     series:[{
//         name:"Revenue",
    
//     data:[10,100,50,70,80,30,40],
       
//     }
//     ],},
//     {
//         title:"Expenses",
//         color:{
//             background:'white',
//             boxShadow:"0px 10px 20px 0px #e0c6f5",
//         },
//         barValue:60,
//         value:"4,270",
//         png:UilMoneywithdrawal,
//         series:[{
//             name:"Expenses",
        
//         data:[10,25,15,30,12,15,20],
           
//         }
//         ],},


// ]

const topproducts=[
    {
        id:1,
        name:"cheese cake",
        
        image:p1_img,
        review:4.5,
        sales:100
    
    },
    
    {
        id:3,
        name:"brown cake",
        
        image:p3_img,
        review:4.5,
        sales:100
    
    },
    
    {
        id:5,
        name:"choclate cake",
        
        image:p5_img,
        review:4.5,
        sales:100
    
    }
]
export const salesData = [
    { category: 'Cakes', sales: 450 },
    { category: 'Pastries', sales: 300 },
    { category: 'Breads', sales: 200 },
    { category: 'Cookies', sales: 150 },
  ];



