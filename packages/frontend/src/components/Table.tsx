import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useTable } from "react-table";

const Table: FC<{ data: any }> = ({ data = [] }) => {
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

  return (
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
  );
};

export default Table;
