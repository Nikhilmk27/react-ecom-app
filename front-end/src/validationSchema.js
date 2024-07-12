import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default validationSchema;
