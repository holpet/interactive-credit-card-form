import { useState } from "react";
import "./App.scss";
import Cards from "./components/Cards/Cards";
import Completed from "./components/Completed/Completed";
import Footer from "./components/Footer";
import Form from "./components/Form/Form";
import useWindowWidth from "./hooks/useWindowWidth";
import useComponentHeight from "./hooks/useComponentHeight";

function App() {
  const [success, setSuccess] = useState<boolean>(false);

  /* ~ dynamically change design based on resizing ~ */
  const windowWidth = useWindowWidth(); // 800px is the cut off point between desktop vs. mobile
  const [isLoaded, setIsLoaded] = useState(false); // are images loaded?
  const { height, ref } = useComponentHeight(isLoaded); // if so, measure the component height

  return (
    <>
      {/* BG graphic element */}
      <div
        className={`bg`}
        style={{
          backgroundSize: `${
            windowWidth > 800
              ? `${30}% 100%`
              : `100% ${height - height * 0.05}px`
          }`,
        }}
      ></div>
      <div className="App">
        <main>
          {/* CARDS SECTION */}
          <section className="card-wrapper" ref={ref}>
            <Cards setIsLoaded={setIsLoaded} />
          </section>
          {/* FORM SECTION */}
          <section className="form-wrapper">
            {!success ? <Form setSuccess={setSuccess} /> : <Completed />}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
