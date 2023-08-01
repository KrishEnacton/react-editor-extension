import { SortingFn, createColumnHelper, sortingFns } from '@tanstack/react-table'
import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils'
import { MerchantType } from '../../../global'
import { openTabInBackground } from '../../../utils'
import { Column, Table } from '@tanstack/react-table'
import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react'

const columnHelper = createColumnHelper<MerchantType>()

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      //@ts-ignore
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      //@ts-ignore
      rowB.columnFiltersMeta[columnId]?.itemRank!,
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
export function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}
export const MerchantColumns: any = [
  columnHelper.accessor('name', {
    header: 'Store Name & Logo',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('website_merchants', {
    header: 'Auto Sources (Number of comp. + direct merchant)',
    cell: (props) => {
      return props.row.original.website_merchants.map((merchant) => (
        <a href={merchant.url} target="_blank" className="flex items-center text-blue-600">
          {merchant.url}
        </a>
      ))
    },
  }),
  columnHelper.accessor('status', {
    header: 'Pending Offers (On click open page with all pending offers view)',
  }),
  columnHelper.accessor('status', {
    header: 'Active Offers (On click open page with all active offers view)',
  }),
  columnHelper.accessor('status', {
    header: 'Expired Offers(On click open page with all expired offers view)',
  }),
  columnHelper.accessor('status', {
    header: 'Last Editor Reviewed (3 days ago|Today) ',
  }),
  columnHelper.accessor('status', {
    header: 'Oldest Active Offer   (3 days ago|Today) ',
  }),
  columnHelper.accessor('status', {
    header: 'Last Sourced At (Date & time)',
  }),
  columnHelper.accessor('status', {
    header: 'Actions',
    cell: (props) => {
      return (
        <button
          onClick={() => {
            openTabInBackground([...props.row.original.website_merchants].map((i) => i.url))
          }}
          className="flex items-center bg-blue-200 text-black p-3 rounded-md"
        >{`Click to open all the merchants`}</button>
      )
    },
  }),
]
