const InvoiceTopup = () => {
  return (
    <>
      <div
        className='max-w-3xl border rounded-lg p-6 bg-white shadow-sm'
        id='invoice'
      >
        <div className='grid grid-cols-2 items-center mt-8'>
          <div>
            <p className='font-bold text-gray-800'>Bill to :</p>
            <p className='text-gray-500'>Asep Bensin</p>
            <p className='text-gray-500'>asep@bensin.com</p>
          </div>
          <div className='text-right'>
            <p className=''>
              Invoice number:
              <span className='text-gray-500'>INV-2023786123</span>
            </p>
            <p>
              Invoice date: <span className='text-gray-500'>03/07/2023</span>
            </p>
          </div>
        </div>

        <div className='-mx-4 mt-8 flow-root sm:mx-0'>
          <table className='min-w-full'>
            <colgroup>
              <col className='w-full sm:w-1/2' />
              <col className='sm:w-1/6' />
              <col className='sm:w-1/6' />
              <col className='sm:w-1/6' />
            </colgroup>
            <thead className='border-b border-gray-300 text-gray-900'>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                >
                  Items
                </th>
                <th
                  scope='col'
                  className='hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell'
                >
                  Jumlah
                </th>
                <th
                  scope='col'
                  className='hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell'
                >
                  @
                </th>
                <th
                  scope='col'
                  className='py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'
                >
                  Harga
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-gray-200'>
                <td className='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                  <div className='font-medium text-gray-900'>
                    Topup Saldo JagoCPNS
                  </div>
                </td>
                <td className='hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell'>
                  2
                </td>
                <td className='hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell'>
                  Rp 20.000
                </td>
                <td className='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>
                  Rp 40.000
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope='row'
                  colSpan={3}
                  className='hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0'
                >
                  Kode Unik
                </th>
                <th
                  scope='row'
                  className='pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden'
                >
                  Kode Unik
                </th>
                <td className='pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0'>
                  124
                </td>
              </tr>
              <tr>
                <th
                  scope='row'
                  colSpan={3}
                  className='hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0'
                >
                  Total
                </th>
                <th
                  scope='row'
                  className='pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden'
                >
                  Total
                </th>
                <td className='pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'>
                  Rp 40.124
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className='border-t-2 pt-4 text-xs text-gray-500 text-center mt-16'>
          Mohon untuk membayar sesuai nominal yang tertera pada{' '}
          <strong>Total</strong> agar tidak terjadi masalah saat pengecekan.
        </div>
      </div>
    </>
  );
};

export default InvoiceTopup;
