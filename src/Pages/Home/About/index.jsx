import getPage from "../../../translation";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
/* eslint-disable import/no-anonymous-default-export */

const getText = getPage("home"),
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

let observer;

export default () => {
  const [count, setCount] = useState(1),
    cardsContainer = useRef(null);

  useEffect(
    function () {
      if (count > 1) increase();
      else {
        observer = new IntersectionObserver(callback, options);
        observer.observe(cardsContainer.current);

        let called = false;
        function callback() {
          called || setCount(count + 1);
          called = true;
        }
      }
    },
    [count]
  );

  return (
    <section
      key="about-us"
      id="about-us"
      className="container-fluid container-lg d-flex flex-column text-center"
    >
      <h3>{getText(0)}</h3>
      {getText(1)}

      <div
        ref={cardsContainer}
        className="d-flex flex-no-wrap text-center w-100 mt-5"
      >
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/ph_stamp-light.svg" alt="LIGHT" />
          <Inc curr={count} until={75} />
          {getText(2)}
        </div>
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/hugeicons_happy.svg" alt="HAPPY FACE" />
          <Inc curr={count} until={32000} />
          {getText(3)}
        </div>
        <div className="d-flex flex-column">
          <img src="/assets/home/icons/bi_cake.svg" alt="CAKE" />
          <Inc curr={count} until={15000} />
          {getText(4)}
        </div>
      </div>
    </section>
  );

  function increase() {
    count < 50000 &&
      setTimeout(function () {
        setCount(count * 2);
      }, 50);
  }
};

function Inc({ curr, until }) {
  const max = Math.min(curr, until);
  return <span className="h3 my-2">{max} +</span>;
}
