import {IRequest} from '../interface/order';
import {Orders, Plans} from './db';

export const cancelServiceRequest = async (data: IRequest) => {
  await Orders.doc(data.id).update({status: 'canceled'});
};

export const cancelPlanRequest = async (data: IRequest) => {
  await Plans.doc(data.id).update({status: 'canceled'});
};
