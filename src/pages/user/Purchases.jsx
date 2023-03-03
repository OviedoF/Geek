import axios from 'axios'
import React from 'react'
import {useQuery} from 'react-query'
import { useSelector } from 'react-redux'
import PurchaseCard from '../../components/purchases/PurchaseCard'
import env from '../../env'
import routes from '../../router/routes'

export default function Purchases() {
  const auth = useSelector(state => state.auth)
  const {data: purchases, error, loading} = useQuery('GET_PURCHASES', {
    queryKey: 'GET_PURCHASES',
    queryFn: async () => {
      return axios(`${env.API_URL}/purchase/buyer/${auth._id}`)
        .then(res => res.data)
    }
  })

  const getPurchaseInfo = (purchase) => {
    const data = {};

    data._id = purchase._id;

    // Transform createdAt to a readable date
    const date = new Date(purchase.createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    data.date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    switch (purchase.state) {
      case 'pending':
        data.status = 'Pendiente';
        data.button = {
          text: 'Confirmar',
          link: `${routes.confirmPath}/${purchase._id}`
        }
        break;
      case 'inDebt':
        data.status = 'Por pagar';
        data.button = {
          text: 'Pagar',
          link: `${routes.paymentPurchasePath}/${purchase._id}`
        }
        break;

      case 'paid':
        data.status = 'Pagado';

        data.button = {
          text: 'Ver estado de envíos',
          link: `${routes.shippingPath}/${purchase._id}`
        }
      default:
        break;
    }
    
    if(purchase.trade && purchase.amount) data.type = 'Compra e intercambio';

    if(purchase.trade && !purchase.amount) data.type = 'Intercambio';

    if(!purchase.trade && purchase.amount) data.type = 'Compra';

    return data;
  }

  return (
    <main>
      <h1>Compras</h1>

      <section className="purchases_container" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {purchases && purchases.map(purchase => (
          <PurchaseCard purchase={getPurchaseInfo(purchase)} key={purchase._id} />
        ))}
      </section>
    </main>
  )
}