import React, { useEffect, useReducer, useState } from "react";
import Pricing from "../common/Pricing";

import { Link } from "react-router-dom";
import { allCars } from "@/data/cars";
import DropdownSelect from "../common/DropDownSelect";
import { featureOptions } from "@/data/filterOptions";
import { initialState, reducer } from "@/reducer/carFilterReducer";
import Pagination from "../common/Pagination";
import ListGridToggler from "./ListGridToggler";
import FilterSidebar from "./FilterSidebar";
export default function Cars1() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price,
    km,
    year,
    body,
    make,
    model,
    fuel,
    transmission,
    location,
    door,
    cylinder,
    color,

    features,
    filtered,
    sortingOption,
    sorted,
    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setYear: (value) => dispatch({ type: "SET_YEAR", payload: value }),
    setModel: (value) => dispatch({ type: "SET_MODEL", payload: value }),
    setKM: (value) => dispatch({ type: "SET_KM", payload: value }),
    setBody: (value) => dispatch({ type: "SET_BODY", payload: value }),
    setMake: (value) => dispatch({ type: "SET_MAKE", payload: value }),
    setFuel: (value) => dispatch({ type: "SET_FUEL", payload: value }),
    setTransmission: (value) =>
      dispatch({ type: "SET_TRANSMISSION", payload: value }),
    setLocation: (value) => dispatch({ type: "SET_LOCATION", payload: value }),
    setDoor: (value) => dispatch({ type: "SET_DOOR", payload: value }),
    setCylinder: (value) => dispatch({ type: "SET_CYLINDER", payload: value }),
    setColor: (value) => dispatch({ type: "SET_COLOR", payload: value }),

    setFeatures: (newFeature) => {
      const updated = [...features].includes(newFeature)
        ? [...features].filter((elm) => elm != newFeature)
        : [...features, newFeature];
      dispatch({ type: "SET_FEATURES", payload: updated });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  useEffect(() => {
    let filteredArrays = [];

    if (features.length) {
      const filteredByFeatures = [...allCars].filter((elm) =>
        features.every((el) => elm.features.includes(el))
      );
      filteredArrays = [...filteredArrays, filteredByFeatures];
    }
    if (body !== "Any Body") {
      const filteredBybody = [...allCars].filter((elm) => body === elm.body);
      filteredArrays = [...filteredArrays, filteredBybody];
    }
    if (make !== "Any Make") {
      const filteredBymake = [...allCars].filter((elm) => make === elm.make);
      filteredArrays = [...filteredArrays, filteredBymake];
    }
    if (model !== "Any Model") {
      const filteredBymodel = [...allCars].filter((elm) => model === elm.model);
      filteredArrays = [...filteredArrays, filteredBymodel];
    }
    if (fuel !== "Any Fuel") {
      const filteredByfuel = [...allCars].filter(
        (elm) => fuel === elm.fuelType
      );
      filteredArrays = [...filteredArrays, filteredByfuel];
    }
    if (transmission !== "Any Transmission") {
      const filteredByTransmission = [...allCars].filter(
        (elm) => transmission === elm.transmission
      );
      filteredArrays = [...filteredArrays, filteredByTransmission];
    }
    if (location !== "Any Location") {
      const filteredBylocation = [...allCars].filter(
        (elm) => location === elm.location
      );
      filteredArrays = [...filteredArrays, filteredBylocation];
    }
    if (door !== "Any Door") {
      const filteredBydoor = [...allCars].filter(
        (elm) => parseInt(door.match(/\d+/)[0], 10) === elm.door
      );
      filteredArrays = [...filteredArrays, filteredBydoor];
    }
    if (cylinder !== "Any Cylinder") {
      const filteredBycylinder = [...allCars].filter(
        (elm) => parseInt(cylinder.match(/\d+/)[0], 10) === elm.cylinder
      );
      filteredArrays = [...filteredArrays, filteredBycylinder];
    }
    if (color !== "Any Color") {
      const filteredBycolor = [...allCars].filter((elm) => color === elm.color);
      filteredArrays = [...filteredArrays, filteredBycolor];
    }

    const filteredByPrice = [...allCars].filter(
      (elm) => elm.price >= price[0] && elm.price <= price[1]
    );
    filteredArrays = [...filteredArrays, filteredByPrice];
    const filteredBykm = [...allCars].filter(
      (elm) => elm.km >= km[0] && elm.km <= km[1]
    );
    filteredArrays = [...filteredArrays, filteredBykm];
    const filteredByyear = [...allCars].filter(
      (elm) => elm.year >= year[0] && elm.year <= year[1]
    );
    filteredArrays = [...filteredArrays, filteredByyear];

    const commonItems = [...allCars].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [
    price,
    km,
    year,
    body,
    make,
    model,
    fuel,
    transmission,
    location,
    door,
    cylinder,
    color,

    features,
  ]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  const [isGrid, setIsGrid] = useState(false);

  return (
    <>
      <section className="listing-grid tf-section3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section">
                <h2>10,000+ Get The Best Deals On Used Cars</h2>
                <p className="mt-20">
                  Explore our selection of high-quality, pre-owned vehicles. Our
                  inventory includes top brands like Toyota, Mercedes, Honda,
                  and more. Find the perfect used car for your needs.
                </p>
              </div>
            </div>
            <div className="col-lg-12 flex gap-30 text-start">
              <div className="sidebar-right-listing style-2">
                <div className="sidebar-title flex-two flex-wrap">
                  <h4>Filters and Sort</h4>
                  <a
                    className="fw-5 font claer text-color-2"
                    onClick={clearFilter}
                  >
                    <i className="icon-autodeal-plus" />
                    Clear
                  </a>
                </div>
                <div className="form-filter-siderbar">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wd-find-select">
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={make}
                            onChange={allProps.setMake}
                            options={["Any Make", "Audi", "Dongfeng", "BMW"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={model}
                            onChange={allProps.setModel}
                            options={["Any Model", "A4", "Almera", "Carnival"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <DropdownSelect
                          selectedValue={body}
                          onChange={allProps.setBody}
                          options={[
                            "Any Body",
                            "Convertible",
                            "Coupe",
                            "Crossover",
                          ]}
                        />
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Price: ${price[0]} - ${price[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={45000}
                            MAX={115000}
                            priceRange={price}
                            setPriceRange={allProps.setPrice}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={fuel}
                            onChange={allProps.setFuel}
                            options={["Any Fuel", "Diesel", "Petrol"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={transmission}
                            onChange={allProps.setTransmission}
                            options={[
                              "Any Transmission",
                              "Automatic",
                              "Manual",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={location}
                            onChange={allProps.setLocation}
                            options={[
                              "Any Location",
                              "London",
                              "New York",
                              "Paris",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={door}
                            onChange={allProps.setDoor}
                            options={["Any Door", "2 Door", "3 Door", "4 Door"]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={cylinder}
                            onChange={allProps.setCylinder}
                            options={[
                              "Any Cylinder",
                              "2 Cylinder",
                              "3 Cylinder",
                              "4 Cylinder",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={color}
                            onChange={allProps.setColor}
                            options={[
                              "Any Color",
                              "Black",
                              "White",
                              "Blue",
                              "Red",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Year: {year[0]} - {year[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={2015}
                            MAX={2025}
                            priceRange={year}
                            setPriceRange={allProps.setYear}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                KM: {km[0]} km - {km[1]} km
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={45000}
                            MAX={115000}
                            priceRange={km}
                            setPriceRange={allProps.setKM}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>

                      <div className="features-wrap">
                        <h4>Featured</h4>
                        <div className="form-group">
                          <div className="tf-amenities bg-white">
                            {featureOptions.map((feature, index) => (
                              <label className="flex-three" key={index}>
                                <input
                                  readOnly
                                  checked={features.includes(feature)}
                                  type="checkbox"
                                  onClick={() => allProps.setFeatures(feature)}
                                />
                                <span className="btn-checkbox" />
                                <span className="text-color-2 font-2">
                                  {feature}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="sidebar-left-listing">
                <div className="row">
                  <div className="col-lg-12 listing-list-car-wrap">
                    <div className="category-filter flex justify-space align-center mb-30 flex-wrap gap-8">
                      <div className="box-1 flex align-center flex-wrap gap-8">
                        <p className="">
                          {" "}
                          {sorted.length ? (
                            <>
                              Showing {(currentPage - 1) * itemPerPage + 1} -{" "}
                              {currentPage * itemPerPage} Of {sorted.length}{" "}
                              results{" "}
                            </>
                          ) : (
                            "No results found. Please try another filter"
                          )}
                        </p>
                        <div className="filter-mobie">
                          <a
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            className="filter"
                          >
                            Filter
                            <i className="icon-autodeal-filter" />
                          </a>
                        </div>
                      </div>
                      <div className="box-2 flex flex-wrap gap-8">
                        <ListGridToggler
                          isGrid={isGrid}
                          setIsGrid={setIsGrid}
                        />
                        <div className="wd-find-select flex gap-8">
                          <div className="group-select">
                            <DropdownSelect
                              onChange={(value) => {
                                const match = value.match(/\d+/); // Match the digits in the value
                                if (match) {
                                  allProps.setItemPerPage(
                                    parseInt(match[0], 10)
                                  );
                                }
                              }}
                              addtionalParentClass="list-page"
                              options={["Show: 6", "Show: 9", "Show: 12"]}
                            />
                          </div>
                          <div className="group-select">
                            <DropdownSelect
                              selectedValue={sortingOption}
                              onChange={allProps.setSortingOption}
                              addtionalParentClass="list-sort"
                              options={[
                                "Sort by (Default)",

                                "Price Ascending",
                                "Price Descending",
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`list-car-list-1 ${
                        isGrid ? "list-car-grid-1" : ""
                      } `}
                    >
                      {sorted
                        .slice(
                          (currentPage - 1) * itemPerPage,
                          currentPage * itemPerPage
                        )
                        .map((car, i) => (
                          <div key={i} className="box-car-list style-2 hv-one">
                            <div className="image-group relative">
                              <div className="top flex-two">
                                <ul className="d-flex gap-8">
                                  <li className="flag-tag success">Featured</li>
                                  <li className="flag-tag style-1">
                                    <div className="icon">
                                      <svg
                                        width={16}
                                        height={13}
                                        viewBox="0 0 16 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                          stroke="white"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    6
                                  </li>
                                </ul>
                                <div className="year flag-tag">{car.year}</div>
                              </div>
                              <ul className="change-heart flex">
                                <li className="box-icon w-32">
                                  <a
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasBottom"
                                    aria-controls="offcanvasBottom"
                                    className="icon"
                                  >
                                    <svg
                                      width={18}
                                      height={18}
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </li>
                                <li className="box-icon w-32">
                                  <Link to={`/my-favorite`} className="icon">
                                    <svg
                                      width={18}
                                      height={16}
                                      viewBox="0 0 18 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                </li>
                              </ul>
                              <div className="img-style">
                                <img
                                  className="lazyload"
                                  alt="image"
                                  src={car.imgSrc}
                                  width={450}
                                  height={338}
                                />
                              </div>
                            </div>
                            <div className="content">
                              <div className="inner1">
                                <div className="text-address">
                                  <p className="text-color-3 font">
                                    {car.type}
                                  </p>
                                </div>
                                <h5 className="link-style-1">
                                  <Link to={`/listing-detail-v1/${car.id}`}>
                                    {car.title}
                                  </Link>
                                </h5>
                                <div className="icon-box flex flex-wrap">
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-km1" />
                                    <span>{car.km.toLocaleString()} kms</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-diesel" />
                                    <span>{car.fuelType}</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-automatic" />
                                    <span>{car.transmission}</span>
                                  </div>
                                </div>
                                <div className="money fs-20 fw-5 lh-25 text-color-3">
                                  ${car.price.toLocaleString()}
                                </div>
                                <Link
                                  to={`/listing-detail-v1/${car.id}`}
                                  className="view-car"
                                >
                                  View details
                                  <i className="icon-autodeal-btn-right" />
                                </Link>
                              </div>
                              <div className="inner2">
                                <div className="days-box">
                                  <div className="img-author">
                                    <img
                                      className="lazyload"
                                      alt="image"
                                      src={car.authorImage}
                                      width={120}
                                      height={120}
                                    />
                                    <span className="font text-color-2 fw-5">
                                      {car.authorName}
                                    </span>
                                  </div>
                                  <Link
                                    to={`/listing-detail-v1/${car.id}`}
                                    className="view-car"
                                  >
                                    View car
                                  </Link>
                                  <a href="#" className="chat">
                                    <div className="icon">
                                      <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.99982 0.875C7.59706 0.874694 6.21811 1.23757 4.9972 1.9283C3.77629 2.61904 2.75501 3.6141 2.03277 4.81664C1.31052 6.01918 0.911915 7.38822 0.875748 8.79052C0.839581 10.1928 1.16709 11.5806 1.82638 12.8188L0.939664 15.4789C0.866215 15.6992 0.855555 15.9355 0.908881 16.1615C0.962207 16.3874 1.07741 16.5941 1.24158 16.7582C1.40575 16.9224 1.61239 17.0376 1.83836 17.0909C2.06432 17.1443 2.30067 17.1336 2.52091 17.0602L5.18107 16.1734C6.27073 16.753 7.47811 17.0767 8.71156 17.12C9.94501 17.1633 11.1721 16.925 12.2997 16.4232C13.4273 15.9215 14.4258 15.1694 15.2194 14.2241C16.0129 13.2789 16.5807 12.1652 16.8796 10.9678C17.1785 9.77029 17.2007 8.52047 16.9445 7.31315C16.6882 6.10584 16.1603 4.97276 15.4008 3.99993C14.6413 3.02711 13.6701 2.24009 12.561 1.69864C11.4519 1.15718 10.234 0.875506 8.99982 0.875ZM8.99982 15.875C7.79121 15.8758 6.6038 15.5575 5.55763 14.9523C5.48104 14.9079 5.39587 14.8803 5.30779 14.8713C5.2197 14.8622 5.13071 14.872 5.0467 14.9L2.12482 15.875L3.09904 12.9531C3.12712 12.8692 3.13705 12.7802 3.12816 12.6921C3.11927 12.604 3.09177 12.5188 3.04748 12.4422C2.28964 11.132 1.98537 9.60827 2.18187 8.10747C2.37837 6.60667 3.06466 5.21267 4.13426 4.14171C5.20387 3.07076 6.597 2.38271 8.09755 2.18431C9.5981 1.98592 11.1222 2.28826 12.4334 3.04444C13.7445 3.80062 14.7695 4.96837 15.3493 6.36652C15.9291 7.76468 16.0313 9.3151 15.64 10.7773C15.2487 12.2394 14.3858 13.5316 13.1852 14.4533C11.9846 15.375 10.5134 15.8748 8.99982 15.875Z"
                                          fill="CurrentColor"
                                        />
                                      </svg>
                                    </div>
                                    <span>Chat</span>
                                  </a>
                                  <p className="fs-12 lh-16">
                                    View 20 variants matching your search
                                    criteria
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="themesflat-pagination clearfix mt-40">
                      <ul>
                        <Pagination
                          currentPage={currentPage}
                          setPage={(value) => allProps.setCurrentPage(value)}
                          itemLength={sorted.length}
                          itemPerPage={itemPerPage}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FilterSidebar allProps={allProps} clearFilter={clearFilter} />
    </>
  );
}
