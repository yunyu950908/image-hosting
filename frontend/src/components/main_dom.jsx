import React from 'react';
import { Route } from 'react-router-dom';

// components
import ImageUploadPage from './image_upload_page';
import MyUploadedPage from './my_uploaded_page';
import StorageSettingPage from './storage_setting_page';
import UserCenterPage from './user_center_page';

// CSS
import './main_dom.css';


const MainDOM = () => (
  <section id="main" className="d-flex flex-column justify-content-center align-items-center">
    <Route exact path="/" component={ImageUploadPage} />
    <Route path="/upload" component={MyUploadedPage} />
    <Route path="/storage" component={StorageSettingPage} />
    <Route path="/user" component={UserCenterPage} />
  </section>
);

export default MainDOM;
