interface LoggedInProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

interface EditQuoteProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  quoteId: number;
  initialQuote: string;
}

export { LoggedInProps, EditQuoteProps };
