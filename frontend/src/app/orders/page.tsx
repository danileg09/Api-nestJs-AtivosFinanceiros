import { Asset, Order, Wallet } from "@/model";
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeadCell, 
  TableRow 
} from "flowbite-react";
import Image from "next/image";
import { AssetShow } from "../components/AssetShow";
import { OrderTypeBadge } from "../components/OrderTypeBadge";
import { OrderStatusBadge } from "../components/OrderStatusBadge";


export async function getOrders(walletId: string): Promise<Order[]>{

  const response =  await fetch(`http://localhost:3000/orders?walletId=${walletId}`);
  return response.json();

}


export default async function OrdersListPage({searchParams}: {searchParams: Promise<{wallet_id: string}>} ) {

  const { wallet_id } = await searchParams;
  const orders = await getOrders(wallet_id);
  console.log(orders);
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format" >
        <h1>Minhas ordens</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>status</TableHeadCell>
          </TableHead>
          <TableBody>
          {orders.map((order, key) => (
            
            <TableRow key={key}>
              <TableCell>
                
                <AssetShow asset={order.asset}/>

              </TableCell>
              <TableCell>R$ {order.price}</TableCell>
              <TableCell>R$ {order.shares}</TableCell>
              <TableCell>
                <OrderTypeBadge type={order.type} ></OrderTypeBadge>
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} ></OrderStatusBadge>
              </TableCell>
            </TableRow>

          ))}

          </TableBody>
        </Table>
      </div>
    </div>
  );
}
/*  só pra poder commitar */