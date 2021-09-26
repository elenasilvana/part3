import { ReactComponent as SearchIcon } from "./icons/search-icon.svg";

export const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        height: 50,
      }}
    >
      <div>
        <span
          style={{
            display: "inline-flex",
            flex: "1 1 300px",
            position: "relative",
            border: "1px solid #39a3b7",
          }}
        >
          <SearchIcon />
          <input
            style={{ border: 0, padding: "0.5rem 0.5rem 0.5rem 0", flex: 1 }}
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Ada Lovelace"
          />
        </span>
      </div>
    </div>
  );
};
