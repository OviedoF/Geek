import React, { useState, useEffect } from 'react';
import styles from "./HistorialContainerLocalShop.module.scss";
import { useSelector } from "react-redux";
import LocalSellCard from "./LocalSellCard";

export default function HistorialContainerLocalShop({ history, shipping, perfil }) {
  const auth = useSelector(state => state.auth);
  const [stateSelected, setStateSelected] = useState('En proceso');
  const [filteredByState, setFilteredByState] = useState([]);

  useEffect(() => {
    setFilteredByState(history.filter(el => el.state === stateSelected))
  }, [stateSelected, history]);

  const grid_template = {
    display: "grid",
    gridTemplateColumns:"repeat(5, 1fr)",
    justifyItems: "center"
  };

  return (
    <section style={{ marginTop: "10px" }}>
       <div className={styles.buttons_state}>
        <button onClick={(e) => setStateSelected(e.target.value)} value={'En proceso'}>
          En proceso
        </button>

        <button onClick={(e) => setStateSelected(e.target.value)} value={'Confirmada'}>
          Confirmadas
        </button>

        <button onClick={(e) => setStateSelected(e.target.value)} value={'Completada'}>
          Completadas
        </button>
      </div>

      <ul className={styles.historial_list} style={grid_template}>
        <li>Imàgen</li>
        <li>Nombre</li>
        <li>Estado</li>
        <li>Productos</li>
        {history[0] && auth.duvi === history[0].seller && <li>Autorizar compra</li>}
      </ul>

      <div className={styles.history_cards_container} style={{display: 'flex', flexDirection: 'column-reverse'}}>
        {filteredByState.map((el) => (
          <LocalSellCard
            buy={el}
            perfil={perfil}
            isSeller={auth.duvi === el.seller}
            stateSelected={stateSelected}
            setFilteredByState={setFilteredByState}
          />
        ))}
      </div>
    </section>
  );
}
