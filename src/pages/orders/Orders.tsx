import axios from "axios";
import FileSaver from "file-saver";
import { useEffect, useState } from "react";

import { Orders as OrdersInterface } from "../../../interfaces/order";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";
import { getOrdersFromDB } from "../../features/order/orderSlice";
import { getUser } from "../../features/user/userSlice";
import "./Orders.scss";
import Modal from "../../components/modal/Modal";

const Orders = () => {
  const [orders, setOrders] = useState<OrdersInterface[]>([]);
  const user = useAppSelector(getUser);
  const [toggleModal, setToggleModal] = useState(true);
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
              <div className="order__invoices" key={order._id}>
                <div className="order__invoices__body">
                  <div className="order__invoices__body__actions">
                    <h1> Order: {order._id}</h1>
                    <div className="order__invoices__body__actions__button">
                      <ButtonWithTheme
                        display="Get Invoice"
                        clickFunc={() => handleGetInvoice(order._id)}
                      />
                    </div>
                  </div>
                  <details>
                    <summary>Expand to see products</summary>
                    <div className="order__invoices__body__products">
                      {order.products.map((product) => {
                        return (
                          <div>
                            <img src={product.imageUrl} alt="product" />

                            <h2>{product.name}</h2>
                            <h2>${product.price}</h2>
                          </div>
                        );
                      })}
                    </div>
                  </details>
                </div>{" "}
              </div>
            );
          })
        : "No Products"}
      {toggleModal && (
        <Modal
          children={
            <div>
              <h1>Checkout Successful!</h1>
              <ButtonWithTheme
                display="Okay"
                clickFunc={() => setToggleModal(!toggleModal)}
              />
            </div>
          }
          shown={toggleModal}
          close={() => setToggleModal(!toggleModal)}
          modalContentClass="modal-content-login"
        />
      )}
    </div>
  );
};

export default Orders;
