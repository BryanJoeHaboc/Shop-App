import axios from "axios";
import { useEffect, useState } from "react";
import { Orders as OrdersInterface } from "../../../interfaces/order";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";
import { getOrdersFromDB } from "../../features/order/orderSlice";
import { getUser } from "../../features/user/userSlice";
import FileSaver from "file-saver";

const Orders = () => {
  const [orders, setOrders] = useState<OrdersInterface[]>([]);
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const getOrders = async () => {
    const result = await dispatch(getOrdersFromDB()).unwrap();
    setOrders(result.orders);
  };

  const handleGetInvoice = async (_id: number) => {
    const response = await axios({
      method: "get",
      url: `/orders/${_id}`,
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer: ${user.token}`,
      },
    });

    // window.open(response.data, "_blank");

    FileSaver.saveAs(
      new Blob([response.data], { type: "application/pdf" }),
      `Order-${_id}-invoice.pdf`
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {orders.length > 0
        ? orders.map((order) => {
            return (
              <div key={order._id}>
                <h1> Order: {order._id}</h1>
                <ButtonWithTheme
                  display="Get Invoice"
                  clickFunc={() => handleGetInvoice(order._id)}
                />
              </div>
            );
          })
        : "No Products"}
    </div>
  );
};

export default Orders;
