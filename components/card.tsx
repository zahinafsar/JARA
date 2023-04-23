import {Button, Card} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {theme} from '../theme';
import Modal from './modal';
import Icon from './icon';

const windowWidth = Dimensions.get('window').width;

type Props = {
  title: string;
  img: any;
  info: {
    service: string[];
    toc: string[];
  };
  onConfirm: () => void;
};

export default function ServiceCard({title, img, info, onConfirm}: Props) {
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(0);

  const service_info = {
    0: {
      title: 'Services',
      info: info?.service,
    },
    1: {
      title: 'Terms & Conditions',
      info: info?.toc,
    },
  };

  const prev = () => {
    setStep(step - 1);
  };

  const next = () => {
    if (step === 1) {
      closeModal();
    } else {
      setStep(step + 1);
    }
  };

  const closeModal = () => {
    setStep(0);
    setModal(false);
  };

  return (
    <>
      {modal && (
        <Modal>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{service_info[step].title}</Text>
              <ScrollView
                style={{
                  marginHorizontal: 10,
                  marginBottom: 10,
                  flex: 1,
                  borderWidth: 0.5,
                }}>
                <View
                  style={{
                    padding: 20,
                  }}>
                  {service_info[step].info.map((item, index) => {
                    return (
                      <Text style={styles.info} key={index}>
                        {'• '} {item}
                      </Text>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            {step === 0 ? (
              <Button
                style={styles.button}
                status="warning"
                onPress={closeModal}
                accessoryLeft={() => (
                  <Icon name="arrow-downward-outline" fill="white" size={20} />
                )}>
                Cancel
              </Button>
            ) : (
              <Button
                accessoryLeft={() => (
                  <Icon name="arrow-back-outline" fill="white" size={20} />
                )}
                style={styles.button}
                status="primary"
                onPress={prev}>
                Prev
              </Button>
            )}
            {step === 1 ? (
              <Button
                style={styles.button}
                onPress={() => {
                  closeModal();
                  onConfirm();
                }}
                status="success"
                accessoryLeft={() => (
                  <Icon name="checkmark-outline" fill="white" size={20} />
                )}>
                Confirm
              </Button>
            ) : (
              <Button
                style={styles.button}
                onPress={next}
                accessoryRight={() => (
                  <Icon name="arrow-forward-outline" fill="white" size={20} />
                )}>
                Next
              </Button>
            )}
          </View>
        </Modal>
      )}
      <View>
        <Ripple
          style={{margin: 5}}
          onPress={() => {
            setModal(true);
          }}>
          <Card style={styles.card}>
            <View style={styles.imgWrapper}>
              <Image style={styles.img} source={img} />
            </View>
            <Text style={styles.CardText}>{title}</Text>
          </Card>
        </Ripple>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  info: {
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  socialBtn: {
    margin: 10,
  },
  card: {
    borderRadius: 0,
    width: windowWidth / 2 - 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardText: {
    fontSize: 10,
    textAlign: 'center',
  },
  img: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.light_text,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 0,
  },
});
