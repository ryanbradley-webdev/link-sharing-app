import { Link } from "../../types";

export const dataIsLink = (data: unknown): data is Link => {
    if (!data) return false

    return Object.keys(data).includes('linkUrl') && Object.keys(data).includes('platform')
}