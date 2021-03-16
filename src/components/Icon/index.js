import React from 'react'
import { createIconSetFromFontello  } from '@expo/vector-icons';
import fontelloConfig from '../../../assets/custom-font/config.json';

const IconSet = createIconSetFromFontello(fontelloConfig, 'fontello', 'fontello.ttf');

const Icon = ({...props}) => (<IconSet {...props} />)

export default Icon;
