/* eslint-disable jsx-a11y/alt-text */
import getText from "../../../translation";
import { Link } from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";

const targetLang = window.localStorage.getItem("lang") === "العربية";

/* eslint-disable import/no-anonymous-default-export */
export default ({ sectionName }) => {
  const { loaded, main, other } = useSelector((e) => e.Sliders);

  if (!loaded) return null;

  const nameArg = targetLang ? "name_ar" : "name";
  const descArg = targetLang ? "description_ar" : "description";

  return (
    <section
      key="services"
      id="services"
      className="container-fluid container-lg d-flex flex-column text-center container-fluid container-lg"
    >
      {sectionName && (
        <p className="d-flex align-items-center">
          <span className="h3">{sectionName}</span>
        </p>
      )}

      <div className="align-items-stretch d-flex flex-wrap flex-lg-nowrap gap-3">
        <div className="align-items-stretch d-grid">
          <p className="align-items-center d-flex flex-column h-100 justify-content-evenly m-0">
            <span className="d-block h4">{main[nameArg]}</span>

            <span dangerouslySetInnerHTML={{ __html: main[descArg] }}></span>

            <Link to="/design" className="text-decoration-none">
              {"اطلب الآن"}
            </Link>
          </p>

          <img src={main.image} alt="special order" />
        </div>

        <div className="align-items-stretch d-grid">
          <p className="align-items-center d-flex flex-column h-100 justify-content-evenly m-0">
            <span className="d-block h4">{other[nameArg]}</span>

            <span dangerouslySetInnerHTML={{ __html: other[descArg] }}></span>

            <Link to="/early-booking" className="text-decoration-none">
              {"احجز الآن"}
            </Link>
          </p>

          <img src={other.image} alt="early order" />
        </div>
      </div>
    </section>
  );
};

/**
 * {
        "name": "test",
        "name_ar": null,
        "description": null,
        "description_ar": null,
        "ex_data": null,
        "image": "https://admin.montana.sa/public/assets/img/slider/1726662935Lu07TBfKUO.jpg"
    }
 */
