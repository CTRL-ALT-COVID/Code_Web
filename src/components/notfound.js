import React from "react";
import error from "../assets/error404.svg";

export const notfound = () => (
  <div>
    <img className="img-info" src={error} alt="coming soon" style={{marginTop: 50}}/>
  </div>
);
