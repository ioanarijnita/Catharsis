export interface Plan {
    data: Array<Array<{
        id: number,
        number: number,
        isSelected?: boolean,
        isReserved?: boolean,
        tooltip?: string
    }>>
}