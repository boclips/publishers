import { OrderStatus } from 'boclips-api-client/dist/sub-clients/orders/model/Order';

export const orderDeliveryStatus = new Map([
  [OrderStatus.READY, 'PROCESSING'],
  [OrderStatus.DELIVERED, 'DELIVERED'],
]);
