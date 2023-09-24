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
    color: Theme.lightColors.dark,
  },
  h2: {
    fontSize: 61,
    fontWeight: '300',
    color: Theme.lightColors.dark,
  },
  h3: {
    fontSize: 49,
    fontWeight: '400',
    color: Theme.lightColors.dark,
  },
  h4: {
    fontSize: 35,
    fontWeight: '400',
    color: Theme.lightColors.dark,
  },
  h5: {
    fontSize: 16,
    fontWeight: '400',
    color: Theme.lightColors.dark,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: Theme.lightColors.dark,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Theme.lightColors.dark,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.lightColors.dark,
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
  customInput: {
    borderColor: Theme.lightColors.primary,
    borderWidth: 2,
    borderRadius: 32,
    paddingHorizontal: 15,
  },
  customLabel: {
    color: Theme.lightColors.dark,
    paddingHorizontal: 10,
    fontWeight: 'regular',
    marginBottom: 8,
  },
};

export { Theme, customStyles };
