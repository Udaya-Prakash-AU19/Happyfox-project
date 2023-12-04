/**
 * @file AppContainer
 * @description Entry point for the app
 * @author Happyfox
 * @version 1.0
 */

// Libraries
import { useEffect, useState } from "react";
import _ from "lodash";

// Components
import LeftPane from "./LeftPane";
import RightContent from "./RightContent";

// Styles
import "../Styles/AppContainer.scss";

// Actual Component
export default function AppContainer() {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  /**
   * formatFilterData - formats data for filter
   * @param {Array} data employeelist
   */
  const formatFilterData = (data) => {
    const filterValues = _.chain(data)
      .map((item) => item.team)
      .uniq()
      .sort()
      .value();

    // It's preferred to have "All" option on top in Select dropdown for users' comfortability
    const allIndex = filterValues.indexOf("All");
    filterValues.splice(allIndex, 1);
    filterValues.unshift("All");

    setFilterData(filterValues);
  };

  /**
   * fetchEmployeeData - fetches employee data from backend (Miragejs)
   */
  const fetchEmployeeData = () => {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((result) => {
        const data = result.employees;
        formatFilterData(data);

        setEmployees(data);
        setAllEmployees(data);
      });
  };

  /**
   * This useEffect fetches data on monunting
   */
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  /**
   * This useEffect gets filtered data when search or filter gets changed
   */
  useEffect(() => {
    getFilteredSearchedData();
  }, [searchValue, selectedFilter]);

  /**
   * getFilteredSearchedData - sets data to render after filtering and seaching
   */
  const getFilteredSearchedData = () => {
    let filteredResults = allEmployees.slice();

    if (selectedFilter) {
      filteredResults = filteredResults.filter(
        (employee) => employee.team === selectedFilter
      );
    }

    if (searchValue) {
      filteredResults = filteredResults.filter((employee) => {
        return Object.values(employee).some((value) => {
          value = value.toString().toLowerCase();
          return value.includes(searchValue.toString().toLowerCase());
        });
      });
    }

    setEmployees(filteredResults);
  };

  return !_.isEmpty(employees) ? (
    <div className="app-container">
      <LeftPane
        employeesList={employees}
        search={searchValue}
        setSearch={setSearchValue}
        teamFilterData={filterData}
        selectedTeam={selectedFilter}
        setSelectedTeam={setSelectedFilter}
      />
      <RightContent employeesList={employees} />
    </div>
  ) : (
    <h3 className="loading">...Loading</h3>
  );
}
