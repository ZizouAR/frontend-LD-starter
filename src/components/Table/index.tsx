import { useEffect, useMemo, useState } from "react";
import { revamp } from "../../helpers/revamp";
import Head, { HeadProps } from "./Head";
import Row from "./Row";
import {
    IconButton,
    LinearProgress,
    NativeSelect,
} from "@mui/material";
import {
    NavigateBefore,
    NavigateNext,
} from "@mui/icons-material";
import Filters from "./Filters";

type TableProps = {
    data: any[],
    columns: HeadProps[],
}

/**
 * Table - A component that displays dynamically passed data
 * 
 * Usage: <Table data={data} columns={columns} />
 * Props:
 * - data: The data array to display
 * - columns: The table's headers
 */

function Table({ data, columns }: TableProps) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    const [data_, setData] = useState<any[]>([]);

    const [filters, setFilters] = useState({
        name: "",
        power: 0
    })


    /**
     * This useEffect hook ensure that data_ state will
     * be filled in case of api delay after Table component renders
     */
    useEffect(() => {
        setData(data)
    }, [data])

    // returns data by pagination 
    const display = useMemo(() => {
        const from = currentPage * rowsPerPage;
        const to = (currentPage * rowsPerPage) + rowsPerPage;

        return data_.slice(from, to)
    }, [currentPage, data_, rowsPerPage])

    // changing page handlers
    const onNext = () => setCurrentPage(currentPage + 1);
    const onBefore = () => setCurrentPage(currentPage - 1);

    const maxPower = Math.max(...data.map(item => item.power));
    const minPower = Math.min(...data.map(item => item.power));

    useEffect(() => {
        const result = data.filter((element: any) => {
            const nameMatch = element.name.toLowerCase().includes(filters.name.toLowerCase()) || !filters.name;
            const powerMatch = element.power >= filters.power || !filters.power;
            return nameMatch && powerMatch;
        });

        setData(result)

    }, [filters])

    // order array containes columns fields order to revamp 
    // row object as desired order
    const order = columns.map((col) => col.fieldname);

    return (
        <div>
            <Filters
                filters={filters}
                setFilters={setFilters}
                maxPower={maxPower}
                minPower={minPower}
            />
            <div className="table-container">
                {data.length === 0 && <LinearProgress />}
                <table>
                    <thead>
                        <tr>
                            {columns.map((head: HeadProps, index: number) => <Head {...head} key={index} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {display.map((row: any, index: number) => {
                            row = revamp(row, order);
                            return <Row row={row} columns={columns} key={index} />
                        })}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <p>Rows per page &nbsp;&nbsp;
                        <NativeSelect
                            defaultValue={rowsPerPage}
                            inputProps={{
                                name: 'page',
                                onChange: (event) => setRowsPerPage(parseInt(event.target.value))
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </NativeSelect>
                    </p>
                    <p>{currentPage + 1} - {Math.ceil((data_.length / rowsPerPage))} of {data_.length}</p>
                    <div>
                        <IconButton aria-label="delete" disabled={currentPage === 0} onClick={onBefore}>
                            <NavigateBefore />
                        </IconButton>
                        <IconButton aria-label="delete" disabled={(currentPage + 1) == Math.ceil((data_.length / rowsPerPage))} onClick={onNext}>
                            <NavigateNext />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Table;