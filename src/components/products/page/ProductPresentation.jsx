import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from '../../../libs/ImageGallery';
import './ProductPresentation.scss'
import routes from '../../../router/routes'
import axios from 'axios';
import env from '../../../env';

const formatNumbers = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    return number.toString().replace(exp,rep);
}

const ProductPresentation = ({product, images, auth}) => {
    const [owner, setOwner] = useState(auth.shop ? product.shop._id === auth.shop._id : false)
    const [isInWishlist, setIsInWishlist] = useState(false);

    const actualiceWishlist = (userid) => {
        axios.get(`${env.API_URL}/user/${userid}/wishlist`)
            .then(res => {
                let have = false;

                res.data.forEach(element => {
                    if(element._id === product._id) {
                        have = true;
                    }
                })

                setIsInWishlist(have);
            })
            .catch(err => console.log(err));
    }

    const handleWishlist = () => {
        axios.put(`${env.API_URL}/user/${auth._id}/wishlist`, {
            productId: product._id
        })
        .then(res => {
            actualiceWishlist(auth._id)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        actualiceWishlist(auth._id)
    }, []);

    return (
        <>
            <h1>{product.name}</h1>

            <div className="presentation_info">
                <ImageGallery images={images} />

                <div className="text">
                    <p className='date'>Artículo publicado el {product.createdAt} - <Link to={routes.home}>{product.category.name}</Link> </p>
                    
                    <p className='description'>{product.description !== 'undefined' ? product.description : 'El comprador no adjuntó descripción.'}</p>
                    
                    <div className="chips">
                        {!product.inProcess && product.salable && <p>Se vende: ${formatNumbers(product.price)}</p>}
                        {!product.inProcess && product.tradable && <p>Es intercambiable</p>}
                        {product.inProcess && <p>En proceso</p>}
                        {!owner && <p style={{cursor: 'pointer'}} onClick={() => handleWishlist()}>
                            {isInWishlist ? 'Quitar' : 'Agregar'} a Deseados
                        </p>}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPresentation;
