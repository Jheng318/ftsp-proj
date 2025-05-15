import CardButton from "@/js/components/CardButton";
import sortIcon from "@/images/sort.png";
import { useState } from "react";

function SortControl({ setSortDir, prism }) {
  // 1. State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 2. Function to toggle the state
  const toggleDropdown = () => {
    setIsDropdownOpen(prevIsOpen => !prevIsOpen);
  };

  // Function to handle selection and close dropdown
  const handleSortSelection = (value) => {
    setSortDir(value);       // Update the sort direction state
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <div style={{ position: 'relative' }}> {/* 3. Relative positioning for the container */}
      {/* 4. Add onClick handler to the button */}
      <CardButton btnColor="#6393F2" onClick={toggleDropdown}>
        <img src={sortIcon} alt="sortIcon" id="sortIcon" style={{ marginRight: '5px', width: '40px' }} />
        <span className="text-gray">Sort By</span>
      </CardButton>

      {/* 5. Conditionally render the DropDown based on state */}
      {isDropdownOpen && prism == false && (
        // 6. Absolute positioning for the dropdown itself
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: '4px' }}>
          {/* 7. Pass the wrapper function to handle selection and closing */}
          <DropDown setSortDir={handleSortSelection} />
        </div>
      )}
      {isDropdownOpen && prism == true && (
        // 6. Absolute positioning for the dropdown itself
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: '4px' }}>
          {/* 7. Pass the wrapper function to handle selection and closing */}
          <DropDown2 setSortDir={handleSortSelection} />
        </div>
      )}
    </div>
  );
};

const DropDown = ({ setSortDir }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '5px', backgroundColor: 'white', width: '150px' }} className="dropdown">
    <div onClick={() => setSortDir('lowtohigh_price')}>Price: Low to High</div>
    <div onClick={() => setSortDir('hightolow_price')}>Price: High to Low</div>
    <div onClick={() => setSortDir('newest')}>Newest</div>
    <div onClick={() => setSortDir('oldest')}>Oldest</div>
  </div>
);
const DropDown2 = ({ setSortDir }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '5px', backgroundColor: 'white', width: '150px' }} className="dropdown">
    <div onClick={() => setSortDir('newest')}>Newest</div>
    <div onClick={() => setSortDir('oldest')}>Oldest</div>
  </div>
);

export default SortControl;