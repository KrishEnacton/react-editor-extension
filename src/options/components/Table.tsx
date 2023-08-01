import { Table } from '@tanstack/react-table'

export const ReactTable: React.FC<{ table: Table<unknown>; flexRender: any }> = ({
  table,
  flexRender,
}) => {
  return (
    <table className="table border-collapse border w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id} className="border">
            {headerGroup.headers.map((header: any) => (
              <th key={header.id} className="border p-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row: any) => (
          <tr key={row.id} className="border">
            {row.getVisibleCells().map((cell: any) => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
