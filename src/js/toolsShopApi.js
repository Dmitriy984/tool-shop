export default class ToolsShopApi {
  constructor() {
    this._apiBase = `http://localhost:3000/`;
    this.getResource = this.getResource.bind(this);
    this.checkResource = this.checkResource.bind(this);
  }

  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  }

  getGoods() {
    return this.getResource(`goods`);
  }

  getGoodsFromCart(id) {
    return this.getResource(`users/${id}`);
  }

  async checkResource(url) {
    let response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  }

  checkEmail(email) {
    return this.checkResource(`users?email=${email}`);
  }

  async patchData(id, data) {
    let response = await fetch(`${this._apiBase}users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch users/${id}, status: ${response.status}`
      );
    }

    return await response.json();
  }

  async postUserData(data) {
    let response = await fetch(`${this._apiBase}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      alert("Error HTTP: " + response.status);
    }
  }
}
