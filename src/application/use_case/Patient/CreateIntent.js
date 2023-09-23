import  config from "../../../config/config.js"

import stripe from "stripe";
const Sk = config.StripeSk


const stripeInstance = stripe(Sk);




const createIntent = async (id,name) =>{
 
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Dr :${name}`,
          },
          unit_amount: 60000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: `http://localhost:5173/videoBookingpage/${id}`,
    metadata: {
      date: '12346',
      time: 'fsdfsdf'
    }
  });

  
  
      console.log(session);
      return (session.url)

 }
 export default createIntent