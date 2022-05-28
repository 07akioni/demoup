import { CssRender } from "css-render";

const { c } = CssRender();

export const style = c([
  c(".demoup-app", { display: "flex", lineHeight: 1.5, height: "100vh" }),
  c(".demoup-aside", {
    padding: "20px",
    width: "280px",
    overflow: "auto",
    flexShrink: 0,
    flexGrow: 0,
    borderRight: '1px solid rgba(0, 0, 0, .06)'
  }),
  c(".demoup-main", {
    flexGrow: 1,
    minWidth: 0,
    padding: "32px 24px",
    position: "relative",
  }),
  c(".demoup-menu-group-item", {
    padding: "4px 0",
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "18px",
    color: "#606068",
  }),
  c(
    ".demoup-menu-item",
    {
      position: "relative",
      cursor: "pointer",
      color: "rgb(32, 32, 36)",
      padding: "4px 0",
      marginBottom: "4px",
    },
    [
      c("&::before", {
        content: '""',
        position: "absolute",
        left: "-4px",
        top: "0",
        bottom: "0",
        right: "-4px",
        borderRadius: "4px",
      }),
      c("&:hover", [
        c("&::before", {
          background: "rgba(0, 0, 0, 0.04)",
        }),
      ]),
      c(
        "&&--active",
        {
          fontWeight: 500,
          color: "rgb(57, 144, 255)",
        },
        [
          c("&::before", {
            background: "rgba(57, 144, 255, .125)",
          }),
        ]
      ),
    ]
  ),
]);
