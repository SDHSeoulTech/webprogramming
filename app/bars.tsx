import "./bars_style.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Bars() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  useEffect(() => {
    fetch("localhost:8080/api/main/login-status")
      .then((response) => response.json())
      .then((data) => setIsLoggedIn(data.isLoggedIn))
      .catch((error) => console.error("Error fetching login status:", error));
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, [isLoggedIn]);

  const loadRecentSearches = () => {
    if (isLoggedIn) {
      fetch("localhost:8080/api/main/search-history")
        .then((response) => response.json())
        .then((data) => setRecentSearches(data.recentSearches))
        .catch((error) => console.error("Error fetching recent searches:", error));
    } else {
      const localRecentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
      setRecentSearches(localRecentSearches);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = (document.getElementById("search_input") as HTMLInputElement).value;

    if (!isLoggedIn && searchInput) {
      const updatedRecentSearches = [searchInput, ...recentSearches].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
      setRecentSearches(updatedRecentSearches);
      setShowSearchDropdown(true);
    } else if (isLoggedIn) {
      loadRecentSearches();
      setShowSearchDropdown(true);
    }
  };

  const handleDelete = (index: number) => {
    const updatedRecentSearches = recentSearches.filter((_, i) => i !== index);

    if (!isLoggedIn) {
      localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
    }
    setRecentSearches(updatedRecentSearches);
  };

  const handleFocus = () => {
    setShowSearchDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSearchDropdown(false), 200);
  };

  const handlePersonClick = () => {
    router.push("/login");
  };

  const handleCartClick = () => {
    router.push("/showroom");
  };

  const handleLogoClick = () => {
    router.push("/main");
  };

  return (
    <>
      <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container-fluid">
            <div className="navbar-brand-container">
              <ul className="navbar-nav me-auto mb-md-0">
                <li className="nav-item">
                  <a className="nav-link nav-item-style" aria-current="page" onClick={handleLogoClick}>
                    전자상거래사이트
                  </a>
                </li>
              </ul>
            </div>
            <form className="d-flex" role="search" id="search_form" onSubmit={handleSubmit}>
              <div className="search-container">
                {/* <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="search_input"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="off"
                /> */}
                <img
                  src="/img/glass.png"
                  className="search-icon"
                  alt="search"
                  id="search_image"
                  onClick={handleSubmit}
                />
                {showSearchDropdown && (
                  <div className="search-dropdown">
                    <div className="recent-searches">
                      <h6>Recent Searches</h6>
                      <ul>
                        {recentSearches.length > 0 ? (
                          recentSearches.map((search, index) => (
                            <li key={index} className="d-flex align-items-center">
                              <img
                                src="/img/watch.png"
                                alt="search icon"
                                className="search-icon-small"
                              />
                              <span className="me-auto">{search}</span>
                              <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => handleDelete(index)}
                                type="button"
                              >
                                Delete
                              </button>
                            </li>
                          ))
                        ) : (
                          <li>
                            <img 
                              src="/img/watch.png"
                              alt="search icon"
                              className="search-icon-small"
                            />
                            No recent searches
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {/* <img
                src="/img/person.png"
                className="icon_person"
                alt="person"
                onClick={handlePersonClick}
              /> */}
              <img
                src="/img/cart.png"
                className="icon_cart"
                alt="cart"
                onClick={handleCartClick}
              />
            </form>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Bars;
