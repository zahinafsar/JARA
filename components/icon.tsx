import React from 'react';
import {Icon as UKIcon} from '@ui-kitten/components';

type Props = {
  name: string;
  fill?: string;
  size?: number;
};

export default function Icon({name, fill, size = 30}: Props) {
  return (
    <UKIcon
      name={name}
      fill={fill || 'black'}
      style={{height: size, width: size}}>
      UKIcon
    </UKIcon>
  );
}
