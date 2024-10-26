import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import KakaoRedirectPage from "./components/oauth/KakaoRedirectPage";
import NaverRedirectPage from "./components/oauth/NaverRedirectPage";
import GoogleRedirectPage from "./components/oauth/GoogleRedirectPage";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/login/oauth2/code/kakao"
            element={<KakaoRedirectPage />}
          />
          <Route
            path="/login/oauth2/code/naver"
            element={<NaverRedirectPage />}
          />
          <Route
            path="/login/oauth2/code/google"
            element={<GoogleRedirectPage />}
          />
          <Route path="/main" element={<Main />} />

          {/* Header의 마이페이지 경로 */}
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
