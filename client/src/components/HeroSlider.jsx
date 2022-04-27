import { Button } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HeroSlider(props) {
  const { data, control } = props;
  const timeOut = props.timeOut ? props.timeOut : 3000
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(
    () => {
      const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
      setActiveSlide(index)
    },
    [activeSlide, data],
  )

  const prevSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
    setActiveSlide(index)
  }


  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide()
      }, timeOut)
      return () => {
        clearInterval(slideAuto)
      }
    }
  }, [props.auto, nextSlide, timeOut])

  return (
    <div className="container">
      <div className="hero-slider">
        {data.map((item, index) => (
          <HeroSliderItem key={index} item={item} active={index === activeSlide} />
        ))}
        {control ? (
          <div className="hero-slider__control">
            <div className="hero-slider__control__item hero-slider__control__item-action" onClick={prevSlide}>
              <i className="fa-solid fa-angle-left"></i>
            </div>
            <div className="hero-slider__control__item">
              <div className="index">
                {activeSlide + 1}/{data.length}
              </div>
            </div>
            <div className="hero-slider__control__item hero-slider__control__item-action" onClick={nextSlide}>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function HeroSliderItem({ item, active }) {
  return (
    <div className={`hero-slider__item ${active ? 'active' : ''}`}>
      <div className="hero-slider__item__info">
        <div className="hero-slider__item__info__title">
          <span>{item.title}</span>
        </div>
        <div className="hero-slider__item__info__description">
          <span>{item.description}</span>
        </div>
        <div className="hero-slider__item__info__btn">
          <Link to={item.path}>
            <Button
              css={{
                linearGradient: "45deg, #efdf9a 0%, #f78b7c 50%",
                zIndex: 1,
                py: '24px',
                color: "#181e21",
                textTransform: 'uppercase'
              }}
              icon={<i className="fa-solid fa-cart-plus"></i>}
              className="hero-slider__shop__button"
            >
              Shop now
            </Button>
          </Link>
        </div>
      </div>
      <div className="hero-slider__item__image">
        <div className={`shape shape--${item.color}`}></div>
        <img src={item.img} alt={item.img} />
      </div>
    </div>
  )

}

export default HeroSlider