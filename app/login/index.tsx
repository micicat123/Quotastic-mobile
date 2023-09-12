import { Formik } from "formik";
import { View, Text, TextInput, Button } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <View>
        <View>
          <Text>Welcome</Text>
        </View>
        <Text>back!</Text>
        <Text>
          Thank you for coming back. Hope you have a good day and inspire
          others.
        </Text>
      </View>
      <View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Button title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
