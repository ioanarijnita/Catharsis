import http from "../http-common";
import { Plan } from "../models/plan";

class PlanDataService {
    create(data: {data: string, name: string, id?: number}) {
        return http.post("/plan",data);
    }
    findAll() {
        return http.get("/plan");
    }
    edit(data: any, id: number) {
        return http.put(`/plan/${id}`, data);
    }
}

export default new PlanDataService();
