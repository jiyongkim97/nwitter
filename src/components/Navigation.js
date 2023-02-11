import React from "react";
import {Link} from "react-router-dom"
import profile from "../routes/Profile";

const Navigation = () => <nav>
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/profile">Profile</Link>
  </li>
</ul>
</nav>;
export default Navigation