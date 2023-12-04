/**
 * @file RightContent
 * @description Implementation of Right content which has hierarchial representation of data
 * @author Happyfox
 * @version 1.0
 */

// Libraries
import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import _ from "lodash";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Components
import CardComponent from "./CardComponent";

// Style
import "../Styles/RightContent.scss";

// Actual component
export default function RightContent({ employeesList = [] }) {
  const [orgData, setOrgData] = useState(null);
  const [ceoData, setCeoData] = useState({});

  useEffect(() => {
    formatAsHierarchialData();
  }, [employeesList]);

  /**
   * recursiveMapToManager - recursively maps and formates the array of objects data into hiercharchial data
   * @param {Object} resultObj - result object of the mapping
   * @param {Array} data - array of objects data
   */
  const recursiveMapToManager = (resultObj, data) => {
    if (_.isEmpty(data) || _.isEmpty(resultObj)) {
      return;
    }

    resultObj.isLeafNode = true;
    resultObj.children = [];

    // loop all the items in the array to map to the respective manager
    data.forEach((item) => {
      if (parseInt(resultObj.id) === item.manager) {
        resultObj.children.push(item);
        resultObj.isLeafNode = false;
      }
    });

    /*
      Recursion criteria:
      if the resultObj has child item(s) in children, only then repeat the process considering each child as a manager
      to it's subordinates till the subordinates have no children
    */
    if (!_.isEmpty(resultObj.children)) {
      const hasSiblings = resultObj.children.length > 1;

      resultObj.children.forEach((item, index) => {
        // adding necessary properties to the data for rendering the hierarchy chart
        item.hasSiblings = hasSiblings;
        item.itemIndex = index;

        // invoking recursion
        recursiveMapToManager(item, data);
      });
    }
  };

  /**
   * formatAsHierarchialData - Format data for representing in hierarchy
   */
  const formatAsHierarchialData = () => {
    const dataToFormat = employeesList.slice();
    let ceo = dataToFormat.find((employee) => employee.manager === "");
    const ceoIndex = dataToFormat.indexOf(ceo);

    /* When search or filter is applied, the employeeList data may not have ceo data 
    so getting the ceo from the cached ceo data */
    if (ceoIndex === -1) {
      ceo = ceoData;
    } else {
      dataToFormat.splice(ceoIndex, 1);
    }

    const hierarchialData = { ...ceo };
    // recursively prepare hierarchial data in the hierarchialData
    recursiveMapToManager(hierarchialData, dataToFormat);

    setCeoData(ceo);
    setOrgData(hierarchialData);
  };

  /**
   * getForeignObjPositions - prepare x and y coordinates for nodes customly
   * @param {Object} nodeDatum - each node data
   * @returns Object
   */
  const getForeignObjPositions = (nodeDatum = {}) => {
    let x = 0,
      y = 0;

    if (!nodeDatum.isLeafNode) {
      x = -150;
      y = -100;
    } else {
      if (!nodeDatum.hasSiblings) {
        x = 20;
        y = -120;
      } else {
        y = 120 * nodeDatum.itemIndex - 120;
        x = 20;
      }
    }

    return {
      x,
      y,
    };
  };

  /**
   * renderCardComponent - render each card component
   * @param {Object} param0 - an object from react-d3-tree
   * @returns JSX
   */
  const renderCardComponent = ({ nodeDatum }) => {
    const foreignObjectProps = {
      width: "300",
      height: "100",
      ...getForeignObjPositions(nodeDatum),
    };

    const imageName =
      nodeDatum?.name
        .split(" ")
        .map((word) => word.toLowerCase())
        .join("_") || "default";

    nodeDatum.picture = `../../Images/${imageName}.jpg`;

    return (
      <foreignObject {...foreignObjectProps}>
        <CardComponent nodeData={nodeDatum} />
      </foreignObject>
    );
  };

  /**
   * stepPathFunc - custom path function for react-d3-tree hierarchy paths
   * @param {Object} linkDatum - source and target objects of the current path
   * @returns string
   */
  const stepPathFunc = (linkDatum) => {
    const { source, target } = linkDatum;

    if (!target.data.isLeafNode) {
      return `M${source.x},${source.y}v20H${target.x}v20`;
    } else {
      if (!target.data.hasSiblings) {
        return `M${source.x},${source.y}v70h20`;
      } else {
        let yLength = 70;
        if (target.data.itemIndex > 0) {
          yLength = yLength + 120 * target.data.itemIndex;
        }

        return `M${source.x},${source.y}v${yLength}h20`;
      }
    }
  };

  /**
   * getDynamicPathClass - custom class assigning function to different paths
   * @param {Object} param0 - an object of source and target objects
   * @returns string
   */
  const getDynamicPathClass = ({ source, target }) => {
    if (_.isEmpty(target.children)) {
      return "link-to-leaf";
    }

    return "link-to-branch";
  };

  return (
    <DragDropContext>
      <Droppable droppableId="tree-node">
        {(provided) => (
          <div
            className="org-tree-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orgData && (
              <Tree
                data={orgData}
                orientation="vertical"
                pathFunc={stepPathFunc}
                pathClassFunc={getDynamicPathClass}
                separation={{ siblings: 0, nonSiblings: 3 }}
                renderCustomNodeElement={renderCardComponent}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
