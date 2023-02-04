export default class Connection {
  URL = "http://localhost:3000/"

  async getAll() {
    let res = await fetch(this.URL)
    let data = await res.json()
    return data
  }

  async addOne(text) {
    let res = await fetch(this.URL + "new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"title":"${text}"}`,
    })
    if (res.status !== 201) return await res.json()
    return null
  }

  async deleteOne(id) {
    let url = this.URL + "delete/" + id
    let res = await fetch(url, { method: "DELETE" })
    return await res.json()
  }

  async update(id) {
    let url = this.URL + "update/" + id
    let res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"id":"${id}, "title":"${text}", "done":"true"}`,
    })
    return await res.json()
  }
}
