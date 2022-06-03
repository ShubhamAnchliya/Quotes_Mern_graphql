
import CreateQuote from "./CreateQuote/CreateQuote"
import ErrorPage from "./Error/ErrorPage"
import Home from "./Home/Home"
import LogIn from "./LogIn/LogIn"
import OtherUserProfile from "./OtherUserProfile/OtherUserProfile"
import Profile from "./Profile/Profile"
import SignUp from "./SignUp/SignUp"

export const routes = [

  { path: '/', element :<Home/> },
  { path: '/home', element :<Home/> },
  { path: '/login', element :<LogIn/> },
  { path: '/signup', element :<SignUp/> },
  { path: '/profile', element :<Profile/> },
  { path:"/profile/:userid",element:<OtherUserProfile/> },
  { path: '/createquote', element :<CreateQuote/> },
  { path: '*', element :<ErrorPage/> },

]



