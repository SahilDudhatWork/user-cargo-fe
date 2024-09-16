import Cookies from "js-cookie";

export default async function ({ store, redirect }) {
  let token = Cookies.get("token");

  if (token) {
    try {
      let res = await store.dispatch("auth/tokenVerify");

      if (res.data.isValid == true) {
        await store.dispatch("auth/profile");
      } else {
        return redirect("/login");
      }
    } catch (error) {
      return redirect("/login");
    }
  } else {
    return redirect("/login");
  }
}
