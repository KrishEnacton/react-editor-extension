import { createColumnHelper } from '@tanstack/react-table'
import { MerchantType } from '../../../global'
import { openTabInBackground } from '../../../utils'

const columnHelper = createColumnHelper<MerchantType>()

export const MerchantColumns: any = [
  columnHelper.accessor('name', {
    header: 'Store Name & Logo',
  }),
  columnHelper.accessor('website_merchants', {
    header: 'Auto Sources (Number of comp. + direct merchant)',
    cell: (props) => {
      return props.row.original.website_merchants.map((merchant) => (
        <div className="flex items-center">{merchant.url}</div>
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
          className="flex items-center"
        >{`Click to open all the merchants`}</button>
      )
    },
  }),
]
