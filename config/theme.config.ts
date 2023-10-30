import { createTheme } from '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    dark: string;
  }
}

const Theme = createTheme({
  lightColors: {
    primary: '#DE8667',
    secondary: '#EFB467',
    dark: '#322D38',
  },
  darkColors: {
    primary: '#DE8667',
    secondary: '#EFB467',
    dark: '#322D38',
  },
  mode: 'light',
});

const customStyles: any = {
  h1: {
    fontFamily: 'Raleway_300Light',
    fontSize: 50,
    color: Theme.lightColors.dark,
  },
  h4: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 35,
    color: Theme.lightColors.dark,
  },
  h5: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 16,
    color: Theme.lightColors.dark,
  },
  caption: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 14,
    color: Theme.lightColors.dark,
  },
  body: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 16,
    color: Theme.lightColors.dark,
  },
  bodyBold: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 16,
    color: Theme.lightColors.dark,
  },
  filledButton: {
    borderRadius: 32,
    backgroundColor: Theme.lightColors.primary,
    padding: 10,
  },
  outlinedButton: {
    borderRadius: 32,
    padding: 10,
    borderColor: Theme.lightColors.primary,
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  customInput: {
    borderColor: Theme.lightColors.primary,
    borderWidth: 2,
    borderRadius: 32,
    paddingHorizontal: 15,
  },
  customLabel: {
    color: Theme.lightColors.dark,
    paddingHorizontal: 5,
    fontWeight: 'regular',
    marginBottom: 8,
  },
};

export { Theme, customStyles };
