import React, { useState } from 'react'
import EditCategoryModal from './modals/EditCategoryModal'

function CategoryCard({category, setIsEditing}) {
    return (
        <div className="category_card item_card">
            <h3>{category.name}</h3>
            
            <button className='edit_button' onClick={(e => setIsEditing(category))}>
                Editar
            </button>
        </div>
    )
}

export default function RenderCategoriesToEdit({categories}) {
    const [isEditing, setIsEditing] = useState(false)

  return (
    <>
        <h2 style={{marginTop: 0}}>Categorías</h2>

        {isEditing && <EditCategoryModal setIsEditing={setIsEditing} data={isEditing} />}

        <div className="items_container categories_container">
            {categories.map(category => (
                <CategoryCard category={category} setIsEditing={setIsEditing} />
            ))}
        </div>
    </>
  )
}
