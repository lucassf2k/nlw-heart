import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { COLORS } from '../../theme';

import { Button } from '../Button';
import { useAuth } from '../../hooks/auth';


export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button 
        title="ENTRAR COM GITHUB" 
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}