import { useState, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { useTable, usePagination } from 'react-table'
const CardNFT = ({id}) => {
  return(
    <Link to={`/profile/collection/${id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-md hover:shadow-xl cursor-pointer">
        <img className="w-full" src={`https://picsum.photos/id/8${id}/200`} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="grid grid-cols-2">
            <p><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗Ethereum</span></p>
            <p className="text-right"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Legend</span></p>
          </div>
          <div className="font-bold text-xl mb-2">Name: The Coldest Sunset {id}</div>
          {/* <div className="grid grid-cols-2">
            <p>a</p>
            <p className="text-right">b</p>
          </div> */}
        </div>
      </div>
    </Link>
  )
}

const SellCardNFT = ({id}) => {
  return(
    <Fragment>
      <div className="max-w-sm rounded overflow-hidden shadow-md hover:shadow-xl relative group">
        <div className="hover:bg-black rounded h-full w-full hover:bg-opacity-25 absolute">
          <button 
            className={`w-56 font-bold py-3 px-12 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-pink-500 hover:to-yellow-500 absolute top-3/4 left-1/2 -translate-y-2/4 -translate-x-2/4 invisible group-hover:visible`}
          >
            Cancel Sell
          </button>
        </div>
        <img className="w-full" src={`https://picsum.photos/id/9${id}/200`} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="grid grid-cols-2">
            <p><span className="bg-slate-100 text-slate-800 text-xs font-semibold px-1.5 py-0.5 rounded">🔗Ethereum</span></p>
            <p className="text-right"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Legend</span></p>
          </div>
          <div className="font-bold text-xl mb-2">Name: The Coldest Sunset {id}</div>
          {/* <div className="grid grid-cols-2">
            <p>a</p>
            <p className="text-right">b</p>
          </div> */}
        </div>
      </div>
    </Fragment>
      
  )
}

const TabCardProfile = (props) => {
  return(
    <div className="md:col-span-2 w-full p-6 rounded-lg shadow-lg bg-white my-0 md:my-20">
      <h5 className="text-gray-900 text-4xl text-extrabold text-center leading-tight font-medium mb-2">{ props.title }</h5>
      { props.children }
    </div>
  )
}

const menuProfile = [{
  text: "My Collection"
},{
  text: "My Marketplace"
},{
  text: "My Transaction"
}]

const data = [...Array(32)].map((v, key)=>{
  return {
    id: key,
    event: 'Buy NFT Name : Doctor strange '+key,
    from: '0x19...x25e',
    to: '0x18...130e',
    amount: '0.1000 WETH',
    date: '30/04/2022 08:09:54'
  }
})

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
  },
    usePagination
  )

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="px-6 py-3" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className="px-6 py-4" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination mt-5">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

    </div>
  )
}

const ProfilePage = () => {
  
  const [ tab, setTab ] = useState("My Transaction");

  const columns = useMemo(() => [{
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Event',
    accessor: 'event',
  },
  {
    Header: 'From',
    accessor: 'from',
  },
  {
    Header: 'To',
    accessor: 'to',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Date UTC',
    accessor: 'date',
  }], [])

  return (
    <Fragment>
      <div className="h-screen w-screen bg-gray-50">
        <div className="container md:container md:mx-auto">

          <div className="text-7xl text-gray-900 font-dark font-extrabold mb-8">My Profile</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div  className="w-full">
              <div className="py-4 px-8 bg-white shadow-lg rounded-lg my-20">
                <div className="flex justify-center -mt-16">
                  <img className="w-20 h-20 object-cover rounded-full border-2 border-emerald-500" src="https://th.jobsdb.com/en-th/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" />
                </div>
                <div className="grid justify-items-center">
                  <h2 className="text-gray-800 text-3xl font-semibold mt-4">0x58...40dd</h2>

                  { menuProfile.map((item, key)=>{
                    return(
                      <button 
                        type="button" 
                        className={`btn-menu-profile ${tab===item.text && ("active")}`}
                        onClick={()=> setTab(item.text)}
                        key={key}
                      >
                        {item.text}
                      </button>
                    )
                  }) }
    
                </div>
              </div>
            </div>
            
            { tab === "My Collection" && ( 
              <TabCardProfile
                title="My Collection"
              >
                {/* No Record! */}
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                { [...Array(10)].map((v, key) => {
                  return(
                    <CardNFT 
                      id={key}
                      key={key}
                    />
                  )
                })}
                </div>
              </TabCardProfile>
            )}

            { tab === "My Marketplace" && ( 
              <TabCardProfile
                title="My Marketplace"
              >
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                { [...Array(10)].map((v, key) => {
                  return(
                    <SellCardNFT 
                      id={key}
                      key={key}
                    />
                  )
                })}
                </div>
              </TabCardProfile>
            )}

            { tab === "My Transaction" && ( 
              <TabCardProfile
                title="My Transaction"
              >
                <Table columns={columns} data={data} />
              </TabCardProfile>
            )}

          </div>

        </div>
      </div>
    </Fragment>
  )
}

export default ProfilePage;