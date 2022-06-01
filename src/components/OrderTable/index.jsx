import React, {useState} from "react";
import Modal from "react-modal"
import fecharImg from '../../assets/Fechar.svg'


export function OrderTable({ ordersList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderOpened, setOrderOpened] = useState({});

  function openOrderDetails(order){
    setIsOpen(true);
    setOrderOpened(order);
  }
  function closeOrderDetails(){
    setIsOpen(false);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Cliente</th>
          <th>Data</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {ordersList.map((order, key) => {
          return (
            <tr className="orderList" onClick={()=>{openOrderDetails(order)}} key={key}>
              <td>{order.numberOrder}</td>
              <td>{order.client}</td>
              <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(order.date))}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.totalOrder)}</td>
              <td style={{textDecoration:'underline'}}>Ver mais</td>
            </tr>
          );
        })}
      </tbody>
      {isOpen && 
        <Modal overlayClassName="react-modal-overlay" className="react-modal-content-orders" onRequestClose={closeOrderDetails} isOpen={isOpen}>
          <h2>Númedo do pedido: {orderOpened.numberOrder}</h2>
          <h3>Cliente: {orderOpened.client}</h3>
          <h3>Data: {new Intl.DateTimeFormat('pt-BR').format(new Date(orderOpened.date))}</h3>
          <h3>Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderOpened.totalOrder)}</h3>
          <h3>Produtos:</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {orderOpened.products.map((product, key) => {
                return (
                  <tr key={key}>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <span> Observações: {orderOpened.observer}</span>
          <button className="react-modal-close" onClick={closeOrderDetails}><img src={fecharImg} alt="Fechar" /></button>
        </Modal>
      }
    </table>
  );
}
