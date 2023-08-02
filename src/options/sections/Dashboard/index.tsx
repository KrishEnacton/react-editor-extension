import { useEffect, useLayoutEffect, useState } from 'react'
import {
  ColumnFiltersState,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { ReactTable } from '../../components/Table'
import { useStorage } from '../../../hooks/useStorage'
import DashboardLayout from '../../layouts/DashboardLayout'
import { MerchantColumns } from './config'
import AppLayout from '../../layouts/AppLayout'

const Dashboard = () => {
  const [formData, setFormData] = useState<any>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { getStorage } = useStorage()

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  const table = useReactTable({
    data: formData,
    columns: MerchantColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  useLayoutEffect(() => {
    getStorage('merchant_lists').then((res: any) => {
      setFormData(res.merchant_lists)
    })
    return () => {}
  }, [])

  return (
    <AppLayout>
      <DashboardLayout>
        <ReactTable table={table} flexRender={flexRender} />
      </DashboardLayout>
    </AppLayout>
  )
}

export default Dashboard
