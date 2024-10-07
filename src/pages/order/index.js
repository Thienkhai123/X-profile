import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  getUserCart,
  getUserOrderHistory
  // selectUserCart,
  // selectUserOrderHistory
} from 'store/app/orderSlice'

const OrderPage = () => {
  const dispatch = useDispatch()
  // const userCart = useSelector(selectUserCart)
  // const orderHistory = useSelector(selectUserOrderHistory)
  // console.log(userCart)
  // console.log(orderHistory)
  useEffect(() => {
    dispatch(getUserCart())
    dispatch(getUserOrderHistory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Fragment>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 animate-shake"
          style={{
            animationDelay: '2s'
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </div>
    </Fragment>
  )
}

export default OrderPage
