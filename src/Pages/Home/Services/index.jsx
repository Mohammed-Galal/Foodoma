/* eslint-disable jsx-a11y/alt-text */
import getPage from "../../../translation";
import { Link } from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";

const getText = getPage("home"),
  targetLang = window.localStorage.getItem("lang") === "العربية";

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
        <h2 className="d-flex align-items-center">{sectionName}</h2>
      )}

      <div className="align-items-stretch d-flex flex-wrap flex-lg-nowrap gap-3">
        <div className="align-items-stretch d-grid">
          <p className="align-items-center d-flex flex-column h-100 justify-content-evenly m-0">
            <h2 className="d-block h4">{main[nameArg]}</h2>

            <span dangerouslySetInnerHTML={{ __html: main[descArg] }}></span>

            <Link to="/design" className="text-decoration-none">
              {getText(9)}
            </Link>
          </p>

          <img src={main.image} alt="special order" />
        </div>

        <div className="align-items-stretch d-grid">
          <p className="align-items-center d-flex flex-column h-100 justify-content-evenly m-0">
            <h2 className="d-block h4">{other[nameArg]}</h2>

            <span dangerouslySetInnerHTML={{ __html: other[descArg] }}></span>

            <Link to="/early-booking" className="text-decoration-none">
              {getText(10)}
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
