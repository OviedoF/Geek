import routes from "../../router/routes";

export default function redirectsList(dataToGet, id, myDuviId) {
  const dataNav = {
    home: routes.home,
    shoppingCart: '/cart',
    user: [
      ["Perfil", `/user/${id}`],
      ["Mis seguidos", `/user/${id}/follows`],
      ["Lista de deseados", `/user/${id}/wishlist`],
      ["Compras en línea", `/user/${id}/states`],
      ["Retiros en locales", `/user/${id}/local-purchase`]
    ],
    products: [
      // ["Destacados", `/products/featured`],
      ["Descubrir", `/products`],
    ],
    duvis: [
      ["Descubrir", `/duvis`],
      // ["Tiendas del mes", `/duvis/featured`]
    ],
    myDuvi: [
      ["Administrar", `${routes.shop}`],
      ["Publicar producto", `/products/add`],
      // ["Estadísticas", "${routes.shop}/stadistics"],
      ["Ventas a distancia", `${routes.shop}/states`],
      ["Ventas en el local", `${routes.shop}/local-purchase`]
    ],
    shopCreate: routes.requestShop,
    favs: [
      ["Productos favoritos", `/user/${id}/favorites/products`],
      ["Tiendas a las que sigo", `/user/${id}/favorites/duvis`],
    ],
    admin: [
      ["Crear categoría", "/admin/category/add"],
      ["Crear subcategoría", "/admin/category/subcategory/add"],
      ["Mensajes y consultas", "/admin/questions"]
    ],
  };

  return dataNav[dataToGet];
};