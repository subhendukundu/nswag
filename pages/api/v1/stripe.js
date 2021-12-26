import { postGraphQlData } from '../utils/api';
import { stripe } from '../utils/stripe';


export default function stripeCheckout(event, context) {
  try {
    const body = JSON.parse(event.body);
    console.log('<====== Checkout Body ======>', JSON.stringify(body));
    const {
      input: { object },
      session_variables: session
    } = body;
    const { metadata } = object;
    const userId = session['x-hasura-user-id'];

    /* const usersWithTicket = await postGraphQlData(getUserByPkWithTicket, {
      user_id: userId,
      ticket_id: price
    });


    const sessionData = await stripe.checkout.sessions.create({
      line_items: [
        {
          currency: 'usd',
          quantity: 1,
          amount: usersWithTicket?.data?.ticket?.price * 100,
          name: `${usersWithTicket?.data?.ticket?.event?.name} - ${usersWithTicket?.data?.ticket?.name}`
        }
      ],
      payment_method_types: ['card'],
      customer_email: usersWithTicket?.data?.users?.email,
      mode: 'payment',
      metadata: {
        user_id: userId,
        cost: price,
        ...metadata
      },
      success_url: `${process.env.FRONTEND_APP_URL}/events/${metadata?.event_id}`,
      cancel_url: `${process.env.FRONTEND_APP_URL}/events/${metadata?.event_id}`
    });
    console.log('sessionData', JSON.stringify(sessionData)); */
    return {
      statusCode: 200,
      body: JSON.stringify({
        // url: sessionData.url
        url: userId
      })
    };
  } catch (e) {
    console.log('error------->', e);
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
