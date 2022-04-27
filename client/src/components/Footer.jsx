import React from 'react'
import Logo from '../assets/icons/logo.svg';
import AppStore from '../assets/images/app_store.png'
import GooglePlay from '../assets/images/google_play.png'

function Footer() {
  return (
    <div className="container">
      <div className="footer">
        <div className="grid wide">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col l-2-4 m-4 c-12 footer__content">
              <h3 className="footer__heading">Customer care</h3>
              <ul className="footer__list">
                <li className="footer__list__item">
                  <div className="footer__item__link">Online assistance</div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">AMH shop</div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">Shopping guide</div>
                </li>
              </ul>

            </div>
            <div className="col l-2-4 m-4 c-12 footer__content">
              <h3 className="footer__heading">About us</h3>
              <ul className="footer__list">
                <li className="footer__list__item">
                  <div className="footer__item__link">Introduction</div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">Recruit</div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">Conditions & terms</div>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-12 footer__content">
              <h3 className="footer__heading">Preferential</h3>
              <ul className="footer__list">
                <li className="footer__list__item">
                  <div className="footer__item__link">Flash Sales</div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">Special Day</div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">Voucher</div>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-12 footer__content">
              <h3 className="footer__heading">Follow us</h3>
              <ul className="footer__list">
                <li className="footer__list__item">
                  <div className="footer__item__link">
                    <i className="footer__item__icon fa-brands fa-facebook"></i>
                    Facebook
                  </div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">
                    <i className="footer__item__icon fa-brands fa-instagram"></i>
                    Instagram
                  </div>
                </li>
                <li className="footer__list__item">
                  <div className="footer__item__link">
                    <i className="footer__item__icon fa-brands fa-linkedin"></i>
                    LinkedIn
                  </div>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-8 c-12 footer__content">
              <div className="footer__download">
                <img src={Logo} width={50} height={50} alt={Logo} />
                <div className="footer__download-apps">
                  <div className="footer__download-app-link">
                    <img src={AppStore} alt="" className="footer__download-app-img" />
                  </div>
                  <div className="footer__download-app-link">
                    <img src={GooglePlay} alt="" className="footer__download-app-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="footer__copyright">&copy; 2022 - AMH shop</div>
      </div>
    </div>
  )
}

export default Footer