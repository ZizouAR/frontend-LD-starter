import { Favorite, Search } from "@mui/icons-material";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";

type FiltersPropos = {
    maxPower: number,
    minPower: number;
    filters: {
        name: string;
        power: number;
    },
    setFilters: {
        (arg: any): void
    }
}

export default function Filters({ filters, setFilters, maxPower, minPower }: FiltersPropos) {

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value })
    }

    return (
        <div className="filters-container">
            <div className="filters-input-container">
                <TextField
                    onChange={handleFilter}
                    name="name"
                    value={filters.name}
                    style={{ width: '48%' }}
                    placeholder="Name"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }} />
                <TextField
                    onChange={handleFilter}
                    name="power"
                    type="number"
                    value={filters.power}
                    style={{ width: '48%' }}
                    placeholder="Power"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Favorite />
                            </InputAdornment>
                        ),
                    }} />
            </div>

            <Box className="stats-container">
                <Typography variant="caption">
                    Max Power
                </Typography>
                <Typography variant="subtitle2">
                    {maxPower}
                </Typography>
                <Typography variant="caption">
                    Min Power
                </Typography>
                <Typography variant="subtitle2">
                    {minPower}
                </Typography>
            </Box>

        </div>
    )
}