import { format, parseISO } from 'date-fns'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteInvoice, markAsPaid, setSelectedInvoice, toggleForm } from '../store/InvoiceSlice'

function InvoiceDetails({invoice}) {

    const dispatch = useDispatch() 

    const handleMarkAsPaid = () => {
        dispatch(markAsPaid(invoice.id))
    }

    const handleDelete = () => {
        dispatch(deleteInvoice(invoice.id))
        dispatch(setSelectedInvoice(null))
    }

    const handleEdit = () => {
        dispatch(toggleForm())
    }

    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), 'dd MM yyyy' )
        }catch {
            return 'invalid Date'
        }
    }

  return (
    <div className='rounded-lg p-5' style={{ backgroundColor: '#D9EAFD'}}>
        <div className='flex justify-between items-center mb-8 py-2'>
            <div className='flex items-center space-x-4'>
                <span>Status</span>
                <div
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                invoice.status === 'paid'
                  ? 'bg-green-900/20 text-green-50'
                  : invoice.status === 'pending'
                  ? 'bg-orange-900/20 text-orange-500'
                  : 'bg-red-900/20 text-white-400'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  invoice.status === 'paid'
                    ? 'bg-green-500'
                    : invoice.status === 'pending'
                    ? 'bg-orange-500'
                    : 'bg-orange-400'
                }`}
              ></div>
              <span className="text-white capitalize">{invoice.status}</span>
            </div>
            </div>
            <div className='flex space-x-4'>
                <button className='px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors duration-300 ease-in-out cursor-pointer' 
                onClick={handleEdit} >
                    Edit
                </button>
                <button className='px-5 py-2 rounded-md bg-red-200 hover:bg-red-300 transition-colors duration-300 ease-in-out cursor-pointer' 
                onClick={handleDelete} >
                    Delete
                </button>
                <button
                    className={`px-5 py-2 rounded-md transition-colors duration-300 ease-in-out cursor-pointer ${
                    invoice.status === 'paid'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-200 hover:bg-green-300'
                    }`}
                    onClick={handleMarkAsPaid}
                    disabled={invoice.status === 'paid'}
                    >
                    Mark as paid
                </button>

            </div>
        </div>
        <div className='bg-slate-900 rounded-lg p-8'>
            <div className='flex justify-between mb-8'>
                <div>
                    <h2 className='text-xl font-bold mb-2 text-white'>#{invoice.id}</h2>
                    <p className='text-white'>{invoice.description}</p>
                </div>
                <div className='text-right text-slate-400'>
                    <p>{invoice.billFrom.streetAddress}</p>
                    <p>{invoice.billFrom.city}</p>
                    <p>{invoice.billFrom.zipCode}</p>
                    <p>{invoice.billFrom.country}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>Invoice Date</p>
                    <p className="font-bold text-white"> {formatDate(invoice.invoiceDate)} </p>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>Payment Due</p>
                    <p className="font-bold text-white">{formatDate(invoice.dueDate)}</p>
                </div>
                <div>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>Bill To</p>
                    <p className="font-bold mb-2 text-white">{invoice.customerName}</p>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>{invoice.billTo.streetAddress}</p>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>{invoice.billTo.city}</p>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>{invoice.billTo.zipCode}</p>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>{invoice.billTo.country}</p>
                </div>
                <div>
                    <p className="mb-2" style={{ color: '#C4E4FF' }}>Send To</p>
                    <p className="font-bold text-white">{invoice.billTo.customerEmail}</p>
                </div>
            </div>

            <div className='bg-slate-800 rounded-lg overflow-hidden'>
                <div className='p-8'>
                    <table className='w-full '>
                        <thead>
                            <tr style={{ color: '#C4E4FF' }}>
                                <th className='text-left'>Item Name</th>
                                <th className='text-center'>QTY</th>
                                <th className='text-right'>price1</th>
                                <th className='text-right'>total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item, index) => (
                                <tr className="border-b border-gray-700" key={index}>
                                <td className="text-left text-white py-2">{item.name}</td>
                                <td className="text-center text-white py-2">{item.quantity}</td>
                                <td className="text-right text-white py-2">{item.price.toFixed(2)}</td>
                                <td className="text-right text-white py-2">{item.total.toFixed(2)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='bg-slate-900 p-8 flex justify-between items-center'>
                    <span style={{ color: '#C4E4FF' }}>Amount Due:</span>
                    <span className='font-bold text-2xl' style={{ color: '#C4E4FF' }}>${invoice.amount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InvoiceDetails
