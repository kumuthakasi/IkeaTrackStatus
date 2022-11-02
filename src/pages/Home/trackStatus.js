import React, { useState, useEffect } from "react";
import Image from "../../assets/images/Logo.svg";
import Button from "@ingka/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage";

const initialState = {
  orderNumber: "",
  orderStatus: "",
  deliveryDate: "",
  customername: "",
  deliveryAddress: "",
  shipmentAddress: "",
  customerMobile: "",
  customerEmail: "",
  expectedDeliveryDate: "",
  deliveryDateLabel: " ",
  statusLabel: [],
  lineitem: [],
};
export default function TrackStatus() {
  const [data, setData] = useState(initialState);
  const [orderStatus, setOrderStatus] = useState(0);
  const [tableData, setTableData] = useState(initialState.lineitem);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const location = useLocation();

  const onNavigate = () => {
    navigate("/orderTracking");
  };

  const statusData = [
    t(data.statusLabel[0]),
    t(data.statusLabel[1]),
    t(data.statusLabel[2]),
    t(data.statusLabel[3]),
  ];
  console.log(data);
  useEffect(() => {
    const result = t(data.orderStatus);
    var index = statusData.indexOf(result);
    setOrderStatus(index);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
    setData(location.state.result.data);
    setTableData(data.lineitem);
  }, [language, data]);

  return (
    <div className="steppers">
      <div style={{ textAlign: "center" }}>
        <img src={Image} alt="..." style={{ width: "150px" }} />
      </div>
      {/* 1st section */}
      <div className="first-sections">
        <div className="date-time">
          <h4>
            {t("ORDER NO")}
            <span> {data.orderNumber}</span>
          </h4>
          <p>
            {t(data.deliveryDateLabel)}
            <span> {data.expectedDeliveryDate}</span>
          </p>
        </div>
        <div>
          <div className="process">
            <ul className="order_tracking">
              {statusData.map((val, index) => (
                <li
                  className={
                    orderStatus >= index ? "flex-fill active" : "flex-fill"
                  }
                  key={index}
                >
                  <div
                    className={
                      language === "ar" ? "track_block_rtl" : "track_block"
                    }
                  >
                    {/* <span style={orderStatus >= index ? active : disable}> */}
                    <span>{val}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 2nd section */}
      <div className="second-section">
        <h4>{t("Delivery Address")}</h4>
        <p>
          <b>{t("Customer Name")} : </b>
          {data.customername}
        </p>
        <p>
          <b>{t("Address")}:</b>
          {data.deliveryAddress}
        </p>
        <p>
          <b>{t("Contact")} :</b>
          {data.customerMobile}
        </p>
      </div>
      {/* 3rd section */}
      <div className="third-section">
        <h4>{t("Order Details")}</h4>
        <div className="table">
          <table class="table table-striped responsive trackingtable">
            <thead>
              <tr>
                <th>{t("Item Code")}</th>
                <th>{t("Item Name")}</th>
                <th>{t("Quantity")}</th>
                <th>{t("Price")}</th>
              </tr>
            </thead>
            <tbody class="table-wrap">
              {tableData && tableData.length != 0 ? (
                tableData.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.itemNo}</td>
                      <td>{value.description}</td>
                      <td>{value.quantity}</td>
                      <td>{value.lineAmount}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center no-data-found">
                  <td colSpan={12}>No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingBottom: "10px" }}>
        <Button
          href=""
          text={t("Click here to track another order")}
          type="primary"
          onClick={onNavigate}
        ></Button>
      </div>
    </div>
  );
}
