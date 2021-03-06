import Team from '@/api/Team';

class Auth {
  static isTokenExpired() {
    let token = localStorage.getItem("jwt");
    if (!token) {
      return true;
    }
    let tokenInfo = JSON.parse(atob(token.split(".")[1]));
    return tokenInfo.exp <= Math.floor(new Date().valueOf() / 1000);
  }

  static isLogin() {
    return !Auth.isTokenExpired();
  }

  static async isAdmin() {
    try {
      let teamInfo = await Team.getTeamInfo();
      return teamInfo.admin;
    }
    catch (e) {
      return false;
    }

  }
}

export default Auth;
