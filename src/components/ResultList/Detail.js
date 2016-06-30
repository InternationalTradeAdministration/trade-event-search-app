import React, { PropTypes } from 'react';
import AddressList from './AddressList';

const Detail = ({ result }) => (
  <table className="pure-table csl__result-item__detail">
    <tbody>
      <tr>
        <td>Source</td>
        <td>{result.source}</td>
      </tr>
      <tr>
        <td>Start Date</td>
        <td>{result.start_date}</td>
      </tr>
      <tr>
        <td>End Date</td>
        <td>{result.end_date}</td>
      </tr>
      <tr>
        <td>Federal Register Notice</td>
        <td>{result.federal_register_notice}</td>
      </tr>
      <tr>
        <td>Standard Order</td>
        <td>{result.standard_order}</td>
      </tr>
      <tr>
        <td>Source List URL</td>
        <td>{result.source_list_url}</td>
      </tr>
      <tr>
        <td>Source Information URL</td>
        <td>{result.source_information_url}</td>
      </tr>
      <tr>
        <td>Addresses</td>
        <td><AddressList addresses={result.addresses} /></td>
      </tr>
    </tbody>
  </table>
);
Detail.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Detail;
