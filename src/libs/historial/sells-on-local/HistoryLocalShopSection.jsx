// import React from 'react';
// import styles from "../HistorialContainer.module.scss";

// const HistoryLocalShopSection = ({history, auth, shipping}) => {
//     const grid_template = {
//         display: "grid",
//         gridTemplateColumns:"repeat(5, 1fr)",
//         justifyItems: "center"
//       };

//     return (
//         <section>
//             <h3>En proceso</h3>
//             <hr />
//             <ul className={styles.historial_list} style={grid_template}>
//                 <li>Imàgen</li>
//                 <li>Nombre</li>
//                 <li>Estado</li>
//                 <li>Productos</li>
//                 {history[0] && auth.duvi === history[0].seller && <li>Autorizar compra</li>}
//             </ul>

//             <div className={styles.history_cards_container} style={{display: 'flex', flexDirection: 'column-reverse'}}>
//                 {history.map((el) => (
//                 <LocalSellCard
//                     buy={el}
//                     shipping={shipping}
//                     isSeller={auth.duvi === el.seller}
//                 />
//                 ))}
//             </div>
//         </section>
//     );
// }

// export default HistoryLocalShopSection;
