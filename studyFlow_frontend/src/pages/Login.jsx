// pages/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Link,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '../components/Card';
import AppLogo from '../components/AppLogo';
import { loginStyles } from '../styles/Login.styles';
import { loginConstants } from '../constants/AuthConstants';

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const [formError, setFormError] = useState('');

  const handleSignIn = (values) => {
  const result = login({ email: values.email, password: values.password, rememberMe });
  if (!result.success) {
    setFormError(result.error);
    return;
  }
  navigate(from, { replace: true });
};

  return (
    <Box sx={loginStyles.pageWrapper}>
      <AppLogo />

      <Card sx={loginStyles.card}>
        <Typography variant="h5" fontWeight={700}>
          {loginConstants.welcomeMsg}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={loginStyles.subheading}>
          {loginConstants.subheading}
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSignIn}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Typography variant="caption" sx={loginStyles.fieldLabel}>
                {loginConstants.emailFieldLabel}
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="email"
                placeholder="name@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={loginStyles.field}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" sx={loginStyles.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                }
                }}
              />

              <Typography variant="caption" sx={loginStyles.fieldLabel}>
                {loginConstants.passwordFieldLabel}
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={loginStyles.passwordField}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" sx={loginStyles.inputAdornmentIcon} />
                      </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                }}
              />

              <Box sx={loginStyles.rememberRow}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label={<Typography variant="body2">{loginConstants.rememberMe}</Typography>}
                />
                <Link component={RouterLink} to="/forgot-password" variant="body2" underline="hover">
                  {loginConstants.forgotPwd}
                </Link>
              </Box>

              {formError && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
                  {formError}
                </Typography>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={loginStyles.signInButton}
              >
                {loginConstants.signinButton}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>

      <Typography variant="body2" color="text.secondary">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to="/signup" underline="hover" fontWeight={600}>
          {loginConstants.signup}
        </Link>
      </Typography>
    </Box>
  );
}
