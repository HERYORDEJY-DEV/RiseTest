import authentication from "./authSlice";
import wallet from "./walletSlice";
import plans from "./plansSlice";
import general from "./generalSlice";
import { combineReducers } from "@reduxjs/toolkit";
// ...

export default combineReducers({ authentication, wallet, plans, general });
