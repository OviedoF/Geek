import routes from "../../router/routes";

export default function redirectsList(dataToGet, id, myDuviId) {
  const dataNav = {
    home: routes.home,
    shoppingCart: '/cart',
    user: [
      ["Perfil", routes.user],
      ["Mis seguidos", routes.follows],
      ["Lista de deseados", routes.wishlist],
    ],
    products: [
      // ["Destacados", `/products/featured`],
      ["Descubrir", routes.products],
    ],
    duvis: [
      ["Descubrir", routes.viewShops],
      // ["Tiendas del mes", `/duvis/featured`]
    ],
    myDuvi: [
      ["Administrar", routes.shop],
      ["Publicar producto", routes.createProduct],
      // ["Estadísticas", "${routes.shop}/stadistics"],
    ],
    shopCreate: routes.requestShop,
    favs: [
      ["Productos favoritos", routes.productsFavs],
      ["Tiendas a las que sigo", routes.shopsFavs],
    ],
    admin: [
      ["Crear categoría", routes.createCategory],
      ["Crear subcategoría", routes.createSubcategory],
      ["Mensajes y consultas", routes.messages]
    ],
  };

  return dataNav[dataToGet];
};