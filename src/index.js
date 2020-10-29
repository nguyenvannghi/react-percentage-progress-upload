import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import percentLoader, {
  LoaderPercentProgressContainer
} from "./loaderComponent";
import "./styles.css";

const App = () => {
  useEffect(() => {
    percentLoader.open({ percentage: 63, speed: 20 });
  });
  const handleChange = (e) => {
    const {
      target: { files }
    } = e;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("filename", files[0]);
      formData.append("name", "test");
      axios
        .post("https://v2.convertapi.com/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            percentLoader.open({ percentage, speed: 20 });
          }
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => console.log(error));
    }
  };

  const onReset = () => percentLoader.close();

  const onClickLoadPercent = (percentage) => {
    onReset();
    setTimeout(() => {
      percentLoader.open({ percentage, speed: 10 });
    }, 700);
  };

  return (
    <React.Fragment>
      <div className="progress-wrapper">
        <LoaderPercentProgressContainer />
      </div>
      <button
        className="button_action mr-3"
        onClick={() => onClickLoadPercent(10)}
      >
        10%
      </button>
      <button
        className="button_action mr-3"
        onClick={() => onClickLoadPercent(50)}
      >
        50%
      </button>
      <button
        className="button_action mr-3"
        onClick={() => onClickLoadPercent(99)}
      >
        99%
      </button>
      <button className="button_action mr-3" onClick={onReset}>
        Reset
      </button>
      <input
        type="file"
        className="form-control-file"
        name="file"
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
