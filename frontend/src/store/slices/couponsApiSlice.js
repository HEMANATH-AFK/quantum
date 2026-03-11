import { apiSlice } from './apiSlice';
import { COUPONS_URL } from '../../constants';

export const couponsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => ({
        url: COUPONS_URL,
      }),
      providesTags: ['Coupon'],
      keepUnusedDataFor: 5,
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: COUPONS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),
    updateCoupon: builder.mutation({
      query: (data) => ({
        url: `${COUPONS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `${COUPONS_URL}/${couponId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
    verifyCoupon: builder.mutation({
      query: (data) => ({
        url: `${COUPONS_URL}/verify`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useVerifyCouponMutation,
} = couponsApiSlice;
