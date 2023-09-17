import  config from "../../../config/config.js"

import stripe from "stripe";
const Sk = config.StripeSk


const stripeInstance = stripe(Sk);




const createIntent = async () =>{

    const session = await stripeInstance.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });

      return (session.url)

 }
 export default createIntent