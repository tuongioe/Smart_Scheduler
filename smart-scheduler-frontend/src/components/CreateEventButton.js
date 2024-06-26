import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { Menu, MenuItem } from '@mui/material';
export default function CreateEventButton() {
  const { setSelectedEvent, setShowEventAddDateModel, labels } =
    useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    // console.log(event.currentTarget)
    setAnchorEl(document.getElementById('basic-button'));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <button
        className="border p-2 flex items-center shadow-md hover:shadow-2xl border-solid border-[#00717F] rounded-md"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
      >
        <svg
          onClick={() => {
            setShowEventAddDateModel(true);
          }}
          className="w-5 h-5 text-white border-1 border-blue-custom-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>

        <span
          className="pl-3 pr-7"
          onClick={() => {
            setShowEventAddDateModel(true);
          }}
        >
          {' '}
          Create
        </span>

        <svg
          onClick={handleClick}
          className="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      <br />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(0,0,0,0.5)',
            color: 'white',
          },
        }}
      >
        {labels.map((el, index) => (
          <MenuItem
            key={`label-map-${index}`}
            onClick={() => {
              setSelectedEvent({
                calendar: {
                  id: el.id,
                  color: el.color,
                  label: el.label,
                },
              });
              setAnchorEl(null);
              setShowEventAddDateModel(true);
            }}
            style={{ width: '153px', borderRadius: '5px' }}
            sx={{ '&:hover': { backgroundColor: '#008494' } }}
          >
            {el.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
