import React from "react";
// import { useHistory } from "react-router-dom";
import classnames from "classnames";

import classes from "./Header.module.scss";
import {
  TextField,
} from "@material-ui/core";

interface Props {
  setAuthStateRequest: any,
  authUIState: boolean
}

const Header: React.FunctionComponent<Props> = ({
  setAuthStateRequest,
  // authUIState
}: Props) => {

  const setRegisterUI = () => {
    setAuthStateRequest(true)
  }

  return (
    <header className={classnames("d-flex", classes.header)}>
      <div className={classnames("d-flex","align-center",classes.logo)}>
        PocketMart
      </div>
      <div className={classnames("d-flex", classes.searchField)}>
        <TextField id="search" label="Search field" type="search" variant="outlined" />
      </div>
      <div className={classnames("d-flex", classes.userInfo)}>
        <img 
          className={classnames(classes.avatar, classes.headerIcons)} 
          src={"https://cdn0.iconfinder.com/data/icons/famous-characters-add-on-vol-2-glyph/48/Sed-32-512.png"} 
          alt={"avatar"} 
          onClick={setRegisterUI}
        />
      </div>
    </header>
  );
};

export default Header;
