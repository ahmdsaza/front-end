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
      <footer class="text-center mt-4">
        <div class="container p-4">
          <section class="mb-4">
            {/* <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a> */}

            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="https://x.com/ahmedsaudzh"
              role="button"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>

            {/* <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="#!"
              role="button"
            >
              <FontAwesomeIcon icon={faGoogle} />
            </a> */}

            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="https://www.instagram.com/ahmdsaza"
              role="button"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="https://www.linkedin.com/in/ahmedsaza"
              role="button"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a
              data-mdb-ripple-init
              class="btn btn-outline btn-floating m-1"
              href="https://github.com/ahmdsaza"
              role="button"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </section>

          <section class="">
            <form action="">
              <div class="row d-flex justify-content-center">
                <div class="col-auto">
                  <p class="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>

                <div class="col-md-5 col-12">
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input
                      type="email"
                      id="form5Example24"
                      class="form-control"
                    />
                    <label class="form-label" for="form5Example24">
                      Email address
                    </label>
                  </div>
                </div>

                <div class="col-auto">
                  <button
                    data-mdb-ripple-init
                    type="submit"
                    class="btn btn-outline mb-4"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>

          <section class="mb-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>
          </section>

          <section class="">
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Links</h5>

                <ul class="list-unstyled mb-0">
                  <li>
                    <a class="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Links</h5>

                <ul class="list-unstyled mb-0">
                  <li>
                    <a class="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Links</h5>

                <ul class="list-unstyled mb-0">
                  <li>
                    <a class="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Links</h5>

                <ul class="list-unstyled mb-0">
                  <li>
                    <a class="text-body" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a class="text-body" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", width: "100%" }}
        >
          © 2020 Copyright:
          <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </div>
  );
}
