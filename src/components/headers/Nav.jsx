import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { blogPages, homepages, listingPages, otherPages } from "@/data/menu";
import { use } from "react";
import { LangContext } from "@/utlis/langContext";

export default function Nav() {
  const { lang } = useContext(LangContext);

  const { pathname } = useLocation();
  const isActive = (menus) => {
    let active = false;

    menus.forEach((elm) => {
      if (elm.links) {
        elm.links.forEach((elm2) => {
          if (elm2.href.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        });
      } else {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          active = true;
        }
      }
    });
    return active;
  };
  return (
    <>
      <li
        className={`tf-megamenu ${
          isActive(homepages) ? "current" : ""
        } `}
      >
        <Link to={`/home`}>{lang["Home"]}</Link>
      </li>
      <li
        className={`tfcl-mega-menu ${
          isActive(listingPages) ? "current" : ""
        } `}
      >
        <Link to={"/listing-car"}>{lang["Listing Car"]}</Link>
      </li>
      <li className={"sell-car" == pathname.split("/")[1] ? "current" : ""}>
        <Link to={`/sell-car`}>{lang["Sell A Car"]}</Link>
      </li>
      <li className={"about-us" == pathname.split("/")[1] ? "current" : ""}>
      <Link to={'/about-us'}>{lang["About Us"]}</Link>

      </li>
      <li className={"contact" == pathname.split("/")[1] ? "current" : ""}>
        <Link to={`/contact`}>{lang["Contact"]}</Link>
      </li>
    </>
  );
}
