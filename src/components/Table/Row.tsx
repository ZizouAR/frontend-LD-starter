import { Typography } from "@mui/material";
import { HeadProps } from "./Head";

type RowProps = {
    row: any,
    columns: HeadProps[]
}

function Row({ row, columns }: RowProps) {

    return (
        <tr>
            {Object.keys(row).map((field: string, index: number) => {

                //check if field exists in columns
                const isFieldIncluded = columns.find(({ fieldname }) => fieldname === field);
                if(!isFieldIncluded) return

                return (
                    <td key={index}>
                        <Typography variant="subtitle2">{row[field]}</Typography>
                    </td>
                )
            })}
        </tr>
    )

}

export default Row;