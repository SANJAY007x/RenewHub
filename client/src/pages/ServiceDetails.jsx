import { Link, useParams } from "react-router-dom";
import governmentServices from "../data/governmentServices";
import "./ServiceDetails.css";

function ServiceDetails() {
  const { id } = useParams();

  const service = governmentServices.find(
    (item) => item.id === id
  );

  if (!service) {
    return (
      <main className="rh-service-details-page">
        <div className="rh-service-details-container">
          <h1>Service Not Found</h1>

          <p>
            The requested service could not be found.
          </p>

          <Link to="/">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="rh-service-details-page">

      <div className="rh-service-details-container">

        <div className="rh-service-breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <span>Services</span>
          <span> / </span>
          <strong>{service.name}</strong>
        </div>


        <section className="rh-service-details-header">

          <span>{service.category}</span>

          <h1>{service.name}</h1>

          <p>{service.shortDescription}</p>

          <div className="rh-service-details-meta">
            <span>{service.department}</span>
            <span>•</span>
            <span>{service.state}</span>
          </div>

        </section>


        <section className="rh-service-details-grid">

          <div>

            <div className="rh-service-information-card">

              <h2>How to Apply</h2>

              <div className="rh-service-steps">

                {service.applicationSteps.map(
                  (step, index) => (
                    <div
                      className="rh-service-step"
                      key={index}
                    >
                      <span>{index + 1}</span>

                      <p>{step}</p>
                    </div>
                  )
                )}

              </div>

            </div>


            <div className="rh-service-information-card">

              <h2>Required Documents</h2>

              <ul className="rh-service-documents">

                {service.documents.map(
                  (document, index) => (
                    <li key={index}>
                      {document}
                    </li>
                  )
                )}

              </ul>

            </div>

          </div>


          <aside className="rh-service-details-sidebar">

            <div className="rh-service-official-card">

              <span>OFFICIAL SOURCE</span>

              <h3>{service.officialSource}</h3>

              <p>
                Use the official portal to apply or
                verify the latest service information.
              </p>

              <a
                href={service.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Portal →
              </a>

            </div>


            <div className="rh-service-verification-card">

              <strong>Information Verification</strong>

              <p>
                Last verified:
                <br />
                {service.lastVerified}
              </p>

              <small>
                Service requirements and procedures may
                change. Always verify the latest details
                on the official source before applying.
              </small>

            </div>

          </aside>

        </section>


        <Link
          to="/"
          className="rh-service-back-button"
        >
          ← Back to Home
        </Link>

      </div>

    </main>
  );
}

export default ServiceDetails;