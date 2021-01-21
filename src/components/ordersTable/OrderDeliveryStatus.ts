import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

export const orderDeliveryStatus = new Map([
  [OrderStatus.READY, 'PROCESSING'],
  [OrderStatus.INVALID, 'PROCESSING'],
  [OrderStatus.IN_PROGRESS, 'PROCESSING'],
  [OrderStatus.INCOMPLETED, 'PROCESSING'],
  [OrderStatus.CANCELLED, 'PROCESSING'],
  [OrderStatus.DELIVERED, 'DELIVERED'],
]);
