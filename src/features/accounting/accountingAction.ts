import { IListItemProp } from "../config/configAction"

export type ICreatePayment = {
    student_id: IListItemProp,
    course_id: IListItemProp,
    paid_amount: number,
    date: string
}
export type ICreateExpence = {
    expence_type: IListItemProp,
    teacher_id: IListItemProp,
    expence_amount: number,
    date: string
}