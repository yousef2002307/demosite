import { slidesData } from "@/data/carReviews";
import React from "react";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
export default function CarReview() {
  const swiperOptions = {
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".snbn12",
      prevEl: ".snbp12",
    },
  };
  return (
    <section className="tf-section-banner2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section flex align-center justify-space flex-wrap gap-20">
              <h2
                className="wow fadeInUpSmall"
                data-wow-delay="0.2s"
                data-wow-duration="1000ms"
              >
                News, reviews &amp; Video
              </h2>
              <Link
                to={`/blog-grid`}
                className="tf-btn-arrow wow fadeInUpSmall"
                data-wow-delay="0.2s"
                data-wow-duration="1000ms"
              >
                View all
                <i className="icon-autodeal-btn-right" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              {...swiperOptions}
              modules={[EffectFade, Navigation]}
              className="swiper review-car carousel-3 overflow-hidden"
            >
              {slidesData.map((slide, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="slider-item">
                    <div className="img-slider">
                      <img
                        className="lazyload"
                        data-src={slide.imgSrc}
                        alt={slide.imgAlt}
                        src={slide.imgSrc}
                        width={1935}
                        height={631}
                      />
                    </div>
                    <div className="content">
                      <div className="heading">
                        <h1 className="text-color-1">{slide.title}</h1>
                        <p className="text-color-1 font fw-4">
                          {slide.description}
                        </p>
                        <div className="btn-wrap">
                          <a href="#" className="sc-button">
                            <span>{slide.btnText}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-next style-1 snbn12" />
            <div className="swiper-button-prev style-1 snbp12" />
          </div>
        </div>
      </div>
    </section>
  );
}
