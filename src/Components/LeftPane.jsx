/**
 * @file LeftPane
 * @description Implementation of left pane
 * @author Happyfox
 * @version 1.0
 */

// Style
import "../Styles/LeftPane.scss";

// Actual component
export default function LeftPane({
  employeesList = [],
  search = "",
  setSearch,
  teamFilterData,
  selectedTeam,
  setSelectedTeam,
}) {
  /**
   * handleSearchChange - handles search change
   * @param {Event} e - on change event when the search input changes
   */
  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

  /**
   * handleSelectChange - handles select change
   * @param {Event} e - selection event
   */
  const handleSelectChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  /**
   * renderSearchbar - renders search bar
   * @returns JSX
   */
  const renderSearchbar = () => {
    return (
      <>
        <label>Search:</label>
        <input
          type="text"
          className="searchbar"
          placeholder="Type to search"
          value={search}
          onChange={handleSearchChange}
        />
      </>
    );
  };

  /**
   * renderTeamFilter - renders team select filter
   * @returns JSX
   */
  const renderTeamFilter = () => {
    return (
      <>
        <label>Filter by Team:</label>
        <select value={selectedTeam} onChange={handleSelectChange}>
          <option key={"Select"} value={""}>
            Select
          </option>
          {teamFilterData.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </>
    );
  };

  /**
   * renderEmployeesList - renders employees list
   * @returns JSX
   */
  const renderEmployeesList = () => {
    return (
      <ul>
        {employeesList.length > 0 ? (
          employeesList.map((employee) => (
            <li key={employee.id}>
              <div>
                <strong>{employee.name}</strong>
              </div>
              <div>{employee.designation}</div>
              <div>{employee.team}</div>
              <br />
            </li>
          ))
        ) : (
          <div>No data found</div>
        )}
      </ul>
    );
  };

  return (
    <div className="left-pane">
      <div className="custom-inputs-bar">
        {renderSearchbar()}
        {renderTeamFilter()}
      </div>
      {renderEmployeesList()}
    </div>
  );
}
