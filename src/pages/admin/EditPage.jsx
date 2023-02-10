import React from 'react'
import axios from 'axios';
import env from '../../env';
import { useQuery } from 'react-query';
import LoadingPage from '../../global/LoadingPage';
import ErrorPage from '../../global/ErrorPage';
import RenderCategoriesToEdit from '../../components/admin/EditComponentsPage/RenderCategoriesToEdit';
import RenderSubCategoriesToEdit from '../../components/admin/EditComponentsPage/RenderSubCategoriesToEdit';
import './EditPage.scss';

export default function EditPage() {
    const { data: categories, error: categoriesError, status: categoriesStatus } = useQuery('categorías', async () => {
        const response = await axios.get(`${env.API_URL}/category`)
        return response.data;
    });

    const { data: subCategories, error: subCategoriesError, status: subCategoriesStatus } = useQuery('subCategorías', async () => {
        const response = await axios.get(`${env.API_URL}/subCategory`)
        return response.data;
    });

    if(subCategoriesStatus === 'loading' && categoriesStatus === 'loading') return <LoadingPage />

    if(subCategoriesStatus === 'error' && categoriesStatus === 'error') return <ErrorPage />

    return (
        <main id='admin_editing_page'>
            <h1>Editar componentes</h1>

            <RenderCategoriesToEdit categories={categories}/>

            <RenderSubCategoriesToEdit subCategories={subCategories} categories={categories} />
        </main>
    )
}
