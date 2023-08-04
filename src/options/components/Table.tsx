import { Table } from '@tanstack/react-table'
import { Filter } from '../sections/Dashboard/config'

export const ReactTable: React.FC<{ table: Table<unknown>; flexRender: any }> = ({
  table,
  flexRender,
}) => {
  return (
    <table className="table border-collapse border w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup: any, index: any) => (
          <tr key={headerGroup.id + index} className="border">
            {headerGroup.headers.map((header: any) => {
              return (
                <th key={header.index} className="border p-2">
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row: any, index: any) => {
          return (
            <tr key={row.id + index} className="border">
              {row.getVisibleCells().map((cell: any, index: any) => (
                <td key={cell.id + index} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
