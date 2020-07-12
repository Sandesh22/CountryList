import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./index.css";
import Country from "./countries";
import PageSize from "./PageSize";
import getAllCountry from "./API/fetchCountry";
import getCountryByName from "./API/fetchCountryByName";
const pageSizes = [5, 10, 20, 50];
export default class CountryList extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.state = {
      countryName: "",
      offset: 0,
      countryList: [],
      perPage: 5,
      currentPage: 0,
      loading: true,
      pageCount: 0,
    };
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = parseInt(selectedPage) * parseInt(this.state.perPage);

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
        countryName: this.inputRef.current.value,
      },
      () => {
        if (this.state.countryName) {
          this.LoadCountryByName(this.state.countryName);
        } else {
          this.loadCountries();
        }
      }
    );
  };
  handlePageSizeOnchange = (event) => {
    this.setState(
      {
        perPage: event.target.value,
        countryName: this.inputRef.current.value,
      },
      () => {
        if (this.state.countryName) {
          this.LoadCountryByName(this.state.countryName);
        } else {
          this.loadCountries();
        }
      }
    );
  };

  LoadCountryByName = (countryName) => {
    let fn = getCountryByName(countryName);

    fn.then(
      function (data) {
        if (data.length != undefined) {
          const slice = data.slice(
            this.state.offset,
            parseInt(this.state.offset) + parseInt(this.state.perPage)
          );
          this.setState({
            countryList: slice,
            loading: false,
            pageCount: Math.ceil(data.length / this.state.perPage),
          });
        } else if (data.status == 404) {
          this.setState({
            countryList: [],
            loading: false,
          });
        }
      }.bind(this)
    );
  };
  loadCountries = () => {
    var fn = getAllCountry();

    fn.then(
      function (data) {
        const sliceData = data.slice(
          this.state.offset,
          this.state.offset + Number(this.state.perPage)
        );
        this.setState({
          countryList: sliceData,
          loading: false,
          pageCount: Math.ceil(data.length / this.state.perPage),
        });
      }.bind(this)
    );
  };
  handleSearchbtnClick = () => {
    this.setState(
      {
        loading: true,
        countryList: [],
      },
      () => {
        const countryName = this.inputRef.current.value;
        if (countryName) this.LoadCountryByName(countryName);
        else this.loadCountries();
      }
    );
  };

  componentDidMount() {
    this.loadCountries();
  }

  render() {
    return (
      <div className="">
        <div className="divtop">
          <input
            ref={this.inputRef}
            type="text"
            className="large"
            placeholder="Enter Country name"
            data-testid="app-input"
            // value={this.state.countryName}
            // onChange={this.handleCountryChange}
          />
          <button
            className=""
            data-testid="submit-button"
            onClick={this.handleSearchbtnClick}
          >
            Search
          </button>
          <PageSize
            PageSizeOnchange={this.handlePageSizeOnchange}
            pageSizes={pageSizes}
          ></PageSize>
        </div>

        {this.state.loading ? (
          <div className="divcontent">loading ...</div>
        ) : (
          <div className="divcontent">
            <table id="country">
              <thead>
                <th>Name</th>
                <th>Capital</th>
              </thead>
              <tbody>
                <Country countryList={this.state.countryList}></Country>
              </tbody>
              <tfoot>
                <div>
                  {this.state.countryList.length > 0 && (
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
                  )}
                </div>
              </tfoot>
            </table>
          </div>
        )}

        <div className="mt-50 slide-up-fade-in" data-testid="no-result"></div>
      </div>
    );
  }
}
