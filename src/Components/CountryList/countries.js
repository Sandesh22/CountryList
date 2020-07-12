import React from "react";

function Country({ countryList }) {
  console.log(countryList.length);

  var countries = (
    <React.Fragment>
      <tr>
        <td colSpan="2" data-testid="no-result">
          No Results Found
        </td>
      </tr>
    </React.Fragment>
  );

  if (countryList.length > 0) {
    countries = countryList.map((country) => (
      <React.Fragment>
        <tr key={country.alpha3Code} id={country.alpha3Code}>
          <td className="slide-up-fade-in py-10"> {country.name}</td>
          <td className="slide-up-fade-in py-10"> {country.capital}</td>
        </tr>
      </React.Fragment>
    ));
  }

  return countries;
}

export default Country;
