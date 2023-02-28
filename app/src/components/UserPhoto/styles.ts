import { StyleSheet } from 'react-native';

import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  containerUserPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: { 
    borderWidth: 4,
    borderColor: COLORS.BLACK_SECONDARY,
  },
});