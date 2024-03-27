import React from "react";
import styles from "./MarkerCreator.module.scss";

export type MarkerCreatorProps = {
  isOpen: boolean;
  toggleFunc: (param: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MarkerCreator: React.FC<MarkerCreatorProps> = ({
  isOpen,
  toggleFunc,
  className = "",
  style = {},
}) => {
  const closeCreator = () => {
    toggleFunc(false);
  }

  const saveNewMarker = (event: React.FormEvent) => {
    event.preventDefault();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${className}`} style={style}>
      <span className={styles.backgorund} onClick={closeCreator} />

      <div className={styles.content}>
        <form onSubmit={saveNewMarker}>
          <h4>Informações marcador mapa</h4>
          <p>
            <label htmlFor="title">Título</label>
            <input id="title" name="title" type="text" placeholder="Insira um título breve. Pode ser o nome da localidade" />
          </p>
        </form>
      </div>
    </div>
  )
}