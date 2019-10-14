import React from 'react';
import './App.css';

import AppNavbar from "../../components/AppNavbar/AppNavbar"; 
import Uploader from "../Uploader/Uploader";

/** Fontawesome configuration */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudUploadAlt, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

library.add(faCloudUploadAlt, faCheck, faTimes);

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Uploader />
    </div>
  );
}

export default App;
