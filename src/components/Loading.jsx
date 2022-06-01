import { CircleNotch } from "phosphor-react";
import React from "react";

function Loading() {
  return (
    <div className="loading">
      <CircleNotch weight="bold" className="circle" />
    </div>
  );
}

export default Loading;
