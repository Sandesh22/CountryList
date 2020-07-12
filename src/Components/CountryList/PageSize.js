import React from "react";
const PageSize = (props) => {
  const { PageSizeOnchange, pageSizes } = props;
  return (
    <React.Fragment>
      <select id="pageList" name="pageList" onChange={PageSizeOnchange}>
        {pageSizes.map((pageSize) => (
          <option value={pageSize}>{pageSize}</option>
        ))}
      </select>
    </React.Fragment>
  );
};
export default PageSize;
