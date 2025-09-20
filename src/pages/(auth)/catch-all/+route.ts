import { PageContext } from "vike/types";

export default (pageContext: PageContext) => {
  if (!pageContext.urlPathname.startsWith("/")) return false;
  return {
    precedence: -1,
    pageContext: {
      // E.g. redirect `/product/wrong/url` to `/product`
      redirectTo: "/",
    },
  };
};
