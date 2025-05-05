import Cars3 from "@/components/carsListings/Cars3";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Car Listing",
  description: "AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
};
export default function ListingGridPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header2 />
      </div>
      <section className="flat-title">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" to={`/`}>
                    Home
                  </Link>
                  <span>Listing Car</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cars3 />
      <Footer1 />
    </>
  );
}
