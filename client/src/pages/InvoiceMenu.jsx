/* eslint-disable react/prop-types */
import { Button, FileInput, Label } from 'flowbite-react';
import qris from '../assets/images/qris.jpeg';
import { useRef, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { useAlert } from '../stores/useAlert';

const InvoiceMenu = () => {
  const fileInputRef = useRef(null);
  const { setAlert } = useAlert();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const createVerification = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const { data } = await fetcher.post(
        '/user/transaction/verify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAlert({ title: 'Info!', message: data.message, color: 'success' });
      setLoading(false);
    } catch (error) {
      setAlert({
        title: 'Info!',
        message: error.response?.data?.message || 'An error occurred',
        color: 'failure',
      });
      setLoading(false);
    }
  };

  return (
    <section className='p-4 border rounded-lg h-fit'>
      <form onSubmit={createVerification}>
        <h1 className='text-lg text-center mt-4'>QRIS</h1>
        <div className='flex justify-center'>
          <img className='h-64' src={qris} alt='qris' />
        </div>
        <div className='my-6 text-sm'>
          <h1 className='font-medium'>Cara Pembayaran :</h1>
          <ul>
            <li>
              <p>
                1. Buka aplikasi mobile-banking, OVO, Gojek, Dana, Link Aja Atau
                Lainnya.
              </p>
            </li>
            <li>
              <p>
                2. Pilih opsi bayar lalu unggah screenshoot/scan QR Code melalui
                menu di kanan atas.
              </p>
            </li>
            <li>
              <p>
                3. Input jumlah nominal sesuai dengan nominal total pada
                invoice.
              </p>
            </li>
            <li>
              <p>4. Lalu klik Bayar.</p>
            </li>
            <li>
              <p>
                5. Kemudian Konfirmasi dengan klik{' '}
                <strong>{"'Saya Sudah Transfer'"}</strong> dan tunggu kami
                memverifikasi .
              </p>
            </li>
          </ul>
        </div>
        <div className='mb-2'>
          <div>
            <Label htmlFor='bukti' value='Upload Bukti Transfer' />
          </div>
          <FileInput
            ref={fileInputRef}
            id='bukti'
            sizing='sm'
            onChange={handleFile}
          />
        </div>

        <div className='flex justify-center space-x-2'>
          <Button size='sm' color='failure'>
            Batalkan Topup
          </Button>
          <Button disabled={loading} type='submit' size='sm' color='success'>
            Saya Sudah Transfer
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InvoiceMenu;
