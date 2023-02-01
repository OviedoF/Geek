import React from 'react';
import Slider from 'react-slick';
import productsData from './products.data';

const ProductsView = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    

    return (
        <div {...settings}>
            <h1>Mira algunos de nuestros productos destacados destacados!</h1>

            <Slider>
            {productsData.map((product, index) => {
                return (
                    <div key={index} className="card">
                        <div className="card-top">
                            <img src={product.image} alt={product.name} />
                            <h1>{product.title}</h1>
                        </div>

                        <div className="card-bottom">
                            <h3>{product.price}</h3>
                            <p>{product.category}</p>
                        </div>
                    </div>
                );
            }
            )}
            </Slider>
        </div>
    );
}

export default ProductsView;
