import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { AddButton as styles } from '../styles/styles'

function AddButton( classes ) {
  return (
    <Tooltip title='Add Question'>
      <Button
        style={styles.addbtn}
        variant='fab'
        color='secondary'
        >
        <AddIcon/>
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(AddButton)
