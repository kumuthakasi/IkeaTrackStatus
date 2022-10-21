import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/Logo.svg";
import Button from "@ingka/button";
import { useNavigate } from "react-router-dom";
import Hyperlink from "@ingka/hyperlink";
import useLanguage from "../../hooks/useLanguage";

const initialState = {
  order_number: "",
  email_or_mobileNo: "",
};

const OrderTracking = () => {
  const { changeLanguage } = useLanguage();

  const [changeLang, setChangelang] = useState("en");
  const [fields, setFields] = useState(initialState);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang")
      ? localStorage.getItem("lang")
      : "en";
    languageChange(lang);
  }, []);

  const handleLanguageChange = (changeLang, e) => {
    e.preventDefault();
    i18n.changeLanguage(changeLang);
    languageChange(changeLang);
  };
  const languageChange = (lang) => {
    setChangelang(lang);
    changeLanguage(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  };
  const languageButton = () => {
    switch (changeLang) {
      case "ar":
        return (
          <div className="language">
            <Hyperlink
              color=""
              text="French"
              onClick={(e) => handleLanguageChange("fr", e)}
            />
            &nbsp;/&nbsp;
            <Hyperlink
              color=""
              text="English"
              onClick={(e) => handleLanguageChange("en", e)}
            />
          </div>
        );
      case "fr":
        return (
          <div className="language">
            <Hyperlink
              color=""
              text="العربية"
              onClick={(e) => handleLanguageChange("ar", e)}
            />
            &nbsp;/&nbsp;
            <Hyperlink
              color=""
              text="English"
              onClick={(e) => handleLanguageChange("en", e)}
            />
          </div>
        );
      default:
        return (
          <div className="language">
            <Hyperlink
              color=""
              text="العربية"
              onClick={(e) => handleLanguageChange("ar", e)}
            />
            &nbsp;/&nbsp;
            <Hyperlink
              color=""
              text="french"
              onClick={(e) => handleLanguageChange("fr", e)}
            />
          </div>
        );
    }
  };
  const handleChange = (field, e) => {
    setFields({ ...fields, [field]: e.target.value });
    // if (fields.order_number === "") {
    //   setError(true);
    // }
  };
  const onSubmit = () => {
    if (fields.order_number === "" && fields.email_or_mobileNo === "") {
      setError(true);
    } else {
      console.log(fields)
      setError(false);
      navigate("/trackstatus");
    }
  };
  return (
    <div className="tracking-page">
      <div className="tracking-section">
        <div className="logo-section">
          <img src={Logo} alt="..." className={changeLang === "ar" ? "logo-img-rtl":"logo-img"} />
          <div>{languageButton()}</div>
        </div>
        <div className="tracking-sides">
          <div className="track-left">
            <h2 style={{ margin: "0", paddingBottom: "10px" }}>
              {t("Track your Order")}
            </h2>
            <div
              aria-hidden="false"
              className="inline-message inline-message--informative"
            >
              <div>
                <span className="inline-message__body">
                  {t("message-content")}
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              changeLang === "ar" ? "track-right hr-rtl" : "track-right hr-ltr"
            }
          >
            <div className="form-field  form-field--error">
              <div className="input-field input-field--prefixed input-field--suffixed label-wrapper label-wrapper--text-input">
                <div className="input-field__wrapper">
                  <input
                    type="text"
                    id="example-id"
                    aria-describedby="helper-msg-id"
                    aria-required="false"
                    onChange={(e) => handleChange("order_number", e)}
                    value={fields.order_number}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="example-id"
                    className={fields.order_number != "" ? "value_label" : ""}
                    title="Label"
                  >
                    {t("Order Number")}
                  </label>
                  <span className="input-field__border"></span>
                </div>
              </div>
              <div className="form-field__content">
                <span
                  id="helper-msg-id"
                  aria-hidden="false"
                  className="form-field__message-wrapper"
                  type=""
                >
                  <span className="form-field__message">
                    {t("9-10 Digits, No-Spaces")}
                  </span>
                </span>
              </div>
              <div className="error-message">
                {error && fields.order_number === ""
                  ? t("Order Number is required")
                  : ""}
              </div>
            </div>
            <div className="form-field form-field--error">
              <div className="input-field input-field--prefixed input-field--suffixed label-wrapper label-wrapper--text-input">
                <div className="input-field__wrapper">
                  <input
                    type="text"
                    id="example-id"
                    aria-describedby="helper-msg-id"
                    aria-required="false"
                    onChange={(e) => handleChange("email_or_mobileNo", e)}
                    value={fields.email_or_mobileNo}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="example-id"
                    className={
                      fields.email_or_mobileNo != "" ? "value_label" : ""
                    }
                    title="Label"
                  >
                    {t("Email or Phone number")}
                  </label>
                  <span className="input-field__border"></span>
                </div>
              </div>
              <div className="form-field__content">
                <span
                  id="helper-msg-id"
                  aria-hidden="false"
                  className="form-field__message-wrapper"
                  type=""
                >
                  <span className="form-field__message">
                    {t("The email or phone number used to place the order")}
                  </span>
                </span>
              </div>
              <div className="error-message">
                {error && fields.email_or_mobileNo === ""
                  ? t("Phone Number is required")
                  : ""}
              </div>
            </div>
            <Button
              text={t("Find an Order")}
              type="primary"
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
