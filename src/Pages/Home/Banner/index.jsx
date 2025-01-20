import { Link } from "react-router-dom";
import "./index.scss";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <section key="banner" id="banner" className="container-fluid container-lg">
    <div className="align-items-center d-flex flex-column justify-content-center text-center">
      <span className="h1 m-0">صمم كيكتك بنفسك!</span>

      <p className="my-2">
        كعكة الفانيليا ذات الطراز القديم هي قلب وروح ماجنوليا بيكري. هنا، نأخذ
        نفس الخليط الذي نستخدمه لصنع الكعك الشهير الخاص بنا لصنع كعكة غنية
        بالزبدة مع فتات خفيفة، ونضعها في طبقة من كريمة زبدة الفانيليا أو
        الشوكولاتة.
      </p>

      <Link to="/all-products" className="text-decoration-none">
        جميع المنتجات
      </Link>
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
