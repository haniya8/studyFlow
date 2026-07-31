// pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Link,
} from '@mui/material';

import AppLogo from '../components/AppLogo';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Card from '../components/Card';
import { signupStyles } from '../styles/Signup.styles';

const signupValidationSchema = Yup.object({
  fullName: Yup.string().trim().required('Full name is required'),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol')
    .required('Password is required'),
});

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const [formError, setFormError] = useState('');

  const handleCreateAccount = (values) => {
    const { fullName, email, password } = values;
    const result = signup({ fullName, email, password });
    if (!result.success) {
      setFormError(result.error);
      return;
    }
  navigate('/login');
};

  return (
    <Box sx={signupStyles.pageWrapper}>
      <AppLogo />
      
      <Card sx={signupStyles.card}>
        
        {formError && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
          {formError}
        </Typography>
        )}
        
        <Typography variant="h6" fontWeight={700} sx={{textAlign: "center"}}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={signupStyles.subheading}>
          Start organizing your academic life today.
        </Typography>

        <Formik
          initialValues={{ fullName: '', email: '', password: '' }}
          validationSchema={signupValidationSchema}
          onSubmit={handleCreateAccount}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Typography variant="caption" sx={signupStyles.fieldLabel}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="fullName"
                placeholder="Enter your name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={signupStyles.field}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon fontSize="small" sx={signupStyles.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Typography variant="caption" sx={signupStyles.fieldLabel}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="email"
                placeholder="example@university.edu"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={signupStyles.field}
                slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
                      <EmailOutlinedIcon fontSize="small" sx={signupStyles.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                },
              }}
              />

              <Typography variant="caption" sx={signupStyles.fieldLabel}>
                Password
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={signupStyles.passwordField}
                slotProps={{
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <LockOutlinedIcon fontSize="small" sx={signupStyles.inputAdornmentIcon} />
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

              <Typography variant="caption" color="text.secondary" sx={signupStyles.passwordHint}>
                Use 8+ characters with a mix of symbols and numbers.
              </Typography>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={signupStyles.createButton}
              >
                Create Account
              </Button>
            </Form>
          )}
        </Formik>

        <Divider sx={signupStyles.dividerTight} />

        <Typography variant="caption" color="text.secondary" sx={signupStyles.footerText}>
          <Link href="#" underline="hover" color="inherit">Terms of Service</Link>
          {' · '}
          <Link href="#" underline="hover" color="inherit">Privacy Policy</Link>
        </Typography>
      </Card>

      <Typography variant="body2" color="text.secondary" sx={{textAlign:"left"}}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover" fontWeight={600}>
            Sign in
          </Link>
        </Typography>

    </Box>
  );
}
