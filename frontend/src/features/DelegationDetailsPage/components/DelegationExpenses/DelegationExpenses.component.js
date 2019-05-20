import React, { Fragment } from "react";
import { array, bool, func, number } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ExpandRow from "./ExpensesTableExpand/ExpandRow.component";
import ExpensesModalForm from "./ExpensesModalForm";
import Spinner from "../../../../components/Spinner/Spinner.component";
import Button from "../../../../components/Button/Button.component";
import { expensesColumns } from "../../../../config/tableColumns";

const DelegationExpenses = ({ expenses, fetching, delegationId, totalSize, onTableChange, page, sizePerPage }) => {
  return (
    <Fragment>
      <BootstrapTable
        bootstrap4
        hover
        bordered={false}
        data={expenses}
        columns={expensesColumns}
        remote={{ sort: true, pagination: true }}
        noDataIndication={() => (totalSize === 0 ? <p>No expenses, add a new one!</p> : <Spinner />)}
        loading={fetching}
        keyField="id"
        expandRow={ExpandRow(delegationId)}
        onTableChange={onTableChange}
        pagination={paginationFactory({ page, sizePerPage, totalSize })}
      />
      <div className="d-flex justify-content-end">
        <Button data-toggle="modal" data-target="#addExpenseModal" text="Add expense" />
        <ExpensesModalForm delegationId={delegationId} />
      </div>
    </Fragment>
  );
};

DelegationExpenses.propTypes = {
  delegationId: number,
  expenses: array,
  fetching: bool,
  onTableChange: func,
  page: number,
  sizePerPage: number,
  totalSize: number
};

export default DelegationExpenses;