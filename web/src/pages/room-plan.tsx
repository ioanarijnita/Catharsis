// @ts-ignore
import SeatPicker from 'react-seat-picker'
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import EventDataService from "../services/event";
import { useNavigate } from 'react-router';


export function RoomPlan(p: { seats?: any, rowLength?: number, id?: number, fullSeats?: any, event?: any }) {
    const [loading, setLoading] = useState<boolean>();
    const [seats, setSeats] = useState<any>(p.seats!);
    const nav = useNavigate();

    useEffect(() => {
        if (p.seats) {
            setSeats(p.seats);
        }
    }, [p.seats])

    const addSeatCallbackContinuousCase = async ({ row, number, id }: any, addCb: any, params: any, removeCb: any) => {
        setLoading(true)
        if (removeCb) {
            await new Promise(resolve => setTimeout(resolve, 750))
            console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
            removeCb(params.row, params.number)
        }
        await new Promise(resolve => setTimeout(resolve, 750))
        console.log(`Added seat ${number}, row ${row}, id ${id}`)
        const newTooltip = `seat ${id} added by you`
        addCb(row, number, id, newTooltip)
        seats[row - 1][number % p?.rowLength!].isSelected = true;
        setSeats([...seats]);
        setLoading(false)
    }

    const removeSeatCallback = async ({ row, number, id }: any, removeCb: any) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log(`Removed seat ${number}, row ${row}, id ${id}`)
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
        removeCb(row, number, newTooltip)
        seats[row - 1][number % p?.rowLength!].isSelected = false;
        setSeats([...seats]);
        setLoading(false)

    }

    return <div>
        <div style={{ marginTop: '100px' }}>
            <SeatPicker
                addSeatCallback={addSeatCallbackContinuousCase}
                removeSeatCallback={removeSeatCallback}
                rows={seats}
                maxReservableSeats={3}
                visible
                selectedByDefault
                loading={loading}
                tooltipProps={{ multiline: true }}
                continuous
            />
        </div>
        <Button onClick={() => {
            const arr = [];
            const indexes = [];
            // @ts-ignore
            seats.forEach((row, index) => {
                for (let i = 0; i < row.length; i++) {
                    if (row[i].isSelected === true) {
                        delete seats[index][i].isSelected;
                        // @ts-ignore
                        seats[index][i].isReserved = true;
                    }
                }
            })
            setSeats([...seats]);
            // PlanDataService.edit(JSON.stringify({...p.fullSeats, data: JSON.stringify(seats)}), p.id!).then(() => nav("/"));
            EventDataService.edit({ ...p.event, plan: JSON.stringify({ ...p.fullSeats, data: JSON.stringify(seats) }) }).then(() => nav("/"))
        }} variant="contained" style={{ marginTop: 30 }}>checkout</Button>
    </div>
}
