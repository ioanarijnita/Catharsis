import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../../contexts/auth-context';
import 'react-calendar/dist/Calendar.css';
import { RoomPlan } from '../room-plan';
import PlanDataService from "../../services/plan";

export function AdminAddPlan() {
    const [plan, setPlan] = useState<{ rows: number | null, columns: number | null, name: string | null }>();
    const navigate = useNavigate();
    const { loginInfo } = useAuthService();
    const [planArray, setPlanArray] = useState([])
    const [rerender, setRerender] = useState(false);
    const [plans, setPlans] = useState<any[]>([]);

    useEffect(() => {
        PlanDataService.findAll().then((res: any) => setPlans(res.data));
    }, [])

    if (loginInfo?.email !== "admin@admin.com") return <></>;
    return (
        <div>
            <Button variant="outlined" style={{ backgroundColor: 'black', color: 'white', position: "absolute", right: 50 }} onClick={() => navigate("/")}>GO TO MAIN PAGE</Button>
            <Button variant="outlined" style={{ backgroundColor: 'black', color: 'white', position: "absolute", right: 50, top: 100 }} onClick={() => navigate("/admin")}>GO TO ADD EVENT</Button>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', marginLeft: 50, marginTop: 50 }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4>Add Seat Plan</h4>
                    <TextField
                        style={{ width: 180 }}
                        value={plan?.name}
                        onChange={(e: any) => {
                            setPlan({ ...plan!, name: e.target.value })

                        }
                        }
                        label="NAME"
                        variant="standard"
                        InputLabelProps={{ style: { fontSize: 10 } }}
                    /><br />
                    <TextField
                        style={{ width: 180 }}
                        value={plan?.rows}
                        onChange={(e: any) => {
                            planArray.length = 0;
                            planArray.filter(p => p !== undefined);
                            setPlan({ name: plan?.name!, columns: null, rows: e.target.value })
                            for (let i = 0; i < e.target.value; i++) {
                                // @ts-ignore
                                planArray[i] = [];
                            }
                            setPlanArray([...planArray]);
                            setRerender(false);
                        }
                        }
                        label="ROWS"
                        variant="standard"
                        InputLabelProps={{ style: { fontSize: 10 } }}
                    /><br />
                    <TextField
                        style={{ width: 180 }}
                        value={plan?.columns}
                        disabled={!plan?.rows}
                        onChange={(e: any) => {
                            let counter = 0;
                            console.log(e.target.value)
                            setPlan({ name: plan?.name!, rows: plan?.rows!, columns: e.target.value })
                            for (let i = 0; i < plan?.rows!; i++) {
                                for (let j = 0; j < e.target.value; j++) {
                                    // @ts-ignore
                                    planArray[i][j] = { id: counter, number: counter };
                                    counter++;
                                }
                            }
                            setPlanArray([...planArray])
                            setRerender(false);
                        }
                        }
                        label="COLUMNS"
                        variant="standard"
                        InputLabelProps={{ style: { fontSize: 10 } }}
                    /><br />
                    <Button disabled={rerender} onClick={() => {
                        if (plan?.columns && plan?.rows) {
                            setRerender(true);
                        }
                    }} variant="contained">GENERATE ROOM PLAN</Button>
                    <Button onClick={() => {
                        console.log(plan)
                        PlanDataService.create({ data: JSON.stringify(planArray), name: plan?.name!, id: plans.length ?? 0 }).then((res) => PlanDataService.findAll().then((res: any) => setPlans(res.data))).then(() => {
                            setPlan({ rows: null, columns: null, name: null });
                            setRerender(false);
                        })
                    }} variant="contained" disabled={!rerender} style={{ marginTop: 10 }}>ADD PLAN</Button>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginLeft: 50 }}>
                    {rerender ? <RoomPlan seats={planArray} /> : <></>}
                </div>
            </div>
            <hr style={{ marginTop: 30 }} />
        </div>
    );
}
