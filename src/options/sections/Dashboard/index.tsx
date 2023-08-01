import withAuth from '../../components/WithAuth'
import MainLayout from '../../layouts/Main'
import { useEffect, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { ReactTable } from '../../components/Table'
import { useStorage } from '../../../hooks/useStorage'
import DashboardLayout from '../../layouts/Dashboard'
import { MerchantColumns } from './config'

const Dashboard = () => {
  const [formData, setFormData] = useState<any>([])
  const { getStorage } = useStorage()

  const table = useReactTable({
    data: formData,
    columns: MerchantColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    getStorage('merchant_lists').then((res: any) => {
      setFormData(res.merchant_lists)
    })
    return () => {}
  }, [])

  return (
    <MainLayout>
      <DashboardLayout>
        <ReactTable table={table} flexRender={flexRender} />
      </DashboardLayout>
    </MainLayout>
  )
}

export default withAuth(Dashboard)
