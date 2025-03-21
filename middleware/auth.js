import Cookies from "js-cookie";

export default async function ({ store, redirect, route }) {
  let token = Cookies.get("token");

  if (token) {
    try {
      let res = await store.dispatch("auth/tokenVerify");

      if (res.data.isValid == true) {
        try {
          await store.dispatch("auth/profile");
        } catch (error) {
          return redirect(`/login?redirect=${route.fullPath}`);
        }
      } else {
        return redirect(`/login?redirect=${route.fullPath}`);
      }
    } catch (error) {
      // if (error.response.data.msg.name === "TokenExpiredError") {
      Cookies.remove("refreshToken");
      Cookies.remove("token");
      return redirect(`/login?redirect=${route.fullPath}`);

      // }
    }
  } else {
    return redirect(`/login?redirect=${route.fullPath}`);
  }
}
