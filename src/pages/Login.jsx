// pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import SchoolIcon from '@mui/icons-material/School';
import Card from '../components/Card';
import IconBadge from '../components/IconBadge';
import AppLogo from '../components/AppLogo';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    // TODO: wire up real authentication later
    navigate('/app');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        background: 'linear-gradient(180deg, #F5F3FF 0%, #EDE9FE 100%)',
        px: 2,
      }}
    >
      {/* Logo */}
      <AppLogo />

      {/* Card */}
      <Card sx={{ width: '100%', maxWidth: 360, p: 4 }}>
        <Typography variant="h6" fontWeight={700}>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue your productivity journey.
        </Typography>

        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          EMAIL ADDRESS
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 0.5, mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          PASSWORD
        </Typography>
        <TextField
          fullWidth
          size="small"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 0.5, mb: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label={<Typography variant="body2">Remember me</Typography>}
          />
          <Link component={RouterLink} to="/forgot-password" variant="body2" underline="hover">
            Forgot Password?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleSignIn}
          sx={{ py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Sign In
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            OR CONTINUE WITH
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button fullWidth variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>
            Google
          </Button>
          <Button fullWidth variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>
            Apple
          </Button>
        </Box>
      </Card>

      <Typography variant="body2" color="text.secondary">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to="/signup" underline="hover" fontWeight={600}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
}