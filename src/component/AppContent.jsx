import React from 'react'
import Header from './Header'
import BillList from './BillList'
import BillForm from './BillForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../store/InvoiceSlice'
import InvoiceDetails from './InvoiceDetails'

function AppContent() {
    const dispatch = useDispatch ()
    const {isFormOpen, selectedInvoice} = useSelector ((state) => state.invoices)

    const handleNewInvoice = () => {
        dispatch(toggleForm())
    }
  return (
    <div className="text-black min-h-screen" 
     style={{ backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)' }}>
        <div className='max-w-6xl mx-auto py-12 px-4'>
            <Header onNewInvoice= {handleNewInvoice} />  
            {selectedInvoice ? <InvoiceDetails invoice={selectedInvoice}/> : <BillList />}
            {isFormOpen && <BillForm invoice={selectedInvoice} /> }  
        </div>
    </div>
  )
}

export default AppContent

// background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
// background-image: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);
// background-image: linear-gradient(to top, #09203f 0%, #537895 100%);