import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f6f6f6',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '15px',
    width: '90%',
    height: '35px',
  },
  searchIcon: {
    paddingLeft: theme.spacing(2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState();
  const classes = useStyles();

  const valueChanged = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  useEffect(() => {
    function searchValueChanged() {
      onSearch(searchValue);
    }
    searchValueChanged();
  }, [onSearch, searchValue]);

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={valueChanged}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
        />
      </div>
    </div>
  );
}

export default Search;