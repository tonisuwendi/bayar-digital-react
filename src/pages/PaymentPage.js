import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiUser, HiMail, HiPhone } from 'react-icons/hi';
import { Button } from 'flowbite-react';

import FormSelectOption from '../components/FormSelectOption';
import { getInvoice } from '../services/endpoint/invoice';
import { catchError, currency, paymentMethodConverter } from '../helpers/utils';
import { PAYMENT_METHOD } from '../helpers/enums';
import {
    FancyLayout, FormInput, Loading, Title,
} from '../components';

const PaymentPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [invoice, setInvoice] = useState({
        title: '',
        thumbnail: '',
        price: '',
        evidence: '',
    });

    const { id: paramsID } = useParams();

    const handleFetchInvoice = async () => {
        try {
            const response = await getInvoice(paramsID);
            if (!response.success) throw new Error(response.message);
            setInvoice(response.data);
        } catch (error) {
            setErrorMessage(catchError(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleFetchInvoice();
    }, []);

    if (isLoading) return <Loading />;

    if (errorMessage) {
        return (
            <FancyLayout>
                <Title className="md:text-4xl text-xl">{errorMessage}</Title>
            </FancyLayout>
        );
    }

    const paymentMethodData = paymentMethodConverter(PAYMENT_METHOD);

    return (
        <div className="w-[450px] mx-auto mt-5">
            <h2 className="text-center font-bold text-indigo-600 text-2xl mb-5">bayar.digital</h2>
            <hr />
            <div className="flex mt-6 gap-4">
                <a href={invoice.thumbnail} target="_blank" rel="noreferrer">
                    <img src={invoice.thumbnail} alt="thumbnail" className="w-[100px] shrink" />
                </a>
                <div>
                    <h4 className="text-md font-medium text-slate-700">{invoice.title}</h4>
                    <h3 className="text-xl font-bold text-indigo-700">{currency(invoice.price)}</h3>
                    <a href={invoice.evidence} target="_blank" rel="noreferrer">
                        <Button size="xs" color="success" className="mt-2 inline">Tampilkan bukti</Button>
                    </a>
                </div>
            </div>
            <div className="mt-6">
                <FormInput id="name" label="Nama Lengkap" placeholder="Masukkan nama lengkap" icon={HiUser} />
                <FormInput id="email" label="Email" placeholder="Masukkan email" icon={HiMail} />
                <FormInput id="phone" label="No. Telepon" placeholder="Masukkan nomor telepon" icon={HiPhone} />
                <FormSelectOption id="paymentMethod" label="Metode Pembayaran" data={paymentMethodData} />
            </div>
            <Button fullSized className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-800 hover:to-purple-800">Lanjutkan</Button>
        </div>
    );
};

export default PaymentPage;
