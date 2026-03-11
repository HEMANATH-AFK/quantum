import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '../store/slices/ordersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Package, Truck, CreditCard, ChevronLeft, Download } from 'lucide-react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const downloadInvoiceHandler = async () => {
    const input = document.getElementById('invoice-content');
    if (!input) return;

    try {
        const dataUrl = await htmlToImage.toPng(input, { pixelRatio: 2 });
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (input.offsetHeight * pdfWidth) / input.offsetWidth;
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${order._id}.pdf`);
        toast.success("Invoice downloaded successfully");
    } catch (err) {
        console.error("Invoice Error:", err);
        toast.error("Failed to generate invoice");
    }
  };

  if (isLoading) return <div className="container mx-auto p-4"><Loader className="w-full h-96" /></div>;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="space-y-8" id="invoice-content">
      <Link to="/orders" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors print:hidden">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to History
      </Link>

      <div className="flex flex-col mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
               <h1 className="text-3xl font-black text-gray-900 mb-1">Order Details</h1>
               <p className="text-sm font-medium text-gray-400">Order ID: <span className="text-gray-900 select-all">{order._id}</span></p>
            </div>
            <button 
                onClick={downloadInvoiceHandler} 
                className="btn-outline flex items-center print:hidden border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
            >
                <Download className="w-4 h-4 mr-2" /> Download Invoice
            </button>
        </div>

        {/* Visual Stepper Timeline */}
        <div className="card p-6 md:p-8">
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full hidden md:block" />
                
                {/* Progress Line */}
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-primary-600 -translate-y-1/2 rounded-full hidden md:block transition-all duration-1000" 
                    style={{ width: order.isDelivered ? '100%' : order.isPaid ? '50%' : '0%' }}
                />

                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                    {/* Step 1: Placed */}
                    <div className="flex flex-row md:flex-col items-center md:text-center group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-600 text-white shadow-lg shadow-primary-200 shrink-0 z-10 transition-transform group-hover:scale-110">
                            <Package className="w-5 h-5" />
                        </div>
                        <div className="ml-4 md:ml-0 md:mt-4">
                            <h4 className="font-black text-gray-900">Order Placed</h4>
                            <p className="text-xs text-gray-500 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Step 2: Paid */}
                    <div className="flex flex-row md:flex-col items-center md:text-center group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-110 ${order.isPaid ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div className="ml-4 md:ml-0 md:mt-4">
                            <h4 className={`font-black ${order.isPaid ? 'text-gray-900' : 'text-gray-400'}`}>Payment Status</h4>
                            <p className="text-xs text-gray-500 font-medium">
                                {order.isPaid ? `Paid ` : 'Pending'}
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Delivered */}
                    <div className="flex flex-row md:flex-col items-center md:text-center group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-110 ${order.isDelivered ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                            <Truck className="w-5 h-5" />
                        </div>
                        <div className="ml-4 md:ml-0 md:mt-4">
                            <h4 className={`font-black ${order.isDelivered ? 'text-gray-900' : 'text-gray-400'}`}>Delivery Status</h4>
                            <p className="text-xs text-gray-500 font-medium">
                                {order.isDelivered ? `Delivered ` : 'Processing'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-primary-600" /> Shipping Information
            </h3>
            <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Recipient:</span> <span className="font-bold text-gray-900">{order.user.name} ({order.user.email})</span></p>
                <p><span className="text-gray-500">Address:</span> <span className="font-bold text-gray-900">{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span></p>
            </div>
            {order.isDelivered ? (
              <div className="mt-4"><Message variant="success">Delivered on {new Date(order.deliveredAt).toLocaleString()}</Message></div>
            ) : (
              <div className="mt-4"><Message variant="danger">Not Delivered</Message></div>
            )}
          </div>

          {/* Payment Info */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary-600" /> Payment Information
            </h3>
            <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Method:</span> <span className="font-bold text-gray-900">{order.paymentMethod}</span></p>
            </div>
            {order.isPaid ? (
              <div className="mt-4"><Message variant="success">Paid on {new Date(order.paidAt).toLocaleString()}</Message></div>
            ) : (
              <div className="mt-4"><Message variant="danger">Not Paid</Message></div>
            )}
          </div>

          {/* Items */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary-600" /> Order Items
            </h3>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-grow">
                     <Link to={`/product/${item.product}`} className="text-sm font-bold text-gray-900 hover:text-primary-600">{item.name}</Link>
                     <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-tighter">{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary side */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6 text-left">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Items</span>
                <span className="font-bold text-gray-900">₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">₹{order.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span className="font-bold text-gray-900">₹{order.taxPrice}</span>
              </div>
              {order.discountPrice > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{order.discountPrice}</span>
                </div>
              )}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xl font-black text-gray-900">
                <span>Total</span>
                <span className="text-primary-600">₹{order.totalPrice}</span>
              </div>
            </div>

            {/* Admin Deliver Button */}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                disabled={loadingDeliver}
                onClick={deliverHandler}
                className="w-full btn-primary py-4 font-black mt-4"
              >
                Mark As Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
