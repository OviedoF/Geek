import React, { useState, useEffect } from 'react';
import './CategorySelect.scss'

const Card = ({category, eskeleton}) => {
    return (
      <li className="card">
        <img src={category.imageUrl || 'https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg' } alt="Background card" className='background_card' />
        <h2>{category.name}</h2>
        <p>{category.description}</p>
      </li>
    )
  }

const CardSkeleton = ({category, eskeleton}) => {
  return (
    <li className="card">
      <img src={'https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg' } alt="Background card" className='background_card' />
    </li>
  )
}

const CategorySelect = ({categories}) => {
    const [moveClass, setMoveClass] = useState('');
    const [carouselItems, setCarouselItems] = useState(categories);

    useEffect(() => {
      document.documentElement.style.setProperty('--num', carouselItems.length);
    }, [carouselItems])
    
    const handleAnimationEnd = () => {
      if(moveClass === 'prev'){
        shiftNext([...carouselItems]);
      }else if(moveClass === 'next'){
        shiftPrev([...carouselItems]);
      }
      setMoveClass('')
    }
    
    const shiftPrev = (copy) => {
      let lastcard = copy.pop();
      copy.splice(0, 0, lastcard);
      setCarouselItems(copy);
    }
    
    const shiftNext = (copy) => {
      let firstcard = copy.shift();
      copy.splice(copy.length, 0, firstcard);
      setCarouselItems(copy);
    }
    
    if(!categories) return (
      <>
        <h2>Elije entre nuestras categorías</h2>
    
        <div className="carouselwrapper module-wrapper">
            <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
              {[1, 2, 3, 4].map((item, index) => 
                  <CardSkeleton key={item} />
              )}
            </ul>
        </div>
    </>
    )

    return (
        <>
            <h2>Elije entre nuestras categorías</h2>
        
            <div className="carouselwrapper module-wrapper">
                <div className="ui">
                <button onClick={() => setMoveClass('next')} className="prev">
                    <span className="material-icons">chevron_left</span>
                </button>
                <button onClick={() => setMoveClass('prev')} className="next">
                    <span className="material-icons">chevron_right</span>
                </button>
                </div>
                <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} carousel`}>
                  {carouselItems.map((category, index) => 
                      <Card key={category + index} category={category} />
                  )}
                </ul>
            </div>
        </>
    )
}

export default CategorySelect;
