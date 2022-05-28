import React from "react";
import {
  BrowserRouter,
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

export async function createMenuOptions(modules: any) {
  const _modules: Record<
    string,
    () => Promise<{
      config: {
        title: string;
      };
    }>
  > = modules;
  const demoupGroupResolvers: Promise<Record<string, any>>[] = [];
  Object.values(_modules).forEach((module) => {
    demoupGroupResolvers.push(module());
  });
  const paths = Object.keys(modules);
  const options = (await Promise.all(demoupGroupResolvers)).map(
    (demoupGroup, i) => {
      const optionGroup: {
        title: string;
        children: Array<{
          title: string;
          path: string;
          Component: any;
        }>;
      } = {
        title: demoupGroup.config.title,
        children: [],
      };
      Object.entries(demoupGroup).forEach(([exportName, exportValue]) => {
        if (exportName === "config") return;
        optionGroup.children.push({
          title: exportValue.title || exportName,
          path:
            paths[i].slice(1).replace(/\.demo\.tsx$/, "") + "/" + exportName,
          Component: exportValue.title ? exportValue.component : exportValue,
        });
      });
      return optionGroup;
    }
  );
  return options;
}

export async function createReactApp(modules: any) {
  const options = await createMenuOptions(modules);
  const routeOptions: typeof options[0]["children"] = [];
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
            <Route key="*" path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  };
  const AppWithRouter = () => {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };
  return <AppWithRouter />;
}
