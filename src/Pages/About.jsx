import getPage from "../translation";

const getText = getPage("about");

export default function About() {
  return (
    <section id="about" className="container" style={{ textAlign: "justify" }}>
      <h3 className="text-center mb-5">
        {getText(0)}
        {getText(1)}
      </h3>
      <p>{getText(2)}</p>

      <p>{getText(3)}</p>
      <p>{getText(4)}</p>

      <p>{getText(5)}</p>
    </section>
  );
}
