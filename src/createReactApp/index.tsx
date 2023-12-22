import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  matchPath,
  Navigate,
} from "react-router-dom";
import { style } from "./style.js";
import { Module } from "../domainTypes.js";
import { createMenuOptions } from "./createMenuOptions.js";
import { NotFound } from "./notFound.js";

export function createReactApp(
  config: Array<{ path: string; module: Module }>
) {
  const { options, firstPath } = createMenuOptions(config);
  const routeOptions: (typeof options)[0]["children"] = [];
  options.forEach((option) => {
    routeOptions.push(...option.children);
  });
  const App = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    style.mount({ id: "demoup-app" });
    return (
      <div className="demoup-app">
        <div className="demoup-aside">
          {options.map((option) => {
            return (
              <div key={option.id} style={{ marginBottom: 12 }}>
                <div className="demoup-menu-group-item">{option.title}</div>
                {option.children.map((childOption) => {
                  return (
                    <div
                      className={`demoup-menu-item ${
                        matchPath(childOption.path, pathname)
                          ? "demoup-menu-item--active"
                          : ""
                      }`}
                      key={childOption.path}
                      onClick={() => {
                        navigate(childOption.path);
                      }}
                    >
                      {childOption.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="demoup-main">
          <Routes>
            {routeOptions.map(({ path, Component }, i) => {
              return (
                <Route
                  index={i === 0}
                  key={path}
                  path={path}
                  element={<Component />}
                />
              );
            })}
            <Route key="/" path="/">
              <Navigate to={firstPath} />
            </Route>
            <Route key="*" path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  };
  const AppWithRouter = () => {
    return (
      <HashRouter>
        <App />
      </HashRouter>
    );
  };
  return AppWithRouter;
}
