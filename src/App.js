import { styled, alpha } from '@mui/material/styles';
import './App.css';
import InputBase from '@mui/material/InputBase';
import { useState, useEffect } from 'react';
import axios from 'axios';

    function App() {

        const [searchText, setSearchText] = useState("");
        const [gifs, setGifs] = useState([]);

        useEffect(() => {
            var link = searchText ? "https://api.giphy.com/v1/gifs/search" : "https://api.giphy.com/v1/gifs/trending";
            var params = searchText ?
            {
                api_key: '25FkkxSDJe0r6Nom1H7OUMb1qMp1TZO3',
                q: searchText,
                limit: 10
            } :
            {
                api_key: '25FkkxSDJe0r6Nom1H7OUMb1qMp1TZO3',
                limit: 10
            }
            const fetchData = async (params, link) => {
                const response = await axios.get(link, {
                    params : params,
                });
                setGifs(response.data.data);
            }
            fetchData(params, link);
        }, [searchText]);

        const Search = styled('div')(({ theme }) => ({
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            height: "50px",
            margin: "auto",
            marginTop: "0",
        }));

        const StyledInputBase = styled(InputBase)(({ theme }) => ({
            color: 'inherit',
            '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('md')]: {
                    width: '20ch',
                },
            },
        }));

        return (
            <div className="App">
                <header className="App-header">
                    <Search>
                        <StyledInputBase
                            value={searchText}
                            placeholder= {searchText ? searchText : "Search..."}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => {setSearchText(event.target.value)}}
                        />
                    </Search>
                    <p>{searchText ? searchText : "Trending"}</p>
                    {gifs.length > 0 &&
                        gifs.map((gif, index) => {
                            return (
                                <img src={gif.images.fixed_height.url} key={index}/>
                            )
                        })
                    }
                </header>
            </div>
        );
    }

//api key: 25FkkxSDJe0r6Nom1H7OUMb1qMp1TZO3

export default App;
