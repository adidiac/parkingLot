import { userRoles, pages } from "../utils/enums";
import Home from "../Pages/Home";

export const pagesDictionary = {
    "HOME": (options) => <Home/>,
}
export const initialStatePage = pagesDictionary[pages.HOME]();

export const userInitialState = null