import getText from "../../../translation";
import "./index.scss";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <section key="banner" id="banner" className="container-fluid container-lg">
    <div className="align-items-center d-flex flex-column justify-content-center text-center">
      <span className="h1 m-0">{getText("home", 6)}!</span>
      <p className="my-2">{getText("home", 7)}</p>

      {/* <Link to="/all-products" className="text-decoration-none">
        {getText("home", 8)}
      </Link> */}
    </div>

    <ul style={{ gridTemplateRows: "1fr 1fr", maxHeight: "570px" }}>
      <li>
        <img src="/assets/home/banner/(1).png" alt="figure" />
      </li>
      <li>
        <img src="/assets/home/banner/(2).png" alt="figure" />
      </li>
      <li>
        <img src="/assets/home/banner/(0).png" alt="figure" />
      </li>
    </ul>
  </section>
);
