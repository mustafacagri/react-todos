import { GoSync } from 'react-icons/go'
import MuiButton from '@mui/material/Button'

function Button({ children, loading, ...rest }) {
  return (
    <MuiButton {...rest} disabled={loading ? true : false}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </MuiButton>
  )
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count = Number(!!primary) + Number(!!secondary) + Number(!!warning) + Number(!!success) + Number(!!danger)

    if (count > 1) {
      return new Error('Only one of primary, secondary, success, warning, danger can be true')
    }
  }
}

export default Button
