import Cookies from "js-cookie";
import { IUser } from "@/store/models/IUser";
import { jwtDecode } from "jwt-decode";

export class CookieManager {
  static getAccessToken(): string | undefined {
    return Cookies.get("accessToken");
  }

  static setAccessToken(accessToken: string): void {
    const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

    Cookies.set("accessToken", accessToken, {
      expires: inFifteenMinutes,
      sameSite: "strict",
      secure: import.meta.env.PROD,
    });
  }

  static removeAccessToken(): void {
    Cookies.remove("accessToken");
  }

  static getUserInfoFromAccessToken(): IUser | null {
    const token = this.getAccessToken();

    if (token) {
      try {
        const { id, name, email, role } = jwtDecode<IUser>(token);

        return { id, name, email, role };
      } catch (error) {
        console.error("Failed to decode token:", error);

        return null;
      }
    }

    return null;
  }
}
