import CarDetails1 from "@/components/carDetails/CarDetails1";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { allCars } from "@/data/cars";
import MetaComponent from "@/components/common/MetaComponent";
import { useState, useEffect } from 'react';
import axios from 'axios';
const metadata = {
  title:
    "Car Details 01 || AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
};
export default function BlogListingDetailsPage1() {
  const [carItem, setCarItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://develop.sayarti.nl/api/v1/en/cars/${params.id}`
        );
        setCarItem(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCar();
  }, [params.id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5">Error: {error.message}</div>;

  return (
    <>
      <MetaComponent meta={{ 
        title: carItem.title,
        description: carItem.description.replace(/<[^>]+>/g, '').substring(0, 160) 
      }} />
      <div className="header-fixed">
        <Header2 />
      </div>
      <section className="flat-title mb-40">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" to={`/`}>
                    Home
                  </Link>
                  <span>Car Details</span>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </section>
      <CarDetails1 carItem={carItem} />
      <Footer1 />
    </>
  );
}
