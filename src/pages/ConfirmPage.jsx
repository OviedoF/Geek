import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import env from '../env'
import NotFoundItem from './NotFoundItem'
import LoadingPage from '../global/LoadingPage'
import ConfirmPurchase from '../components/purchases/1. ConfirmPurchase'
import { useState } from 'react'
import ErrorPage from '../global/ErrorPage'

export default function ConfirmPage() {
    const {id} = useParams();
    const { data, error, status } = useQuery('user', async () => {
        const response = await axios.get(`${env.API_URL}/purchase/${id}`)
        return response.data;
    });
    const [postStatus, setPostStatus] = useState({status: 'idle'})

    if(status === 'loading' || postStatus.status === 'loading') return <LoadingPage />

    if(postStatus.status === 'error') return <ErrorPage />

    if(status === 'error') return <NotFoundItem title={'No se ha encontrado la transacción! :('} subtitle={'Esto puede deberse a que se haya cancelado.'} />

    if(data && data.purchase.state !== 'pending') return (
        <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <NotFoundItem title={'No se ha encontrado la transacción! :('} subtitle={'Esto puede deberse a que ya se haya aceptado o cancelado!.'} />
        </main>
    )

    if(data && data.purchase) return (
        <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ConfirmPurchase purchase={data.purchase} setPostStatus={setPostStatus} />
        </main>
    )
}
