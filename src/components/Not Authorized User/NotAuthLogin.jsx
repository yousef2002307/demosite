import { useAuth } from "@/utlis/AuthContext";
import { LangContext } from "@/utlis/langContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header1 from "../headers/Header1";
import Header2 from "../headers/Header2";
import { Tab, Nav } from "react-bootstrap";

export default function NotAuthLogin() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { lang } = useContext(LangContext);
  const { setUserType } = useAuth();
  const { setLocalUser } = useAuth();
  let [loginMsg, setLoginMsg] = useState("");
  let [ErrorMsg, setErrorMsg] = useState("");
  let [UserToken, setUserToken] = useState();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let navigator = useNavigate();

  function getUserData(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  async function getResponse(endpoint) {
    let response = await axios
      .post(`${baseUrl}/${endpoint}`, user)
      .catch((error) => {
        console.log(error.response.data);
        setErrorMsg(error.response.data.message.split("(")[0]);
        setLoginMsg("");
      });

    console.log(response);
    localStorage.setItem("token", response.data.token);
    getUserData(response.data.user);
    setUserToken(response.data.token);
    setLocalUser(response.data.user);
    setLoginMsg(response.data.message);
    setErrorMsg("");

    let tokenPost = await axios.post(
      `https://develop.sayarti.nl/api/v1/en/vendor/login`,
      {
        token: UserToken,
      }
    );
  }

  function submitRegister(e) {
    e.preventDefault();
    if (user.type === "customer") {
      getResponse("login");
    } else {
      getResponse("vendor/login");
    }
    navigator("/home");
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
          localStorage.setItem("userType", type);
          navigator("/home");
        }}
        className="comment-form form-submit"
        acceptCharset="utf-8"
      >
        <fieldset>
          <label className="fw-6">{lang["Email"]}</label>
          <input
            type="text"
            name="email"
            className="tb-my-input"
            placeholder={lang["Email"]}
            onChange={getUserInfo}
          />
        </fieldset>

        <fieldset className="style-wrap">
          <label className="fw-6">{lang["Password"]}</label>
          <input
            type="password"
            name="password"
            className="input-form password-input"
            placeholder={lang["Password"]}
            onChange={getUserInfo}
          />
        </fieldset>

        {loginMsg && <p className="text-success m-3">{loginMsg}</p>}
        {ErrorMsg && <p className="text-danger m-3">{ErrorMsg}</p>}

        <button className="sc-button" type="submit">
          <span>{lang["Login"]}</span>
        </button>
      </form>
    );
  }

  return (
    <>
      <Header2 />
      <div
        className="popup login-form py-5"
        id="popup_bid"
        tabIndex={-1}
        aria-hidden="false"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body space-y-20 pd-40">
              <div className="wrap-modal flex">
                <div className="images flex-none">
                  <img
                    alt="images"
                    src="/assets/images/section/login.jpg"
                    width={380}
                    height={640}
                  />
                </div>
              <div className="content p-0">
                <div className="comments">
                  <div className="respond-comment">
                    <div className="content">
                      <h1 className="title-login">{lang["Login"]}</h1>
                      <Tab.Container defaultActiveKey="customer">
                        <Nav variant="tabs" className="mb-4">
                          <Nav.Item
                            style={{ width: "50%", textAlign: "center" }}
                          >
                            <Nav.Link
                              eventKey="customer"
                              style={{ color: "#FF7101", fontWeight: "bold" }}
                            >
                              {lang["Customer"]}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            style={{ width: "50%", textAlign: "center" }}
                          >
                            <Nav.Link
                              eventKey="vendor"
                              style={{ color: "#FF7101", fontWeight: "bold" }}
                            >
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
                    <Link to={"/signup"}>
                      <a className="font-2 fw-7 fs-14 color-popup text-color-3">
                        {lang["Signup"]}
                      </a>
                    </Link>
                  </div>

              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
