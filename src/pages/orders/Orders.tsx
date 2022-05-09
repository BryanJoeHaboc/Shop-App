import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getOrdersFromDB } from "../../features/order/orderSlice";

const Orders = () => {
  const dispatch = useAppDispatch();

  const getOrders = async () => {
    const result = await dispatch(getOrdersFromDB()).unwrap();
    console.log(result);
  };

  useEffect(() => {
    getOrders();
  });
  return <div>Orders</div>;
};

export default Orders;
