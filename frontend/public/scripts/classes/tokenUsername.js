export class TokenUsername {
    getUsername() {
        return this.#parseJwt(sessionStorage.getItem("token")).username;
    }

    #parseJwt(token) {
        if (!token) {
            return;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    }
}

export default new TokenUsername();
