import { User } from "../models/user";
import http from "../http-common";

class StoreDataService {
    create(data: User) {
        return http.post("/users", data);
    }
    login(data: any) {
        return http.post("/users/users", data);
    }
    findAll() {
        return http.get("/users");
    }
}

export default new StoreDataService();
