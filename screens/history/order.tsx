import React, {useEffect, useState} from 'react';
import {View, RefreshControl} from 'react-native';
import {Button, Icon, Text} from '@ui-kitten/components';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import {getPlanRequests, getServiceRequests} from '../../api/getRequests';
import {cancelPlanRequest, cancelServiceRequest} from '../../api/cancelRequest';
import {IRequest} from '../../interface/order';
import AppBar from '../../components/header';
const Service = (props: any) => (
  <Icon {...props} fill="black" name="shopping-bag-outline" />
);

const ServiceHistory = ({service, status, time}: any) => (
  <Button
    accessoryLeft={props => (
      <View style={{flexDirection: 'row'}}>
        <Service {...props} />
        <Text>{service}</Text>
      </View>
    )}
    accessoryRight={() => (
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text style={{opacity: 0.5, marginRight: 10, fontSize: 10}}>
          {moment(time?.toDate()).fromNow()}
        </Text>
        <Button
          status={status === 'canceled' ? 'danger' : 'info'}
          appearance="outline"
          size="tiny">
          {status}
        </Button>
      </View>
    )}
    appearance="outline"
    style={{
      marginVertical: 5,
      justifyContent: 'space-between',
      backgroundColor: 'white',
      elevation: 3,
    }}
    status="control"
  />
);

function Order({navigation}) {
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState<IRequest[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orders = await getServiceRequests();
    setOrders(orders);
    const plans = await getPlanRequests();
    if (plans.length) {
      setOrders(prev => {
        return [{...plans[0], type: 'plan'}, ...prev];
      });
    }
  };
  const cencelOrder = async (data: IRequest) => {
    setLoader(true);
    if (data.type === 'plan') {
      await cancelPlanRequest(data);
    } else {
      await cancelServiceRequest(data);
    }
    setLoader(false);
    fetchData();
  };

  return (
    <>
      <View style={{padding: 5, flex: 1}}>
        <View
          style={{
            height: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text category="c1" style={{opacity: 0.5}}>
            Swipe left to cencel order
          </Text>
          <Icon
            fill="red"
            name="close-circle-outline"
            style={{width: 17, height: 17, marginLeft: 5}}
          />
        </View>
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={loader} onRefresh={fetchData} />
          }
          data={orders}
          renderItem={data => (
            <ServiceHistory
              key={data.index}
              service={data.item.related_service}
              time={data.item.createdAt}
              status={data.item.status}
            />
          )}
          renderHiddenItem={data =>
            data.item.status === 'pending' ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Button
                  onPress={() => cencelOrder(data.item)}
                  style={{marginRight: 10}}
                  status="danger"
                  size="tiny">
                  Cancel
                </Button>
              </View>
            ) : null
          }
          rightOpenValue={-85}
        />
      </View>
    </>
  );
}

export default Order;
