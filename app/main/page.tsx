'use client';
import React from 'react';
import BigCarousel from '../bigcarousel';
import ReviewCardGroup from './reviewcardgroup';
import ColumnCardGroup from './columncardgroup';
import Category from './category';
import Bars from '../bars';


export default function Home() {
  return (
    <>
      <main>
        <script src="holder.js"></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta
          name="author"
          content="Mark Otto, Jacob Thornton, and Bootstrap contributors"
        />
        <meta name="generator" content="Hugo 0.122.0" />
        <title>Carousel Template · Bootstrap v5.3</title>
        <link
          rel="canonical"
          href="https://getbootstrap.com/docs/5.3/examples/carousel/"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      .bd-placeholder-img {\n        font-size: 1.125rem;\n        text-anchor: middle;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      @media (min-width: 768px) {\n        .bd-placeholder-img-lg {\n          font-size: 3.5rem;\n        }\n      }\n\n      .b-example-divider {\n        width: 100%;\n        height: 3rem;\n        background-color: rgba(0, 0, 0, .1);\n        border: solid rgba(0, 0, 0, .15);\n        border-width: 1px 0;\n        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);\n      }\n\n      .b-example-vr {\n        flex-shrink: 0;\n        width: 1.5rem;\n        height: 100vh;\n      }\n\n      .bi {\n        vertical-align: -.125em;\n        fill: currentColor;\n      }\n\n      .nav-scroller {\n        position: relative;\n        z-index: 2;\n        height: 2.75rem;\n        overflow-y: hidden;\n      }\n\n      .nav-scroller .nav {\n        display: flex;\n        flex-wrap: nowrap;\n        padding-bottom: 1rem;\n        margin-top: -1px;\n        overflow-x: auto;\n        text-align: center;\n        white-space: nowrap;\n        -webkit-overflow-scrolling: touch;\n      }\n\n      .btn-bd-primary {\n        --bd-violet-bg: #712cf9;\n        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;\n\n        --bs-btn-font-weight: 600;\n        --bs-btn-color: var(--bs-white);\n        --bs-btn-bg: var(--bd-violet-bg);\n        --bs-btn-border-color: var(--bd-violet-bg);\n        --bs-btn-hover-color: var(--bs-white);\n        --bs-btn-hover-bg: #6528e0;\n        --bs-btn-hover-border-color: #6528e0;\n        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);\n        --bs-btn-active-color: var(--bs-btn-hover-color);\n        --bs-btn-active-bg: #5a23c8;\n        --bs-btn-active-border-color: #5a23c8;\n      }\n\n      .bd-mode-toggle {\n        z-index: 1500;\n      }\n\n      .bd-mode-toggle .dropdown-menu .active .bi {\n        display: block !important;\n      }\n    "
          }}
        />
        <Bars isLoggedIn={false}/>
        {/* <BigCarousel /> */}
        {/* <Category /> */}
        {/* <ReviewCardGroup /> */}
        <ColumnCardGroup />
        {/* FOOTER */}
        <footer className="container">
          <p className="float-end">
            <a href="#">Back to top</a>
          </p>
          <p>
            © 2017–2024 Company, Inc. · <a href="#">Privacy</a> ·{" "}
            <a href="#">Terms</a>
          </p>
        </footer>
      </main>
    </>
  );
}

// export function toggleSearch() {
//   let searchInput = document.getElementById("search_input");
//   let searchButton = document.getElementById("search_button");
//   let searchSubmit = document.getElementById("search_submit");
//   let searchCancel = document.getElementById("search_cancel");
//   let searchImage = document.getElementById("search_image");
//   searchInput?.classList.toggle("d-none");
//   searchButton?.classList.toggle("d-none");
//   searchSubmit?.classList.toggle("d-none");
//   searchCancel?.classList.toggle("d-none");
//   searchImage?.classList.toggle("d-none");
// }
