import React, { useState, useEffect } from 'react';
import EditSubCategoryModal from './modals/EditSubCategoryModal';

function SubCategoryCard({subCategory, setIsEditing}) {
    return (
        <div className="category_card item_card">
            <h3>{subCategory.name}</h3>
            
            <button className='edit_button' onClick={(e => setIsEditing(subCategory))}>
                Editar
            </button>
        </div>
    )
}

const RenderSubCategoriesToEdit = ({subCategories, categories}) => {
    const [isEditing, setIsEditing] = useState(false)

  return (
    <>
        <h2>Sub-Categorías</h2>

        {isEditing && <EditSubCategoryModal isEditing={isEditing} setIsEditing={setIsEditing} categories={categories} />}

        <div className="items_container categories_container">
            {subCategories && subCategories.map(item => (
                <SubCategoryCard subCategory={item} setIsEditing={setIsEditing}  />
            ))}
        </div>
    </>
  )
}

export default RenderSubCategoriesToEdit;
