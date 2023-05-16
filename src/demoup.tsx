import React, { ComponentType } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { style } from "./style";

function NotFound() {
  return (
    <div
      style={{
        fontSize: 64,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-100%)",
      }}
    >
      🚀
    </div>
  );
}

type DemoupGroup = {
  title: string;
  children: Array<{
    title: string;
    path: string;
    Component: any;
  }>;
};
export function createMenuOptions(
  config: Array<{ name: string; module: Module }>
): DemoupGroup[] {
  return config.map(({ name, module }) => {
    return {
      title: name,
      children: Object.keys(module).map((key) => {
        return {
          title: key,
          path: `${name}-${key}`,
          Component: module[key],
        };
      }),
    };
  });
}

type Module = Record<string, ComponentType>;

export function createReactApp(
  config: Array<{ name: string; module: Module }>
) {
  const options = createMenuOptions(config);
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
              <div key={option.title} style={{ marginBottom: 12 }}>
                <div className="demoup-menu-group-item">{option.title}</div>
                {option.children.map((childOption) => {
                  return (
                    <div
                      className={`demoup-menu-item ${
                        matchPath(
                          encodeURIComponent(childOption.path),
                          pathname
                        )
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
