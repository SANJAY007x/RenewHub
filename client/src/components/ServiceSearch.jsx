import { useState } from "react";
import { Link } from "react-router-dom";
import governmentServices from "../data/governmentServices";
import "./ServiceSearch.css";

function ServiceSearch() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  const filteredServices = governmentServices.filter((service) => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return false;
    }

    const matchesSearch =
      service.name.toLowerCase().includes(search) ||
      service.shortDescription.toLowerCase().includes(search) ||
      service.department.toLowerCase().includes(search) ||
      service.keywords.some((keyword) =>
        keyword.toLowerCase().includes(search)
      );

    const matchesCategory =
      category === "all" ||
      service.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="rh-service-search-wrapper">

      <div className="hero-search">

        <input
          type="text"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setShowResults(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search for a document or service..."
          aria-label="Search government services"
        />

        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setShowResults(false);
          }}
          aria-label="Select service category"
        >
          <option value="all">All Services</option>
          <option value="certificates">Certificates</option>
          <option value="licenses">Licenses</option>
          <option value="registrations">Registrations</option>
          <option value="insurance">Insurance</option>
        </select>

        <button type="button" onClick={handleSearch}>
          Search
        </button>

      </div>

      {showResults && (
        <div className="rh-service-search-results">

          {filteredServices.length > 0 ? (
            <>
              <div className="rh-service-search-heading">
                <span>SEARCH RESULTS</span>
                <strong>
                  {filteredServices.length} service
                  {filteredServices.length > 1 ? "s" : ""} found
                </strong>
              </div>

              {filteredServices.map((service) => (
                <div
                  className="rh-service-result-card"
                  key={service.id}
                >
                  <div className="rh-service-result-content">

                    <span className="rh-service-result-category">
                      {service.category}
                    </span>

                    <h3>{service.name}</h3>

                    <p>{service.shortDescription}</p>

                    <div className="rh-service-result-meta">
                      <span>{service.department}</span>
                      <span>•</span>
                      <span>{service.state}</span>
                    </div>

                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="rh-service-result-button"
                  >
                    View Guidance →
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div className="rh-service-no-results">

              <strong>No matching service found</strong>

              <p>
                Try searching for terms such as
                <span> income</span>,
                <span> nativity</span>, or
                <span> community</span>.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default ServiceSearch;