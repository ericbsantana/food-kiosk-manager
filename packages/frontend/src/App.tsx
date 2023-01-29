import axios from "axios";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Cell, useTable } from "react-table";
import useSWR from "swr";

const fetcher = (endpoint: string) =>
  axios.get(`http://localhost:3001${endpoint}`).then((res) => res.data);

const App = () => {
  const { data = [], isLoading, error } = useSWR("/kiosks", fetcher);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "_id",
      },
      {
        Header: "Serial key",
        accessor: "serialKey",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Is kiosk closed",
        accessor: "isKioskClosed",
        Cell: (props: any) => {
          return <span>{props.value === true ? "Yes" : "No"}</span>;
        },
      },
      {
        Header: "Store opens at",
        accessor: "storeOpensAt",
        Cell: (props: any) => {
          return <span>{dayjs(props.value).format("HH:mm")}</span>;
        },
      },
      {
        Header: "Store closes at",
        accessor: "storeClosesAt",
        Cell: (props: any) => {
          return <span>{dayjs(props.value).format("HH:mm")}</span>;
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-screen w-full bg-neutral-900 text-white p-10">
      <div className="text-center space-y-1">
        <h1 className="text-4xl">Welcome to our</h1>
        <h1 className="text-4xl font-bold">Kiosk Management</h1>
      </div>
      <div>
        <table className="min-w-full" {...getTableProps()}>
          <thead className="bg-white border-b">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
