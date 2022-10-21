import React, { useState, useEffect } from "react";
import Image from "../../assets/images/Logo.svg";
import Button from "@ingka/button";
import { useNavigate } from "react-router-dom";
import API from "../../static/static.json";
import { useTranslation } from "react-i18next";
import Table, { TableBody, TableHeader } from "@ingka/table";
import useLanguage from "../../hooks/useLanguage";
import moment from "moment";

export default function TrackStatus() {
  const [data, setData] = useState(API.data);
  const [orderStatus, setOrderStatus] = useState(0);
  const [tableData, setTableData] = useState(data.lineitem);
  const [statusData, setStatusData] = useState(data.statusLabel);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const onNavigate = () => {
    navigate("/orderTracking");
  };

  useEffect(() => {
    const result = API.data;
    var index = statusData.indexOf(result.orderStatus);
    setOrderStatus(index);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  }, [language]);

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
            {t("Delivered On")}
            <span> {moment(data.deliveryDate).format("MMMM DD YYYY")}</span>
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
          <Table className={null} fullWidth>
            <TableHeader>
              <tr>
                <th>{t("Item Code")}</th>
                <th>{t("Item Name")}</th>
                <th>{t("Quantity")}</th>
                <th>{t("Price")}</th>
              </tr>
            </TableHeader>
            <TableBody striped>
              {tableData && tableData.length != 0 ? (
                tableData.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.item_code}</td>
                      <td>{value.item_name}</td>
                      <td>{value.quantity}</td>
                      <td>{value.price}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center no-data-found">
                  <td colSpan={12}>No Data Found</td>
                </tr>
              )}
            </TableBody>
          </Table>
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
