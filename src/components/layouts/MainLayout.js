import React from "react";
import Detailbar from "../Detailbar";
import "./layout.css";

import { useDetail } from "../App";

const MainLayout = (props) => {
  const [showDetail, , detailTodo] = useDetail();
  return (
    <div>
      <div className={`main ${showDetail && detailTodo ? "main-grid" : ""}`}>
        <div>{props.children}</div>
        {showDetail && detailTodo && <Detailbar />}
      </div>
    </div>
  );
};

export default MainLayout;
