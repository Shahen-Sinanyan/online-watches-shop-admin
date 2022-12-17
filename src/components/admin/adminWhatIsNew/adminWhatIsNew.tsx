import  { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getLessProdId,
} from "./whatIsNewAPI/whatIsNewAPI";
import { getData } from "../adminAPI/adminAPI";

import sales from "../../assets/trolley.png";
import bell from "../../assets/notification.png";

function WhatIsNew() {
  const navigate = useNavigate();

  const [lessLength, setLessLength] = useState<number>(0);

  useEffect(() => {
    const fetchLessProd = async () => {
      let newLess : string[] = [];
      let currentOldLess : string[] = [];
      let fetchProducts = await getData();
      let fetchOldProdId = await getLessProdId();

      for (let item of fetchProducts) {
        if (item.quantity <= 10) {
          if (fetchOldProdId.includes(item.id)) {
            currentOldLess.push(item.id);
          } else {
            newLess.push(item.id);
          }
        }
      }
      setLessLength(newLess.length);
    };
    fetchLessProd();
  }, []);

  return (
    <div className="">
      <h1>what is new</h1>
      <div className="what_is_New_borad">
        <div>
          <h3>LESS PRODUCTS</h3>
          <div
            className="lessProd"
            onClick={() => navigate("/admin/less-products")}
          >
            <div className="lessProd_notify">
              {lessLength ? (
                <>
                  <img src={bell} />
                  <div className="lessProd_notify_num">{lessLength}</div>
                </>
              ) : null}
            </div>
            <img src={sales} />
          </div>
        </div>
        <div>
          <h3>NEW SALES</h3>
          <div>
            <img src={sales} />
          </div>
        </div>
        <div>
          <h3>NEW USERS</h3>
          <div>
            <img src={sales} />
          </div>
        </div>
        <div>
          <h3>NEW MESSAGES</h3>
          <div>
            <img src={sales} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatIsNew;
