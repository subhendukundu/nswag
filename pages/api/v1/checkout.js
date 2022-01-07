import { postGraphQlData } from '../../../utils/stripe';
import { stripe } from '../../../utils/stripe';


export default function stripeCheckout(event, res) {
  try {
    if (event.method !== 'POST') {
      res.status(401).json({ message: 'Invalid Method' });
    }
    console.log('<====== Checkout Body ======>', event.body);
    const { body } = event;
    console.log('<====== Checkout Body ======>', JSON.stringify(body));
    const {
      input: { object },
      session_variables: session
    } = body;
    const { metadata } = object;
    const userId = session?.['x-hasura-user-id'];

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
    res.status(200).json({
      // url: sessionData.url
      url: userId
    })
  } catch (e) {
    console.log('error------->', e);
    res.status(500).json({ message: e.message });
  }
};
