// pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
import IconBadge from '../components/IconBadge';

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = () => {
    // TODO: wire up real account creation later
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
        py: 4,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 380, p: 4 }}>
        {/* Logo */}
        <AppLogo sx={{ mb: 2 }} />

        <Typography variant="h6" fontWeight={700} textAlign="center">
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Start organizing your academic life today.
        </Typography>

        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          Full Name
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ mt: 0.5, mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          Email Address
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="example@university.edu"
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
          Password
        </Typography>
        <TextField
          fullWidth
          size="small"
          type={showPassword ? 'text' : 'password'}
          placeholder="Min. 8 characters"
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
                <IconButton size="small" onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Use 8+ characters with a mix of symbols and numbers.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleCreateAccount}
          sx={{ py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Create Account
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            OR SIGN UP WITH
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button fullWidth variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>
            Google
          </Button>
          <Button fullWidth variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>
            Apple
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/" underline="hover" fontWeight={600}>
            Sign in
          </Link>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ display: 'block' }}>
          <Link href="#" underline="hover" color="inherit">Terms of Service</Link>
          {' · '}
          <Link href="#" underline="hover" color="inherit">Privacy Policy</Link>
        </Typography>
      </Card>
    </Box>
  );
}