import React from "react";
import { array, bool, object, oneOfType, string } from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer/Footer.component";

import styles from "./LayoutMain.module.scss";

const LayoutMain = ({ children, title, fullContent, hideTitle, buttonsHide, buttons }) => {
  return (
    <div>
      <Header />
      <main className={[styles["main-content"], fullContent ? styles["full-content"] : ""].join(" ")}>
        {title && !hideTitle ? (
          <div className={styles["page-header"]}>
            <h2>{title}</h2>
            {!buttonsHide && buttons ? <div className={styles["buttons"]}>{buttons}</div> : null}
          </div>
        ) : null}
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

LayoutMain.defaultProps = {
  buttons: null,
  buttonsHide: false,
  title: "",
  fullContent: false,
  hideTitle: false
};

LayoutMain.propTypes = {
  buttons: oneOfType([array, object]),
  buttonsHide: bool,
  children: object.isRequired,
  fullContent: bool,
  hideTitle: bool,
  title: string
};

export default LayoutMain;
