import React, { Fragment } from "react";
import { array, object, bool, func, string, number } from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import Icon from "react-icons-kit";

import LayoutMain from "../../components/layouts/LayoutMain";
import SpinnerWrapper from "../../components/SpinnerWrapper/SpinnerWrapper.component";
import Spinner from "../../components/Spinner/Spinner.component";
import Card from "../../components/Card/Card.component";
import Row from "../../components/Row/Row.component";
import { reportTypes, delegationStatuses } from "../../config";
import UpdateStatus from "../DelegationDetailsPage/components/UpdateStatus";
import {
  flightsColumns,
  accommodationsColumns,
  expensesColumns,
  dietColumns,
  mealsColumns,
  diemReturnsColumns,
  allowanceColumns,
  detailsColumns
} from "../../config/tableColumns/report";

const tableLayout = fetching => ({
  bootstrap4: true,
  striped: true,
  hover: true,
  condensed: true,
  bordered: false,
  noDataIndication: () => (fetching ? <Spinner /> : "No data")
});

const ReportPage = ({
  handleDownloadReport,
  fetching,
  flights,
  accommodations,
  expenses,
  totalRepayment,
  targetCurrency,
  diet,
  user,
  meals,
  diemReturns,
  allowance,
  details,
  delegationId,
  delegationStatus,
  delegationVersion
}) => {
  return (
    <LayoutMain
      title="Travel and Expense Report"
      buttonsHide={fetching}
      buttons={
        <Fragment>
          {reportTypes.map(report => (
            <Icon
              key={report.type}
              size={report.iconSize}
              icon={report.icon}
              onClick={() => handleDownloadReport(report)}
            />
          ))}
          <UpdateStatus delegationId={delegationId} status={delegationStatus} version={delegationVersion} />
        </Fragment>
      }
    >
      <SpinnerWrapper loading={fetching} message="loading report...">
        <div className="mb-5">
          <Card>
            <Row loading={fetching} label="Name">
              <span>{user ? `${user.firstName} ${user.lastName}` : ""}</span>
            </Row>
            <Row loading={fetching} label="Status:">
              <span className={`delegation-status ${delegationStatus ? delegationStatus.toLowerCase() : null}`}>
                {delegationStatuses[delegationStatus]}
              </span>
            </Row>
          </Card>
          <hr />
        </div>
        <div className="r-grid">
          <Card title="Flights">
            <BootstrapTable keyField="id" data={flights} columns={flightsColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Accommodations" number={1}>
            <BootstrapTable
              keyField="id"
              data={accommodations}
              columns={accommodationsColumns}
              {...tableLayout(fetching)}
            />
          </Card>
          <Card title="Expenses" number={2}>
            <BootstrapTable
              keyField="id"
              data={expenses}
              columns={expensesColumns(totalRepayment, targetCurrency)}
              {...tableLayout(fetching)}
            />
          </Card>
          <Card title="Allowance" number={3}>
            <BootstrapTable
              keyField="targetCurrency"
              data={allowance}
              columns={allowanceColumns}
              {...tableLayout(fetching)}
            />
          </Card>
          <Card title="Diet" number={4}>
            <BootstrapTable keyField="perDiem" data={diet} columns={dietColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Meals" number={5}>
            <BootstrapTable keyField="breakfasts" data={meals} columns={mealsColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Details" number={6}>
            <BootstrapTable keyField="startDate" data={details} columns={detailsColumns} {...tableLayout(fetching)} />
          </Card>
          <Card title="Diem returns" number={7}>
            <BootstrapTable
              keyField="totalDiems"
              data={diemReturns}
              columns={diemReturnsColumns}
              {...tableLayout(fetching)}
            />
          </Card>
        </div>
      </SpinnerWrapper>
    </LayoutMain>
  );
};

ReportPage.propTypes = {
  accommodations: array,
  allowance: array,
  delegationId: number,
  delegationStatus: string,
  delegationVersion: number,
  details: array,
  diemReturns: array,
  diet: array,
  expenses: array,
  fetching: bool,
  flights: array,
  handleDownloadReport: func,
  handleSendToManager: func,
  meals: array,
  targetCurrency: string,
  totalRepayment: number,
  user: object
};

export default ReportPage;
