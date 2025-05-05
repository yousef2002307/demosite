import { useAuth } from "@/utlis/AuthContext";
import { LangContext } from "@/utlis/langContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Tab, Nav } from 'react-bootstrap';

export default function SignUp() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { lang } = useContext(LangContext);
  const { setLocalUser } = useAuth();
  let [loginMsg, setLoginMsg] = useState("");
  let [ErrorMsg, setErrorMsg] = useState("");

  let [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    btw: null
  });
  const [userToken, setuserToken] = useState(null);

  function getUserData(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  async function getResponse() {
    let response = await axios
      .post(`${baseUrl}/${endpoint}`, user)
      .catch((error) => {
        console.log(error.response.data);
        setErrorMsg(error.response.data.message.split("(")[0]);
        setLoginMsg("");
      });

    console.log(response);
    console.log("response is loaded");
    localStorage.setItem("token", response.data.token);
    getUserData(response.data.user);
    setLocalUser(response.data.user);
    setLoginMsg(response.data.message);
    setErrorMsg("");
  }

  function submitRegister(e) {
    e.preventDefault();
    getResponse();
  }

  function getUserInfo(e) {
    let userInfo = { ...user };
    userInfo[e.target.name] = e.target.value;
    setUser(userInfo);
  }

  function renderForm(type) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (type === "customer") {
            getResponse("login");
          } else if (type === "vendor") {
            getResponse("vendor/login");
          }
          navigator("/home");
        }}
        className="comment-form form-submit"
        acceptCharset="utf-8"
      >
        <fieldset className="">
          <label className="fw-6">{lang["Name"]}</label>
          <input
            type="text"
            className="tb-my-input"
            name="name"
            placeholder={lang["Name"]}
            onChange={getUserInfo}
          />
          <div className="icon">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8127 4.5C11.8127 5.24592 11.5164 5.96129 10.989 6.48874C10.4615 7.01618 9.74615 7.3125 9.00023 7.3125C8.25431 7.3125 7.53893 7.01618 7.01149 6.48874C6.48404 5.96129 6.18773 5.24592 6.18773 4.5C6.18773 3.75408 6.48404 3.03871 7.01149 2.51126C7.53893 1.98382 8.25431 1.6875 9.00023 1.6875C9.74615 1.6875 10.4615 1.98382 10.989 2.51126C11.5164 3.03871 11.8127 3.75408 11.8127 4.5ZM3.37598 15.0885C3.40008 13.6128 4.00323 12.2056 5.05536 11.1705C6.10749 10.1354 7.52429 9.55535 9.00023 9.55535C10.4762 9.55535 11.893 10.1354 12.9451 11.1705C13.9972 12.2056 14.6004 13.6128 14.6245 15.0885C12.86 15.8976 10.9413 16.3151 9.00023 16.3125C6.99323 16.3125 5.08823 15.8745 3.37598 15.0885Z"
                stroke="#B6B6B6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </fieldset>
        <fieldset className="">
          <label className="fw-6">{lang["Username"]}</label>
          <input
            type="text"
            className="tb-my-input"
            name="username"
            placeholder={lang["Username"]}
            onChange={getUserInfo}
          />
          <div className="icon">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8127 4.5C11.8127 5.24592 11.5164 5.96129 10.989 6.48874C10.4615 7.01618 9.74615 7.3125 9.00023 7.3125C8.25431 7.3125 7.53893 7.01618 7.01149 6.48874C6.48404 5.96129 6.18773 5.24592 6.18773 4.5C6.18773 3.75408 6.48404 3.03871 7.01149 2.51126C7.53893 1.98382 8.25431 1.6875 9.00023 1.6875C9.74615 1.6875 10.4615 1.98382 10.989 2.51126C11.5164 3.03871 11.8127 3.75408 11.8127 4.5ZM3.37598 15.0885C3.40008 13.6128 4.00323 12.2056 5.05536 11.1705C6.10749 10.1354 7.52429 9.55535 9.00023 9.55535C10.4762 9.55535 11.893 10.1354 12.9451 11.1705C13.9972 12.2056 14.6004 13.6128 14.6245 15.0885C12.86 15.8976 10.9413 16.3151 9.00023 16.3125C6.99323 16.3125 5.08823 15.8745 3.37598 15.0885Z"
                stroke="#B6B6B6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </fieldset>
        <fieldset className="t">
          <label className="fw-6">{lang["Email"]}</label>
          <input
            type="email"
            className="tb-my-input"
            name="email"
            placeholder={lang["Email"]}
            onChange={getUserInfo}
          />
          <div className="icon">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8127 4.5C11.8127 5.24592 11.5164 5.96129 10.989 6.48874C10.4615 7.01618 9.74615 7.3125 9.00023 7.3125C8.25431 7.3125 7.53893 7.01618 7.01149 6.48874C6.48404 5.96129 6.18773 5.24592 6.18773 4.5C6.18773 3.75408 6.48404 3.03871 7.01149 2.51126C7.53893 1.98382 8.25431 1.6875 9.00023 1.6875C9.74615 1.6875 10.4615 1.98382 10.989 2.51126C11.5164 3.03871 11.8127 3.75408 11.8127 4.5ZM3.37598 15.0885C3.40008 13.6128 4.00323 12.2056 5.05536 11.1705C6.10749 10.1354 7.52429 9.55535 9.00023 9.55535C10.4762 9.55535 11.893 10.1354 12.9451 11.1705C13.9972 12.2056 14.6004 13.6128 14.6245 15.0885C12.86 15.8976 10.9413 16.3151 9.00023 16.3125C6.99323 16.3125 5.08823 15.8745 3.37598 15.0885Z"
                stroke="#B6B6B6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </fieldset>
        {
          type === "vendor" ? (
            <fieldset className="t">
            <label className="fw-6">BTW</label>
            <input
              type="email"
              className="tb-my-input"
              name="btw"
              placeholder={'Enter Your BTW Number'}
              onChange={getUserInfo}
            />
            <div className="icon">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8127 4.5C11.8127 5.24592 11.5164 5.96129 10.989 6.48874C10.4615 7.01618 9.74615 7.3125 9.00023 7.3125C8.25431 7.3125 7.53893 7.01618 7.01149 6.48874C6.48404 5.96129 6.18773 5.24592 6.18773 4.5C6.18773 3.75408 6.48404 3.03871 7.01149 2.51126C7.53893 1.98382 8.25431 1.6875 9.00023 1.6875C9.74615 1.6875 10.4615 1.98382 10.989 2.51126C11.5164 3.03871 11.8127 3.75408 11.8127 4.5ZM3.37598 15.0885C3.40008 13.6128 4.00323 12.2056 5.05536 11.1705C6.10749 10.1354 7.52429 9.55535 9.00023 9.55535C10.4762 9.55535 11.893 10.1354 12.9451 11.1705C13.9972 12.2056 14.6004 13.6128 14.6245 15.0885C12.86 15.8976 10.9413 16.3151 9.00023 16.3125C6.99323 16.3125 5.08823 15.8745 3.37598 15.0885Z"
                  stroke="#B6B6B6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </fieldset>
          ):''
        }
        <fieldset className="">
          <label className="fw-6">{lang["Password"]}</label>
          <input
            id="password-field"
            type="password"
            className="input-form password-input"
            placeholder={lang["Password"]}
            name="password"
            onChange={getUserInfo}
          />
          <div className="icon">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z"
                stroke="#B6B6B6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </fieldset>
        <fieldset className="">
          <label className="fw-6">{lang["Confirm Password"]}</label>
          <input
            id="password-field1"
            type="password"
            className="input-form password-input"
            placeholder={lang["Password"]}
            name="password_confirmation"
            onChange={getUserInfo}
          />
          <div className="icon">
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z"
                stroke="#B6B6B6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </fieldset>
        {loginMsg ? (
          <p className=" text-success m-3 text-capitalize">{loginMsg}</p>
        ) : (
          ""
        )}
        {ErrorMsg ? (
          <p className=" text-danger m-3 text-capitalize">{ErrorMsg}</p>
        ) : (
          ""
        )}
        <button className="sc-button" name="submit" type="submit">
          <span>{lang["Signup"]}</span>
        </button>
      </form>
    );
  }

  return (
    <div
      className="modal fade popup login-form p-3"
      id="popup_bid2"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-body space-y-20 pd-40 style2">
            <div className="wrap-modal flex">
              <div className="images flex-none relative">
                <img
                  alt="images"
                  src="/assets/images/section/register.jpg"
                  width={384}
                  height={854}
                />
              </div>
              <div className="content p-0">
                <div className="comments">
                  <div className="respond-comment">
                    <div className="content p-4">
                      <h1 className="title-login mb-3">{lang["Signup"]}</h1>
                      <Tab.Container defaultActiveKey="customer">
                        <Nav variant="tabs" className="mb-2" > 
                          <Nav.Item style={{ width: "50%", textAlign: "center" }}>
                            <Nav.Link eventKey="customer" style={{ color: "#FF7101",fontWeight: "bold" }}>
                              {lang["Customer"]}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item style={{ width: "50%", textAlign: "center" }}>
                            <Nav.Link eventKey="vendor" style={{ color: "#FF7101",fontWeight: "bold" }}>
                              {lang["Vendor"]}
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>

                        <Tab.Content>
                          <Tab.Pane eventKey="customer">
                            {renderForm("customer")}
                          </Tab.Pane>
                          <Tab.Pane eventKey="vendor">
                            {renderForm("vendor")}
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </div>
                </div>
                <div className="text-box text-center fs-14">
                  {lang["Do you have an account?"]}{" "}
                  <a
                    className="font-2 fw-7 fs-14 color-popup text-color-3"
                    data-bs-toggle="modal"
                    data-bs-target="#popup_bid"
                  >
                    {lang["Login"]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
