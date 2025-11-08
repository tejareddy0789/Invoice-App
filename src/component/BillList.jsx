import { format, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedInvoice } from '../store/InvoiceSlice';


function BillList() {
    const dispatch = useDispatch()
    const { invoices, filter } = useSelector((state) => state.invoices);

    if (!invoices) {
        return <p className="text-gray-400">Loading invoices...</p>;
    }

    const filteredInvoices = invoices.filter((invoice) => {
        if (filter === 'all') return true;
        return invoice.status === false;
    });

  
    if (filteredInvoices.length === 0) {
        return (
        <div className="text-center py-12">
            <p className="text-xl text-slate-400">No Invoice Found.</p>
        </div>
        );
    }

    const handleInvoiceClick = (invoice) => {
        dispatch(setSelectedInvoice(invoice))
    }

  return (
    <div className="space-y-4">
      {filteredInvoices.map((invoice) => (
        <div
          key={invoice.id} onClick={() => handleInvoiceClick(invoice)}
          className="bg-sky-500 rounded-lg p-6 flex items-center justify-between hover:bg-sky-900 transition-colors duration-200 cursor-pointer"
        >
          <div className="flex items-center space-x-6">
            <span className="text-white">{invoice.id}</span>
            <span className="text-white">
              Due {invoice.dueDate ? format(parseISO(invoice.dueDate), 'dd MMM yyyy') : 'N/A'}
            </span>
            <span className="text-amber-200">{invoice.customerName}</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-white text-2xl font-bold">
              ${invoice.amount?.toFixed(2) ?? '0.00'}
            </span>
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
            <ChevronRight className="text-white" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BillList;