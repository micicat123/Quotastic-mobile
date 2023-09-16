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
    fontSize: 50,
    fontWeight: '300',
  },
  h2: {
    fontSize: 61,
    fontWeight: '300',
  },
  h3: {
    fontSize: 49,
    fontWeight: '400',
  },
  h4: {
    fontSize: 35,
    fontWeight: '400',
  },
  h5: {
    fontSize: 16,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledButton: {
    borderRadius: 32,
    backgroundColor: Theme.lightColors.primary,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};

export { Theme, customStyles };
