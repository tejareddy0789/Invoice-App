import { Plus, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addInvoice, toggleForm, updateInvoice } from '../store/InvoiceSlice'
import { addDays, format } from 'date-fns'


function BillForm({invoice}) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState(() => {

    if (invoice) {
      return {...invoice}
    }

    return {
      id: `INV${Math.floor(Math.random()*1000)}`,
      status : 'pending',
      billFrom : {
        streetAddress: '', 
        city: '', 
        zipCode: '', 
        country: ''
      },
      billTo : {
        customerEmail: '', 
        streetAddress: '', 
        city: '', 
        zipCode: '', 
        country: ''
      },
      customerName: '',
      items: [],
      selectDueDate : 'Due in 30 days',
      description : '',
      invoiceDate : format(new Date(), 'yyyy-MM-dd'),
      dueDate : format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      amount: 0,
    }
  })  

  useEffect(() => {
    if (invoice) {
      setFormData(invoice)
    }
  }, [invoice])

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (invoice) {
      dispatch(updateInvoice(formData))
    } else {
      dispatch(addInvoice(formData))
    }
    dispatch(toggleForm())
  }
  
  const addItem = () => {
    setFormData({...formData, items: [...formData.items, {name: '', quantity: 0, price: 0, total: 0}]})
  } 

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items]
    newItems[index] [field] = value

    if(field === 'quantity' || field === 'price') {
      const qty = field === 'quantity' ? value : newItems[index].quantity
      const price = field === 'price' ? value : newItems[index].price
      newItems[index].total = qty * price
    }
    setFormData({...formData, items: newItems})
  }

  const removeItem = (index) => {
    setFormData({...formData, items: formData.items.filter((_, i) => i !== index)})
  }

  return (
    <div className='fixed inset-0 bg-black-50 flex items-start justify-center overflow-y-auto'>
      <div className='bg-indigo-300 p-8 rounded-lg w-full max-w-2xl mt-8 mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold' style={{ color: '#000957' }}>Generate New Bill</h2>
          <button type='button' onClick={() => dispatch(toggleForm())} > 
            <X className='text-red-950 text-2xl cursor-pointer hover:text-red-900'/>
          </button>
        </div>

        {/* form */}
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <h3 className='font-bold' style={{color: '#6420AA'}}>Bill From</h3>
            <input type="text" 
            placeholder='Street Address' 
            value={formData.billFrom.streetAddress} 
            onChange={(e) => setFormData({...formData, billFrom:{...formData.billFrom,streetAddress: e.target.value}})}
            required 
            className='w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white' />
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <input type="text" placeholder='City' required className='w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white' 
            value={formData.billFrom.city} 
            onChange={(e) => setFormData({...formData, billFrom:{...formData.billFrom,city: e.target.value}})}/>

            <input type="text" placeholder='Zip Code' required className='w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white' 
            value={formData.billFrom.zipCode} 
            onChange={(e) => setFormData({...formData, billFrom:{...formData.billFrom,zipCode: e.target.value}})}/>
            
            <input type="text" placeholder='Country' required className='w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white' 
            value={formData.billFrom.country} 
            onChange={(e) => setFormData({...formData, billFrom:{...formData.billFrom,country: e.target.value}})}/>
          </div>

          <div className='space-y-4'>
            <h3 className='font-bold' style={{color: '#6420AA'}}>Bill To</h3>
            <input
                type="text"
                placeholder="Customer Name"
                required
                className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customerName: e.target.value
                  })
                }
            />

            <input
                type="email"
                placeholder="Customer Email"
                required
                className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
                value={formData.billTo.customerEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      customerEmail: e.target.value
                    }
                  })
                }
            />

            <input
                type="text"
                placeholder="Street Address"
                required
                className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
                value={formData.billTo.streetAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      streetAddress: e.target.value
                    }
                  })
                }
            />
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <input
              type="text"
              placeholder="City"
              required
              className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
              value={formData.billTo.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    city: e.target.value
                  }
                })
              }
            />

            <input
              type="text"
              placeholder="Zip Code"
              required
              className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
              value={formData.billTo.zipCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    zipCode: e.target.value
                  }
                })
              }
            />

            <input
              type="text"
              placeholder="Country"
              required
              className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
              value={formData.billTo.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    country: e.target.value
                  }
                })
              }
            />

          </div>

          <div className='space-y-4'> 
            <div className='grid grid-cols-2 gap-4 text-black-400'> <input
                type="date"
                className="bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const selectedDate = e.target.value; 
                  const dueDate = format(addDays(new Date(selectedDate), 30), 'yyyy-MM-dd');

                  setFormData({
                    ...formData,
                    invoiceDate: selectedDate,
                    dueDate: dueDate
                  });
                }}
              />

              <select
                className="bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
                required
                value={formData.selectDueDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    selectDueDate: e.target.value
                  })
                } >

                <option value="">Select Due Date</option>
                <option value="30">Due in 30 days</option>
                <option value="60">Due in 60 days</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Description"
              required
              className="w-full bg-slate-900 rounded-lg p-3 placeholder-gray-400 text-white"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
            />

          </div>

            <div className='space-y-4'>
              <h3 style={{color: '#6420AA'}}>List Items</h3>

              {formData.items.map((item, index) => (
                <div className='grid grid-cols-12 gap-4 items-center' key={index}>

                  <input type="text"  placeholder='Item Name' className='bg-slate-900 rounded-lg p-3 col-span-5 placeholder-gray-400 text-white'  
                  value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} />

                  <input type="number"  placeholder='Quantity' className='bg-slate-900 rounded-lg p-3 col-span-2 placeholder-gray-400 text-white' min='1' required 
                  value={item.quantity} onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) )} />
  
                  <input type="number" placeholder='Price' className='bg-slate-900 rounded-lg p-3 col-span-2 placeholder-gray-400 text-white' min='0' step='0.01' required 
                  value={item.price}  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) )}/>
  
                  <div className='col-span-3 flex justify-between items-center'>
                    <div className='whitespace-nowrap text-right'>${item.total.toFixed(2)}</div>
                    <button type='button' className='cursor-pointer hover:text-red-700' 
                      onClick={() => removeItem (index)} >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}

              <button type='button' className='w-full bg-green-200 hover:bg-green-300 rounded-lg p-3 flex items-center justify-center space-x-2 cursor-pointer' 
              onClick={addItem} >
                  <Plus size='20'/>
                  <span>Add Items</span>
                </button>
            </div>

              <div className='flex justify-end space-x-4'>
                <button type='button' className='w-full bg-cyan-200 hover:bg-cyan-300 rounded-full px-6 py-3 flex items-center justify-center space-x-2 cursor-pointer'> 
                  Cancel
                </button>
                <button type='submit' className='w-full bg-cyan-200 hover:bg-cyan-300 rounded-full px-6 py-3 flex items-center justify-center space-x-2 cursor-pointer'>
                  {invoice ? 'save changes' : 'Create New Bill'}
                </button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default BillForm