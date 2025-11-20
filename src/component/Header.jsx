import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Filter, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/InvoiceSlice';

const status = ['all', 'paid', 'pending', 'draft'];

function Header({ onNewInvoice }) {
  const dispatch = useDispatch();
  const { invoices, filter } = useSelector((state) => state.invoices);

  return (
    <>
      <h1 id="bill">BillBot</h1>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Receipt</h1>
          <p className="text-white">
            {invoices.length === 0
              ? 'No Pending Bill'
              : `Total ${invoices.length} ${invoices.length === 1 ? 'Bill' : 'Bills'}`}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-2 text-white cursor-pointer">
              <Filter size={20} />
              <span>Filter by status</span>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 bg-indigo-300 rounded-lg shadow-lg p-2 z-10">
              {status.map((S) => (
                <MenuItem key={S}>
                  {({ active }) => (
                    <button
                      onClick={() => dispatch(setFilter(S))}
                      className={`w-full text-left px-4 py-2 rounded-lg capitalize cursor-pointer transition-colors duration-150
                        ${filter === S ? 'bg-indigo-500 text-white' : active ? 'bg-slate-600 text-white' : 'text-gray-900'}
                      `}
                    >
                      {S}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          <button
            type="button"
            onClick={onNewInvoice}
            className="bg-[#FF8F8F] hover:bg-[#b9e69c] transition-colors duration-300 ease-in-out text-slate-900 font-medium px-6 py-2 rounded-full flex items-center space-x-2 cursor-pointer" >
            <div className="bg-white rounded-full p-2">
              <Plus size={16} className="text-blue-600" />
            </div>
            <span>New Bill</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
