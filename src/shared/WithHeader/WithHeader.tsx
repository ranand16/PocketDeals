import React from "react";
import classnames from "classnames";
import styles from "./WithHeader.module.scss";
import { DispatchProps, StateProps } from "./index";
import Header from "../Header";
import Register from "../Register";

interface Props extends DispatchProps, StateProps {
  children: React.ReactNode;
}

const WithHeader: React.FunctionComponent<Props> = ({
  children,
  authUIState,
  setAuthStateRequest
}: Props) => {
  return (
    <section
      className={classnames(styles.withHeader)}
    >
      <Header
        authUIState ={authUIState}
        setAuthStateRequest={setAuthStateRequest}
      />
      <Register 
      />
      <div className={classnames(styles.container, "flex-1")}>{children}</div>
    </section>
  );
};

export default WithHeader;
