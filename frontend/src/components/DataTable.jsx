function DataTable({ columns, data }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl shadow">
      <table className="w-full min-w-max bg-white">
        <thead>
          <tr className="bg-slate-800 text-white">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row._id}
                className="border-b border-slate-200 hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-slate-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;