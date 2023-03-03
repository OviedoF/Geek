import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import env from '../env'
import NotFoundItem from './NotFoundItem'
import LoadingPage from '../global/LoadingPage'
import PaymentPurchaseSection from '../components/purchases/PaymentPurchase'


export default function PaymentPurchase() {
    const {id} = useParams();
    const { data, error, status } = useQuery('purchase', async () => {
        const response = await axios.get(`${env.API_URL}/purchase/${id}`)
        return response.data;
    });

  if(data && data.purchase) return (
    <main>
        <PaymentPurchaseSection purchase={data.purchase} />
    </main>
  )
}
