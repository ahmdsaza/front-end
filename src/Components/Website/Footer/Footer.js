import React from "react";
import {
  faTwitter,
  // faFacebook,
  // faGoogle,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <div>
      <footer className="text-center mt-4">
        <div className="container pt-4">
          <section className="mb-4">
            <a
              data-mdb-ripple-init
              className="btn btn-outline btn-floating m-1"
              href="https://x.com/ahmedsaudzh"
              role="button"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              data-mdb-ripple-init
              className="btn btn-outline btn-floating m-1"
              href="https://www.instagram.com/ahmdsaza"
              role="button"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              data-mdb-ripple-init
              className="btn btn-outline btn-floating m-1"
              href="https://www.linkedin.com/in/ahmedsaza"
              role="button"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a
              data-mdb-ripple-init
              className="btn btn-outline btn-floating m-1"
              href="https://github.com/ahmdsaza"
              role="button"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </section>

          {/* <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form5Example24"
                      className="form-control"
                    />
                    <label className="form-label" for="form5Example24">
                      Email address
                    </label>
                  </div>
                </div>

                <div className="col-auto">
                  <button
                    data-mdb-ripple-init
                    type="submit"
                    className="btn btn-outline mb-4"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section> */}

          {/* <section className="mb-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>
          </section>

          <section className="">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a className="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a className="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a className="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a className="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a className="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>*/}
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", width: "100%" }}
        >
          © 2024 Copyright:
          <a className="text-reset fw-bold" href="https://ahmedsaud.me/">
            Ahmed Alzahrani
          </a>
        </div>
      </footer>
    </div>
  );
}
