import React from 'react';
import './App.css';

import AppNavbar from "../../components/AppNavbar/AppNavbar"; 
import AppFooter from "../../components/AppFooter/AppFooter"; 
import Uploader from "../Uploader/Uploader";

/** Fontawesome configuration */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudUploadAlt, faCheck, faTimes, faCloud,faCopyright, faFileDownload} from "@fortawesome/free-solid-svg-icons";
import { faDropbox } from "@fortawesome/free-brands-svg-icons";

library.add(faCloudUploadAlt, faCheck, faTimes, faDropbox, faCloud, faCopyright, faFileDownload);

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Uploader />
      <AppFooter />
    </div>
  );
}

export default App;
