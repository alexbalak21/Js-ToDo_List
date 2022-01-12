export default class Connection {
    URL = "http://localhost:3000/";

    async getAll() {
        let res = await fetch(this.URL);
        let data = await res.json();
        return data;
    }

    async addOne(text) {
        let res = await fetch(this.URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: `{"taskName":"${text}"}`,
        });
        if (res.status !== 201) return null;
        return await res.json();
    }

    async deleteOne(id) {
        let url = this.URL + id;
        let res = await fetch(url, { method: "DELETE" });
        return await res.json();
    }

    async patchOne(id) {
        let url = this.URL + id;
        let res = await fetch(url, { method: "PATCH" });
        return await res.json();
    }
}
