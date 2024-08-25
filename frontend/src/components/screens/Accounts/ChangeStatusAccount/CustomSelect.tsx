import { styled } from '@mui/system'
import {
  inputLabelClasses,
  outlinedInputClasses,
  TextField,
} from '@mui/material'

export const CustomSelect = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderRadius: '10px',
    borderColor: 'transparent',
    color: '#ffffff',
  },
  [`& .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    // Style da borda do input quando tem um erro
    borderRadius: '0.7rem',
    border: 'transparent',
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      // Style da borda com hover
      borderColor: 'transparent',
    },
  [`&:hover .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    // Style da borda com hover
    borderColor: '#ff2222',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      // Style da borda do input quando estiver em foco.
      // borderColor: '#ff6600',
    },
  [`& .${outlinedInputClasses.input} `]: {
    // Style do valor dentro do input quando sair do foco
    color: '#ffffff',
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    // Style do valor com hover.
    color: '#ffffff',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      // Style do placeholder quando estiver em foco
      color: '#ffffff',
    },
  [`& .${inputLabelClasses.outlined}`]: {
    // Style da label
    color: '#ffffff',
  },
  [`& .Mui-error`]: {
    // Cor do text do error
    color: '#ff4646',
  },
  [`& .Mui-error .MuiSelect-icon`]: {
    // Style do icone quadno tem um erro
    color: '#ff4646',
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    // Style da label em foco
    color: '#ff6600',
  },
})
