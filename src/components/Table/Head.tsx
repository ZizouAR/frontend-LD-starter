import { Typography } from "@mui/material";

export type HeadProps = {
    fieldname: string,
    title: string
}

function Head({ title }: HeadProps){

    return (
        <th>
            <Typography variant="subtitle2">{title}</Typography>
        </th>
    )
}

export default Head;